---
sidebar_position: 2
keywords:
  - pdf
---

# Produktives Dockerfile

Sofern Ihr noch keine Anpassungen an der CI/CD Pipeline vorgenommen habt, wird
immer noch das `nginx` Image gebuildet und nach AWS deployed. Bis jetzt haben
wir nur das `.devcontainer/Dockerfile` angepasst. Dieses dient dazu damit alle
lokal eine einheitliche Entwicklungsumgebung haben.

**Nun geht es darum ein Dockerfile für die eigene Applikation zu erstellen,
damit diese nach AWS deployed werden kann.**

## Datei `docker-compose.yml` anpassen

In der Datei `docker-compose.yml` gibt es unter `service` den Eintrag
`production`.

```yml title="docker-compose.yml"
services:
  production:
    build:
      // highlight-next-line
      context: ./nginx/
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
```

Wie zu sehen ist ist der `services.production.build.context: ./nginx/` gesetzt.
Dies bedeutet, dass beim starten des Containers mit dem Befehl
`docker compose up production -d` im Ordner `./nginx` nach einem `Dockerfile`
gesucht wird. Dieses wird gebaut und gestartet. Dabei wir der Port 3000 nach
3001 umgeleitet, da der Devcontainer bereits den Port 3000 exposed.

### Eigene App als context setzten

Um nun die eigene Applikation zu bauen und starten, muss hier den Kontext neu
gesetzt werden.

```yml title="docker-compose.yml"
services:
  production:
    build:
      // highlight-next-line
      context: ./neues-ssg-projekt/
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
```

:::tip regelmässig builden

- Während Ihr die folgenden Befehle ins `Dockerfile` schreibt, könnt ihr mit
  `docker compose build production` regelmässig prüfen ob alles klappt.
- Wenn ihr fertig seit und den Container starten möchtet, geht die mit
  `docker compose up production`. Dann sollte auf `http://localhost:3001` die
  eigene App erscheinen.

:::

:::caution

Natürlich geht `docker compose build production` nun noch nicht, da zuerst das
Dockerfile erstellt werden muss. Mit dieser Einstellung, können wir nun aber
bequem das Dockerfile Schrittweise, während dem erstellen builden und testen.

:::

## Datei `.dockerignore` erstellen

Die Datei `.dockerignore` hat den gleichen Zweck wie die `.gitignore` Datei. Sie
beinhaltet Pfade, die ignoriert werden sollen. Alle Pfade, die in der Datei
`.dockerignore` eingetragen sind, werden von dem `COPY` Befehl bei einem
`docker build` ignoriert. Sofern Sie ein Angular (oder anders Javascript)
Projekt erstellen, wollen Sie bestimmt nicht, dass der Ordner `node_modules`
kopiert wird. Dies kann vor allem auf Windows Systemen zu Probleme führen.

- Erstelle eine Datei `.dockerignore` im Projektordner
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
startet. Dabei soll beachtet werden, dass der Server auf dem Port 3000 gestartet
werden soll.

:::caution

- Diese Anleitung basiert auf einem Angular SSG Projekt mit dem Namen
  "neues-ssg-projekt", **dieser muss mit euren Namen ersetzt werden**.
