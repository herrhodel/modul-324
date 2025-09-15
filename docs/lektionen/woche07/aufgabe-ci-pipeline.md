---
sidebar_position: 3
keywords:
  - pdf
---

# Ready to Deploy

Nachdem nun mit Terraform die AWS Umgebung aufgebaut wurde und mit Kamal die
Virtuelle Machine mit Docker erweitert wurde kann die Applikation nach AWS
deployt werden.

## GitHub Deploy Action `.github/workflows/deploy.yml`

Das Deployment passiert in der Datei
[.github/workflows/deploy.yml](https://github.com/herrhodel/modul-324-muster/blob/main/.github/workflows/deploy.yml).
Diese kann auch vom Musterbeispiel kopiert werden.

:::caution

Alle die die App, das Dockerfile, nicht unter dem Ordner `app` haben, müssen
garantiert die Pfade anpassen.

:::

### Detailbeschreibung

Der Anfang macht das Schema für die Autovervollständigung sowie der Name.

```yaml title=".github/workflows/deploy.yml"
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: Deploy to Amazon AWS
```

Uber `on` wird geregelt, wann die Action ausgeführt werden soll.

- `workflow_dispatch` bedeutet, dass Ihr diese manuell, via GUI, starten könnt.
- `push.tags: ["v*"]` bedeutet, dass deployed werden soll, sobald ein Tag
  generiert wird, welche mit "v" startet.
  - :bulb: Release-Please generiert solche Tags

Es kann also manuell, deployed werden order aber automatisiert, sobald ein neuer
Tag erstellt wird.

```yaml
on:
  workflow_dispatch: # manuell via GUI
  push:
    tags:
      - "v*"
```

Es existieren zwei globale Environmentvariablen.

- `AWS_REGION`, welche definiert welche AWS region gewählt werden soll. Dies ist
  standardmässig immer `us-east-1`.
- `DOCKER_IMAGE_NAME`, dieser muss mit identisch sein, wie das `image` in der
  Kamal Konfiguration unter `kamal/config/deploy.yml`

```yaml
env:
  AWS_REGION: us-east-1
  DOCKER_IMAGE_NAME: m324/myapp
```

```yaml
permissions:
  contents: read
```

Hier wird nun der eigentliche job definiert. Wir gehen Step für Step durch.

```yaml
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    environment: aws
    steps:
```

Der Checkout Step macht den Code in der Pipeline verfügbar.

```yaml
- name: Checkout
  uses: actions/checkout@v4
```

Nun wird ein Job ausgeführt, denn Ihr vorhin einfach kopiert habt.
"aws-credentials-to-env" ist von mir definiert, damit Ihr die credentials von
AWS in einem Stück in das Secret "AWS_CREDENTIALS" kopieren könnt, und nicht
alle keys einzeln setzt. Dieser Step dient dazu, dass im nächsten Step die AWS
Credentials einzeln angegeben werden können.

```yaml
- uses: "./.github/shared/aws-credentials-to-env"
  with:
    aws-credentials: ${{ secrets.AWS_CREDENTIALS }}
```

Die Action
["aws-actions/configure-aws-credentials@v4"](https://github.com/aws-actions/configure-aws-credentials)
wird direkt von AWS gewartet. Sie installiert automatisch die
[aws-cli](https://aws.amazon.com/de/cli/) in der Umgebung und logged sich bei
AWS ein.

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ env.aws-access-key-id }}
    aws-secret-access-key: ${{ env.aws-secret-access-key }}
    aws-session-token: ${{ env.aws-session-token }}
    aws-region: ${{ env.AWS_REGION }}
```

Die Action
["webfactory/ssh-agent@v0.9.0"](https://github.com/webfactory/ssh-agent) erlaubt
es ein SSH-Key von einem Secret in den Agent in der Umgebung zu laden. So können
SSH calls aus der CI-Pipeline gemacht werden. Hier laden wir also den kopierten
SSH-Key "AWS_SSH_PRIVATE_KEY" in den Agent der Umgebung. Der SSH-Key wird später
von Kamal verwendet um sich mit dem Server zu verbinden.

```yaml
- uses: webfactory/ssh-agent@v0.9.0
  with:
    ssh-private-key: ${{ secrets.AWS_SSH_PRIVATE_KEY }}
```

Hier wird vom Ordner `terraform` das Script `scripts/get_public_ip.sh`
ausgeführt. Dieses Script ist von mir geschrieben. Es macht mit der `aws-cli`
einen call zur Umgebung und gibt die aktuelle IP der VM mit dem Namen ubuntu2404
zurück. Die IP benötigen wir später um mit Kamal darauf zu verbinden. Die IP
wird als Environmentvariable `SERVER_IP` den weiteren Steps zugänglich gemacht.

```yaml
- name: Get Server Ip
  id: get-server-ip
  working-directory: terraform
  shell: bash
  run: |
    echo "SERVER_IP=$(sh scripts/get_public_ip.sh ubuntu2404)" >> $GITHUB_ENV
```

Da Kamal in Ruby geschrieben ist, müssen wir Ruby installieren.

```yaml
- name: Set up Ruby for Kamal
  uses: ruby/setup-ruby@v1
  env:
    BUNDLE_GEMFILE: ./kamal/Gemfile
  with:
    ruby-version: 3.4.2
    bundler-cache: true
```

Wir haben mit Terraform, unter anderem, eine Docker Registry auf AWS erstellt.
Mit der Action
["aws-actions/amazon-ecr-login@v2"](https://github.com/aws-actions/amazon-ecr-login),
welche von AWS offiziell gewartet wird, loggen wir uns nun in der Registry ein.
Dies entspricht in etwa dem Befehl `docker login`.

Achtet darauf, dass dieser Step mit einer `id` versehen ist. Dies, damit später
darauf zugegriffen werden kann.

```yaml
# Entspricht `docker login``
- name: Login to Amazon ECR
  id: login-ecr
  uses: aws-actions/amazon-ecr-login@v2
```

Kamal könnte auch das Dockerimage bauen. Dies ist in einer GitHub Action jedoch
nicht so effizient, wegen dem Cache. Wir verwenden die Offizielle Docker Action
["docker/setup-buildx-action"](https://github.com/docker/setup-buildx-action) um
aus dem Dockerfile ein Image zu bauen. Dafür installieren wir zuerst Docker in
der CI-Pipeline.

```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3
```

Die Action ["docker/metadata-action"](https://github.com/docker/metadata-action)
von Docker, erlaubt es Metainformationen zu definieren. Wir definieren den
Image-Name `images` sowie die Tags `tags`. Der Imagename **muss** immer die
Docker-Registry als prefix beinhalten. Diese wird direkt aus dem Step mit der id
`login-ecr` gelesen. Es handelt sich um die Docker-Registry auf AWS, gefolgt mit
dem `DOCKER_IMAGE_NAME`. Als Tags wird nun wie folgt vorgegangen.

- `type=sha,event=branch` bedeutet, dass immer wenn ein Branch Änderungen
  enthält, wird der commit hash "sha" als Tag gesetzt.
- `type=semver,pattern={{version}},event=tag` bedeutet, dass immer wenn ein
  neuer Tag erstellt wird, ein Tag nach Semantischer-Versionierung "semvers"
  erstellt wird.

:::note

Ihr müsst dies nicht zu 100% reproduzieren können, ich habe es auch zusammen
kopiert.

:::

```yaml
- name: Docker meta
  id: meta
  uses: docker/metadata-action@v5
  with:
    images: |
      ${{ steps.login-ecr.outputs.registry }}/${{ env.DOCKER_IMAGE_NAME }}
    tags: |
      type=sha,event=branch
      type=semver,pattern={{version}},event=tag
```

Sind die Metainformationen definiert wird jetzt das Image gebaut und gepusht.
Dafür verwenden wir die offizielle Action
["docker/build-push-action"](https://github.com/docker/build-push-action). Durch
den Imagename, welche die Docker-Registry beinhaltet, wird automatisch in die
korrekte Registry gepusht.

:::caution

Mit dem `context` wird angegeben, wo sich das Dockerfile befindet. Dieser muss
also bei allen die die Applikation nicht im Ordner `app` haben, angepasst
werden.

:::

```yaml
# Entspricht `docker build .` und `docker push`, nur konfortabler und schneller mit cache
- name: Build and push application image to regisrty
  uses: docker/build-push-action@v6
  with:
    context: ./app
    push: true
    tags: ${{ steps.meta.outputs.tags }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

Ist das Image gebaut und gepusht, kommt nun Kamal ins Spiel. Mit Kamal
definieren wir welche `--version`, oder auch Tag, deployed werden soll. Spannend
sind hier die Environmentvariablen.

- `KAMAL_SERVER_IP` ist die IP des Servers, Diese entspricht der SERVER_IP
  welche im vorherigen Step per `aws-cli` dynamisch herausgefunden wurde.
- `KAMAL_REGISTRY` gibt an, welche Registry verwendet werden soll, dies ist
  wiederum die selbe wie im Step mit der id `login-ecr` definiert.
- `KAMAL_REGISTRY_PASSWORD` gibt Kamal die Rechte sich mit der Registry zu
  verbinden. Auch dieses Passwort wird dynamisch aus dem Step `login-ecr`
  ausgelesen.
- `VERSION` gibt die Version an, welche deployed werden soll, diese Information
  erhalten wir vom Metainformationen Step mit der ID `meta`.

Dem Befehl `kamal deploy` wird mit der Option `--skip-push` das Bauen vom Image
ausgeschaltet, da dies durch die offiziellen Docker Actions bereits geschehen
ist.

Am Ende wird dem `$GITHUB_STEP_SUMMARY` mitgegeben wo die App deployt wurde.

```yaml
# Deployed das erstellte Image nach AWS
- name: Kamal deploy image
  working-directory: kamal
  env:
    KAMAL_SERVER_IP: ${{ env.SERVER_IP }}
    KAMAL_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
    KAMAL_REGISTRY_PASSWORD:
      ${{
      steps.login-ecr.outputs[format('docker_password_{0}_dkr_ecr_us_east_1_amazonaws_com',
      secrets.AWS_ACCOUNT_ID)] }}
    VERSION: ${{ steps.meta.outputs.version }}
  run: |
    bundle exec kamal deploy --skip-push --version=$VERSION
    echo "Visit me on [http://$KAMAL_SERVER_IP](http://$KAMAL_SERVER_IP) 🚀" >> $GITHUB_STEP_SUMMARY
```

## Helthcheck Route `/up` erstellen

:::info SPA Apps die mit NGINX geserved werden könnend diesen Schritt auslassen

:::

Auf AWS existiert ein reverse proxy, welcher die Route `/up` prüft. Diese
ermöglicht ein sogenanntes zero-downtime deployment. Damit dies jedoch klappt
muss die Route auch existieren.

Damit der node Server die Route `/up` kennt, muss die Datei `server.ts`
erweitert werden:

- Öffnet die Datei `server.ts` im Projektordner
  - findet Ihr sie nicht, habt ihr ziemlich sicher nicht die SSG option gewählt.
- Sucht darin nach `server.set('views'`
- Nach diesem Befehl registrieren wir nun eine GET Route `/up` grün dargestellt.

```typescript title="/neues-ssg-projekt/server.ts"
...
server.set('views', browserDistFolder);

// highlight-green-start
// Health check route
server.get('/up', (req, res) => {
  res.status(200).send('OK');
});
// highlight-green-end

// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });
// Serve static files from /browser
server.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }),
);
...
```

:::caution

Die Route `/up` muss vor der Wildcard Route `**` gesetzt werden!

:::

## Auf AWS deployen

:::caution Credentials!

Achtet darauf, dass die Credentials immer wieder übertragen werden müssen!

:::

