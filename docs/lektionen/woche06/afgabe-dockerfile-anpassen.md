---
sidebar_position: 2
keywords:
  - pdf
---

# Dockerfile

Nun geht es darum ein `Dockerfile` für die eigene Applikation zu erstellen,
damit diese nach AWS deployt werden kann.

Dazu wird in folgende Schritten vorgegangen:

- Datei `docker-compose.yml` erstellen
- Datei `.dockerignore` erstellen
- Datei `Dockerfile` erstellen

## Datei `docker-compose.yml` erstellen

Gundsätzlich wäre `docker compse` nicht nötig. Da es jedoch das Bauen, Starten
und Stoppen von Containern vereinfacht, ist es empfohlen. So kann gewährleistet
werden, dass alle den Container lokal gleich starten. Daher dient es zugleich
als Dokumentation.

Erstellt dafür die Datei `docker-compose.yml` wie folgt beschrieben im
Hauptverzeichnis vom Repository.

```yml title="docker-compose.yml"
services:
  myapp:
    build:
      context: ./app
      dockerfile: Dockerfile
    ports:
      - "8080:80"
```

<details>
  <summary>Detailbeschreibung</summary>

Jedes `docker-compose.yml` beschreibt `services`, welche gebaut, gestartet und
gestoppt werden könne. Services sind nichts anderes als Apps in Container.

```yml
services:
```

Unter `services` wird die `myapp` definiert. Grundsätzlich könnt Ihr einen
eigenen Namen dafür angeben. Er sollte keine Leerzeichen und Umlaute beinhalten.

```yml
myapp:
```

Unter der `myapp` wird der `build` definiert. Mit dem `context` wird angegeben,
wo sich die App befindet. Die App wird wiederum über das `Dockerfile`
beschrieben.

```yml
build:
  context: ./app
  dockerfile: Dockerfile
```

Schlussendlich wird durch `ports` definiert, welcher Port vom Host auf welchen
Port im Container-Context zeigen soll. Hier wird also der port 8080 vom HOST,
also eurem Rechner auf den Port 80 im Container geleitet. Dies bedeutet, dass
die Applikation im Container auf dem Port 80 hören muss. Der Port 80 ist der
Standardport für HTTP Services.

```yml
ports:
  - "8080:80"
```

 </details>

### Befehle

Mit folgenden Befehlen kann die Applikation gebaut und getestet werden.

:::info

- Da noch kein `Dockerfile` existiert, werden die Befehle noch nicht
  funktionieren.