- Ein Angular app ohne SSG benötigt einen nginx,
  [mehr dazu hier](#beispiel-für-eine-angular-spa-app-ohne-ssg-mit-nginx-geserved).

:::

- Als erstes erstellt Ihr eine **neue Datei namens "Dockerfile" innerhalb vom
  Projektordner**.
  - Also nicht im Root vom Repository!
- Nun muss mit dem **Befehl `FROM`** definiert werden, von welchem Base-Image
  geerbt werden soll.
  - Es gibt für die meisten Programmiersprachen eines.
  - Für node: `FROM node:lts-slim`

:::note mise nicht nötig

- Da nun direkt ein Base image einer Sprache verwendet wird, muss diese nicht
  noch installiert werden.

:::

- Der vom Projekt verwendete deployment Mechanismus **verlangt, dass das Image
  ein `LABEL` "service" besitzt**.
  - `LABEL service="neues-ssg-projekt"`
  - Diese LABEL ist später noch wichtig.
- Nun **definieren wir mit `WORKDIR` einen Arbeitsordner** innerhalb vom Image.
  - `WORKDIR /app`
- Als nächstes muss der **Projektcode mit `COPY` ins Image kopiert** werden.
  - Da sich das Dockerfile innerhalb vom Projektordner befindet, bedeutet
    folgender Befehl, dass alles vom aktuellen Ordner ins Image kopiert wird.
    Ausser Pfade im `.dockerignore`.
  - `COPY . .`
- Sind die Dateien verfügbar, müssen **mit dem `RUN` Befehlt die Pakete
  installiert und die App gebaut werden**. Für Angular (und andere node apps)
  geht es folgendermassen.
  - `RUN npm ci && npm run build`

<details>
<summary>npm ci error?</summary>

Wenn folgender Error erscheint, müssen Sie zuerst mit `npm install` im
Devcontainer die Packages installieren und das `package-lock.json` commiten!

> npm error `npm ci` can only install packages when your package.json and
> package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock
> file with `npm install` before continuing.

</details>

- Da die App auf dem Port 3000 laufen muss, müssen wir dies definieren. Unter
  node geht dies durch die Umgebungsvariable `PORT` die per `ENV` Befehl gesetzt
  werden kann.
  - `ENV PORT=3000`
- Zudem muss dem Image der Port 3000 auf freigegeben werden. Dies geschieht
  - `EXPOSE 3000/tcp` durch den `EXPOSE` Befehl.
- Wurde die App gebaut und der PORT 3000 ist parat, kann nun **mit dem `CMD`
  Befehl der Server auf PORT 3000 gestartet werden**
  - `CMD [ "node", "/app/dist/neues-ssg-projekt/server/server.mjs" ]`

### Beispiel für eine Angular App mit SSG

```dockerfile title="Beispiel Angular Dockerile (unoptimized)"
FROM node:lts-slim

LABEL service="neues-ssg-projekt"

WORKDIR /app

COPY . .

RUN npm ci && npm run build

ENV PORT=3000
EXPOSE 3000/tcp

CMD [ "node", "/app/dist/neues-ssg-projekt/server/server.mjs" ]
```

:::caution noch nicht ready zum deployen auf AWS

- Die App wird zwar auf port 3000 geserved. Die angular app braucht aber noch
  eine route `/up` die ein HTTP code 200 zurück gibt!
- Auch sollte das Dockerfile wie folgt erläutert noch optimiert werden.

:::

## Dockerfile optimieren mit Multistage

Grundsätzlich ist das obere Dockerfile funktionsfähig. Da jedoch die Node App
darin gebaut wurde und die Pakete installiert wurden, beinhaltet das Image
unnötigen balast. Grundsätzlich sollte ein Dockerimage so klein wie möglich
sein.

Um dies zu erreichen, gibt es
[**Multistage Dockerfiles**](https://docs.docker.com/build/building/multi-stage/).
Ein Multistage Dockerfile besitzt zwei Dockerfile Definitionen untereinander,
wobei die erste der "builder" ist und nach dem build "weggeworfen" wird. Es wird
nur das zweite Image verwendet.

### Beispiel für eine Angular App mit SSG

```dockerfile title="Multistage Image"
# Mit AS builder geben wir dem Image eine Namen um darauf zuzugreifen
FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

# Ab hier beginnt das Produktive Image!
FROM node:lts-slim

# Das LABEL muss hier gesetzt sein!
LABEL service="neues-ssg-projekt" 

WORKDIR /app

# Hier kopieren wir nur den gebauten Code vom builder Image
COPY --from=builder /app/dist/neues-ssg-projekt/ .

ENV PORT=3000
EXPOSE 3000/tcp

CMD [ "node", "/app/server/server.mjs" ]
```

:::caution noch nicht ready zum Deployen auf AWS

- Nun ist das Dockerfile zwar optimiert. Die Route `/up` fehlt jedoch immer
  noch!

:::

### Beispiel für eine Angular SPA App, ohne SSG mit nginx geserved

Für alle die eine klassische SPA App entwickeln, welche nicht über einen node
Server verfügen (SSG), müssen mit einem dedizierten Webserver geserved werden.
In diesem Modul nehmen wir dafür einen Nginx.

Der Builder ist in diesem falle gleich. Das zweite Image ist jedoch einen Nginx.
Auch wird dann die gebaute App zum nginx kopiert.

```dockerfile
# Mit AS builder geben wir dem Image eine Namen um darauf zuzugreifen
FROM node:lts-slim AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

# Ab hier beginnt das Produktive Image!
FROM nginx

LABEL service="neues-spa-projekt"

# Hier kopieren wir nur den gebauten Code vom builder Image
COPY --from=builder /app/dist/neues-spa-projekt/browser /usr/share/nginx/html
# Hier kopieren wir die nginx Konfigurationsdatei (Ihr könnt diese vom nginx service kopieren!)
COPY default /etc/nginx/sites-available/default

EXPOSE 3000/tcp

# Eine standard nginx Konfigurationsdatei um eine SPA auf Port 3000 zu serven
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

#### Die dafür passende nginx _default_ Konfigurationsdatei

```nginx title="default"
server {
    listen 3000 default_server;
    listen [::]:3000 default_server;

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

- Da der nginx mit der oberen "default" Konfigurationsdatei eine `location /up`
  definiert, kann dieses Image bereits deployed werden.

:::
