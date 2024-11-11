# Ready to Deploy

Nun sollten wir soweit sein, dass mit `docker compose up produciton -d` jedes
Teammitglied lokal die produktive App laufen lassen kann. Damit kann zwar nicht
Entwickeln werden, da es immer neu gebaut werden muss, es hilft jedoch lokal
testen zu können wie die produktive Applikation startet.

## Deployment Konfigurationsdateien anpassen

Um das Image nach AWS deployen zu können braucht es nun noch folgende
Anpassungen:

- Die Kamal config `./kamal/config/deploy.yml` muss als **service** den gleichen
  Namen besitzen wie das **LABEL** im Dockerfile.
  - Im Beispiel lautet dies `service: neues-ssg-projekt`

```yaml title="/kamal/config/deploy.yml"
# INFO: muss gleich sein zum Label "service" des zu deployende Dockerfile
#       siehe: `../../nginx/Dockerfile`
// highlight-red-next-line
- service: nginx
// highlight-green-next-line
+ service: neues-ssg-projekt
...
```

- Der GitHub Action Workflow `./github/workflows/deploy.yml` muss das richtige
  Dockerfile builden und pushen
  - Sucht nach dem step **Build and push nginx Image**
  - ändert hier `context: ./nginx` nach `context: ./neues-ssg-projket`

```yml title=".github/workflows/deploy.yml"
...
      - name: Build and push nginx Image
        uses: docker/build-push-action@v6
        with:
          // highlight-red-next-line
-         context: ./nginx
          // highlight-green-next-line
+         context: ./neues-ssg-projekt
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
...
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

Wenn ihr nun diese Änderungen via Pull-Request in `main` merged, wird
automatisch ein deployment nach AWS durchgeführt.

:::caution Credentials!

Achtet darauf, dass die Credentials immer wieder übertragen werden müssen!

:::

## Optional: Pull-Requests deployen

Momentan ist im `.github/workflows/deploy.yml` definiert, dass die Action nur
ausgeführt wird, wenn in den `main` branch gepushed (merged) wird. Dies ist
schade, da man ja nicht weis, ob das feature funktioniert.

```yml title="Events, die 'Deploy to Amazon AWS' triggern"
on:
  workflow_dispatch:
  push:
    branches: ["main"]
```

Möchte man nun, dass die Action auch bei einem Pull-Request getriggert wird,
kann dies folgendermassen eingestellt werden:

```yml title="on.pull_request triggert nun auch die Aciton"
on:
  workflow_dispatch:
  // highlight-green-next-line
  pull_request:
  push:
    branches: ["main"]
```

:::caution Deployment nach AWS

Dies deployed ein feature branch nach AWS **und kann somit die App kaputt
machen**, dies ist in diesem LAB O.K. in einem Produktiven System wäre dies
fahrlässig!

:::

## Optional: Ein Test und Produktiv System aufbauen

Die GitHub Action `.github/workflows/deploy.yml` deployed automatisch nach AWS.
Dafür verwendet sie die Credentials, welche Ihr eingegeben habt.

Ihre Gruppe besitzt jedoch vier AWS Umgebungen, für jedes Teammitglied eine. Ihr
könntet somit **zusätzliche Credentials mit einem Prefix "TST\_"** für eine
Testumgebung anlegen. :exploding_head:

- **TST\_**AWS_ACCESS_KEY_ID, **TST\_**AWS_SECRET_ACCESS_KEY,
  **TST\_**AWS_SESSION_TOKEN, **TST\_**AWS_SSH_PRIVATE_KEY,
  **TST\_**AWS_ACCOUNT_ID

Danach die Datei `.github/workflows/deploy.yml` nach
**`.github/workflows/deploy-tst.yml`** **kopieren** und in der Kopie folgende
Änderungen vornehmen:

- Den Namen nach "**Deploy to Amazon AWS Test**" ändern
- Die Secrets **Umbenennen** damit sie mit **TST\_** anfangen
- `on.pull_request` hinzufügen damit beim PR deployed wird
- `on.push.branches: ["main"]` entfernen damit nicht doppelt deployed wird

```yml title="Nur noch beim pull_request triggern"
on:
  workflow_dispatch:
  // highlight-green-next-line
+ pull_request:
  // highlight-red-next-line
- push:
  // highlight-red-next-line
-   branches: ["main"]
```

### Test Infrastruktur aufsetzen

Das Test Deployment wird fehlschlagen, da das Testsystem auf Amazon noch nicht
erstellt wurde. Dies kann gemacht werden, indem auch der Workflow
`.github/workflows/aws-infrstructure.yml` nach
`.github/workflows/aws-infrstructure-tst.yml` kopiert wird.

Auch diesem müssen die Credentials ersetzt werden. Dann kann man Ihn manuell
triggern. Sobald dies geschehen ist, sollte das Test Deployment ebenfalls gehen.
:smile:

**Und tataa, hat man fast ein Test und ein Produktiv System! :tada:**

:::tip

- Hier wird nun ersichtlich wie mächtig Automatisierung sein kann! Ein
  Testsystem _for-free_, indem man nur zwei Dateien kopiert und leicht anpasst!

:::