- Sie funktionieren erst, nach dem Punkt
  [Dockerfile erstellen](#dockerfile-erstellen)

:::

#### Docker Compose

Aus dem `Dockerfile` ein **Image bauen**.

```bash
docker compose build myapp
```

App **starten**. <br/> ❗**\*Achtung!** Wurden Änderungen vorgenommen, muss die
App zuerst neu gebaut werden!\*

```bash
docker compose up myapp # Startet mit logs, blockiert das Terminal
docker compose up myapp -d # Ohne logs im Hintergrund, blockiert nix
```

App **stoppen**.

```bash
docker compose down myapp
```

#### Docker standalone

:::info

Diese Befehle müssen im gleichen Oder, in dem sich das `Dockerfile` befindet
ausgeführt werden.

:::

Aus dem `Dockerfile` ein **Image bauen**.

```bash
docker build -t myapp:local .
docker build -t myapp:local --progress plain . # mit Logs!
```

App **starten**. <br/> ❗**\*Achtung!** Wurden Änderungen vorgenommen, muss die
App zuerst neu gebaut werden!\*

```bash
docker run -it myall:local --name myapp
```

App **stoppen**.

```bash
docker stop myapp
```

Terminal im Container öffnen

```bash
docker exec -it myapp /bin/bash
```

:::tip regelmässig builden

- Es empfiehlt sich beim Dockerfile schreiben häufig neu zu builden um zu
  gewährleisten, ob alles klappt.

:::

:::tip keine build Logs?

Docker build schreibt nicht mehr alles in Terminal. Dies erschwert das Debuggen
bei Fehlern. Mit diesem Befehl kann der build Befehl manuell gestartet werden,
inklusive log. Leider geht das nicht via docker-compose, wird jedoch diskutiert

```bash
docker build -t myapp:local --progress plain ./app
```

:::

## Datei `.dockerignore` erstellen

Die Datei `.dockerignore` hat den gleichen Zweck wie die `.gitignore` Datei. Sie
beinhaltet Pfade, die ignoriert werden sollen. Alle Pfade, die in der Datei
`.dockerignore` eingetragen sind, werden von dem `COPY` Befehl bei einem
`docker build` ignoriert. Sofern Sie ein Angular (oder anders Javascript)
Projekt erstellen, wollen Sie bestimmt nicht, dass der Ordner `node_modules`
kopiert wird. Dies kann vor allem auf Windows Systemen zu Probleme führen.

- Erstelle eine Datei `.dockerignore` im Projektordner, also da wo sich auch die
  Datei `package.json` befindet.
- Füge mindestens `node_modules` und `Dockerfile` ein

:::note ein Beispiel für ein Angular Projekt

```bash title=".dockerignore"
node_modules
Dockerfile
.angular
.vscode
```

:::

## Dockerfile erstellen

Nun soll ein Dockerfile erstellt werden, welches die Applikation baut und
startet. Dabei soll beachtet werden, dass der Server auf dem Port 80 gestartet
werden soll.

Es werden zwei Möglichkeiten vorgestellt die beide auf Angular aufbauen.

- Eine mit Angular und SSG (Server Side Generation). Auf diese Weise wir Angular
  über einen eigenen Node Webserver gestartet.
- Eine mit Angular ohne SSG. Dafür muss Angular über einen dediziert Webserver
  (z.B. Nginx) ausgeliefert werden.

:::note Multistage Image

Die Dockerfiles beinhalten zwei `FROM` Befehle. Es handelt sich um sogenannte
Multistage Images. Ein Multistage-Image ermöglicht es zusätzlichen Balast, der
beim Builden benötigt wird (z.B. node_modules, etc.) im resultierten Image zu
entfernen damit das gebaute Image so klein wie möglich ist.

:::

:::caution App-Name kann anders sein

- Überall wo `angular-app-name` steht, müsst Ihr den Namen von eurem Projekt
  angeben.
- Am besten mal `npm build` **ausserhalb vom Dockerfile** ausführen und schauen
  wie die Pfade heissen, die unter `dist` generiert werden.

:::

:::caution npm ci error?

Wenn folgender Error erscheint, müssen Sie zuerst mit `npm install`,
**ausserhalb vom Dockerfile**, die Packages installieren und das
`package-lock.json` commiten!

> npm error `npm ci` can only install packages when your package.json and
> package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock
> file with `npm install` before continuing.

:::

### Beispiel für eine Angular App mit SSG

Erstellt eine Datei `Dockerfile` im Projektordner, also da wo sich die
`package.json` Datei befindet, mit folgendem Inhalt.

```dockerfile title="Beispiel Angular SSG Dockerile"
# Mit AS builder geben wir dem Image eine Namen um darauf zuzugreifen
FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

# Ab hier beginnt das Produktive Image!
FROM node:lts-slim

# Das LABEL muss hier gesetzt sein!
LABEL service="myapp"

WORKDIR /app

# Hier kopieren wir nur den gebauten Code vom builder Image
COPY --from=builder /app/dist/angular-app-name/ .

ENV PORT=80
EXPOSE 80/tcp

CMD [ "node", "/app/server/server.mjs" ]
```

<details>
<summary>Detailbeschreibung</summary>

Es muss mit dem **Befehl `FROM`** definiert werden, von welchem Base-Image
geerbt werden soll. Es gibt für die meisten Programmiersprachen eines. Für
NodeJs wäre das: `FROM node:lts-slim`. Mit `AS builder` wird dem ersten Image
einen Namen gegeben, damit darauf zugegriffen werden kann. Dieses wird am Ende
"weggeworfen".

```Dockerfile
FROM node:lts-slim AS builder
```

Nun definieren wir mit `WORKDIR` einen Arbeitsordner **innerhalb vom Image**.
_Dieser Ordner hat nichts mit dem `app` Ordner im Repository zu tun._

```Dockerfile
WORKDIR /app
```

Als Nächstes muss der **Projektcode mit `COPY` ins Image kopiert** werden. Da
sich das `Dockerfile` innerhalb vom Projektordner befindet, bedeutet folgender
Befehl, dass alles vom aktuellen Ordner ins Image kopiert wird, ausser Pfade,
die im `.dockerignore` ausgeschlossen werden.

```Dockerfile
COPY . .
```

Sind die Dateien verfügbar, müssen **mit dem `RUN` Befehl die Pakete installiert
und die App gebaut werden**. Für Angular (und andere node apps) geht es
folgendermassen.

```Dockerfile
RUN npm ci && npm run build
```

Damit ist das "builder" Image beschrieben. Darauf folgt die Definition vom
resultierten Image.

Auch hier wird durch `FROM node:lts-slim` vom offiziellen Node Image geerbt.
Dies könnte theoretisch auch ein komplett anderes sein.

```Dockerfile
FROM node:lts-slim
```

Der vom Projekt verwendete Deployment-Mechanismus **verlangt, dass das Image ein
`LABEL` "service" besitzt**. Dieses LABEL ist später noch wichtig.

```Dockerfile
LABEL service="myapp"
```

Auch hier wird mit `WORKDIR` einen Arbeitsordner **innerhalb vom Image**
gesetzt. _Dieser Ordner hat ebenfalls nichts mit dem `app` Ordner im Repository
zu tun._

```Dockerfile
WORKDIR /app`
```

Nun wird mit dem `COPY` Befehl, nicht vom Host Dateien kopiert, sondern vom
vorherigen Image mit dem Namen "builder".

```Dockerfile
COPY --from=builder /app/dist/angular-app-name/ .
```

Da die App auf dem Port 80 laufen muss, müssen wir dies definieren. Unter NodeJs
geht dies durch die Umgebungsvariable `PORT` die per `ENV` Befehl gesetzt werden
kann.

```Dockerfile
ENV PORT=80
```

Auch muss dem Image der Port 80 freigegeben werden. Dies geschieht durch den
`EXPOSE` Befehl.

```Dockerfile
EXPOSE 80/tcp
```

Schlussendlich, kann nun **mit dem `CMD` Befehl der Server auf PORT 80 gestartet
werden**

```Dockerfile
CMD [ "node", "/app/dist/angular-app-name/server/server.mjs" ]
```

</details>

:::caution noch nicht ready zum Deployen auf AWS

- Die App wird zwar auf port 80 geserved. Die Angular App braucht aber noch eine
  Route `/up` die ein HTTP code 200 zurück, gibt!

:::

### Beispiel für eine Angular SPA App ohne SSG, mit nginx geserved

Für alle die eine klassische SPA App entwickeln, welche nicht über einen NodeJs
Server verfügen (SSG), müssen mit einem dedizierten Webserver geserved werden.
In diesem Modul nehmen wir dafür einen Nginx. Der Builder ist in diesem Falle
gleich zur SSG app. Das zweite Image ist jedoch einen Nginx.

:::danger

Eine Angular App ohne SSG könnte auch via `ng serve` im `Dockerfile` gestartet
werden, ohne Nginx. Dies ist jedoch extrem ineffizient, da es sich um den
Developer Mode handelt. Dieser ist:

1. Nicht sicher
2. Brauch viel mehr Server-Power und verbraucht AWS Geld ;)

:::

```dockerfile title="Beispiel Angular/Nginx Dockerfile"
# Mit AS builder geben wir dem Image eine Namen um darauf zuzugreifen
FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

# Ab hier beginnt das Produktive Image!
FROM nginx:1.29-bookworm

LABEL service="myapp"

# Hier kopieren wir nur den gebauten Code für den Browser vom builder Image
COPY --from=builder /app/dist/angular-app-name/browser /usr/share/nginx/html
# Hier kopieren wir die nginx.conf Konfigurationsdatei (siehe weiter unten)
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

<details>
<summary>Detailbeschreibung</summary>

Es muss mit dem **Befehl `FROM`** definiert werden, von welchem Base-Image
geerbt werden soll. Es gibt für die meisten Programmiersprachen eines. Für
NodeJs wäre das: `FROM node:lts-slim`. Mit `AS builder` wird dem ersten Image
einen Namen gegeben, damit darauf zugegriffen werden kann. Dieses wird am Ende
"weggeworfen".

```Dockerfile
FROM node:lts-slim AS builder
```

Nun definieren wir mit `WORKDIR` einen Arbeitsordner **innerhalb vom Image**.
_Dieser Ordner hat nichts mit dem `app` Ordner im Repository zu tun._

```Dockerfile
WORKDIR /app
```

Als Nächstes muss der **Projektcode mit `COPY` ins Image kopiert** werden. Da
sich das `Dockerfile` innerhalb vom Projektordner befindet, bedeutet folgender
Befehl, dass alles vom aktuellen Ordner ins Image kopiert wird, ausser Pfade,
die im `.dockerignore` ausgeschlossen werden.

```Dockerfile
COPY . .
```

Sind die Dateien verfügbar, müssen **mit dem `RUN` Befehl die Pakete installiert
und die App gebaut werden**. Für Angular (und andere node apps) geht es
folgendermassen.

```Dockerfile
RUN npm ci && npm run build
```

Damit ist das "builder" Image beschrieben. Darauf folgt die Definition vom
resultierten Image.

Hier verwenden wir jedoch das offizielle Nginx Image, wie bei der Musterlösung.

```Dockerfile
FROM nginx:1.29-bookworm
```

Der vom Projekt verwendete Deployment-Mechanismus **verlangt, dass das Image ein
`LABEL` "service" besitzt**. Dieses LABEL ist später noch wichtig.

```Dockerfile
LABEL service="myapp"
```

Nun wird mit dem `COPY` Befehl, nicht vom Host Dateien kopiert, sondern vom
vorherigen Image mit dem Namen "builder". Unterschiedlich zum SSG Beispiel wird
nur der Part für den Browser kopiert. Und zwar in den Nginx Html Ordner.

```Dockerfile
COPY --from=builder /app/dist/angular-app-name/browser /usr/share/nginx/html
```

Zusätzlich muss noch die Nginx Konfigurationsdatei kopiert werden. Dafür solltet
ihr eine `nginx.conf` im Projektordner erstellen. Der Inhalt könnt Ihr
[von unterhalb kopieren](#die-dafür-passende-nginxconf-konfigurationsdatei).

```Dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Da das offizielle Image bereits den Port 80 exposed und den Nginx startet,
entfallen die Befehle `Expose` und `CMD`, die bei der SSG Variante nötig sind.

</details>

#### Die dafür passende `nginx.conf` Konfigurationsdatei

```nginx title="nginx.conf"
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /usr/share/nginx/html;
    index index.html index.htm;

    server_name _;
    location / {
        try_files $uri $uri/ = 404;
    }

    location /up {
        return 200;
    }
}
```

:::tip bereits ready zum Deployen auf AWS

- Da der nginx mit der oberen Konfigurationsdatei eine `location /up` definiert,
  kann dieses Image bereits deployt werden.

:::

## App via Dockerfile lokal starten

Wenn nun das `Dockerfile` erstellt wurde, kann mit dem Befehl die App gestartet
werden.

```bash
docker compose up -d
```

Danach sollte über den Browser via http://localhost:8080 die App zugreifbar
sein.

:::info Wieso der Aufwand?

Natürlich könnt Ihr auch mit dem development Mode `npm start` denselben Effekt
generieren. Jedoch nur lokal! Nun mit dem Dockerfile kann die App überall wo
docker installiert ist gestartet werden 🥳

:::
