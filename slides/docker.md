---
marp: true
theme: bbzbl
paginate: true
header: Modul 324 - DevOps
footer: BBZBL / Lukas Hodel / DevOps-Prozese mit Tools unterstützen
---

<!-- _class: big center -->

# Docker / Dockerfile

## Modul 324

---

# Warentransport früher

![bg right fit](./images/alamy-rheinlaender-handelswagen.jpg)

- Verschiedene Dinge
- Verschiedene Grössen

- Schwierig zu Transportieren

---

# Warentransport heute

- Container standardisieren den Transport!
- Verschiedene Dinge, verpackt in eine Einheitsgrösse 🤯 🚢 🚚

::: columns

![inline fit](./images/pexels-container-shiff.jpg)

:::split

![inline fit](./images/pexels-container-lkw.jpg)

:::

---

# Software ausliefern

![inline](images/software-delivery-berfore-after-docker.png)

::: columns

- Manuelle Arbeit beim Entwickeln
- Manuelle Arbeit beim Deployment

::: split

- Einmalige Arbeit beim Entwickeln (`Dockerfile`)

:::

---

# Docker Prinzip

![inline](./images/docker-file-image-container.png)

---

# Dockerfile

::: columns l60 s2

- `FROM`: Erbt immer von einem Basisimage
- `ARG`: Environment Variablen während der Buildzeit
- `ENV`: Environment Variablen während Build- und Laufzeit
- `COPY`: Kopiert Dateien ins Image
- `SHELL`: Befehl, für die Standard-Shell.
  - Standard ist `sh` und nicht `bash`!
- `RUN`: Führt Befehle aus
- `EXPOSE`: Öffnet Ports auf die zugegriffen werden können
- `CMD`: Wird ausgeführt, wenn der Container gestartet wird

::: split

Beispieldatei für einen Nginx, sofern manuell installiert

```Dockerfile
FROM ubuntu:24.10 # Definiert die Basis

# Ausführen von Code (hier wie in einem Ubuntu)
# Installieren von Nginx
RUN apt-get -y update && apt-get -y install nginx git curl

# Kopieren von lokalen Dateien
# Die Nginx Konfigurationsdatei
COPY nginx.conf /etc/nginx/sites-available/default
# Das HTML dass ausgeliefert werden soll
COPY src/* /usr/share/nginx/html

# Definieren, welche Ports geöffnet sind
EXPOSE 80/tcp

# Befehl, der beim Ausführen ausgeführt werden soll
# Hier, starten vom Nginx
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

:::

::: footnotes

Referenz: https://docs.docker.com/reference/dockerfile/

:::

---

# Docker Image

- Sobald ein Dockerfile gebuildet wird, wird es zu einem Image
  - `docker build -f Dockerfile -t myimage:1.0.0`
- Es beinhaltet die Applikation sowie das Betriebssystem
- Es ist unveränderlich (immutable)
- Es kann in eine Registry hochgeladen werden
  - z.B. die Container Registry, die wir auf AWS installiert haben.
  - Oder auch auf hub.docker.com, die Standard-Docker-Registry
  - `docker push myimage:1.0.0`

::: footnotes

- https://docs.docker.com/reference/cli/docker/image/push/
- https://docs.docker.com/reference/cli/docker/buildx/build/

:::

---

# Docker Container

- Wird ein Docker Image ausgeführt, wird es zu einem Container
  - `docker run myimage:1.0.0`
  - `docker run --name myimage -d myimage:1.0.0`

- Ein Image kann mehrfach, gleichzeitig ausgeführt werden.
- `docker run` Befehle können sehr schnell, sehr kompliziert werden!

::: footnotes

https://docs.docker.com/reference/cli/docker/container/run/

:::

---

# Docker Compose

::: columns s2

- Eine Datei um Container zu konfigurieren und das **Starten zu vereinfachen**.
  - `docker compose up` <br>startet alle definierten Container
  - `docker compose down` <br>beendet alle wieder

- **myservice** wird durch ein Dockerfile gebuildet
- **mysql** über ein Image von hub.docker.com

::: split

```yaml
services:
  myservice: # name des Service
    # Definiert welches Dockerfile dem Service gehört
    build:
      context: . # Muss zum Ordner mit einem Dockerfile zeigen
      dockerfile: Dockerfile
    container_name: myservice
    ports:
      - "8080:80" # host-port:container-port
    volumes: .:/app/ # Synchronisiert Ordner in den Container
  mysql:
    container_name: mysql
    image: "mysql:latest" # Image von hub.docker.com
    environment: # Environment Variablen
      - "MYSQL_DATABASE=mydatabase"
      - "MYSQL_PASSWORD=secret"
      - "MYSQL_ROOT_PASSWORD=verysecret"
      - "MYSQL_USER=myuser"
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql # dauerhaftem Speicher

volumes:
  # INFO: Ohne dieses Volumen löscht es die DB bei jedem Neustart
  mysql-data:
```

:::

::: footnotes

https://docs.docker.com/compose/compose-application-model/

:::

---

# Dockerfile für die AWS Umgebung

- Muss den **TCP Port 80** exposen

- Muss auf dem Port 80 einen **Webserver** serven.
  - `Nginx` oder auch `node` oder `sprint-boot/tomcat`

- Muss auf dem Port 80 eine Route **/up** besitzen die ein Status 200 OK
  zurückgibt.
  - Dies muss die App machen.
  - `curl http://localhost:3000/up` muss Status **200** zurückgeben
  - :zap: **Fehlt diese Route, wird das Deployment fehlschlagen**

---

# Multistage Dockerfile für Angular mit Nginx

::: columns s2

Es existiert ein **eigenes build Image**, damit das **produktive Image kleiner**
ist (keine node_modules).

- Sourcecode ins Image kopieren `COPY`
- Abhängigkeiten installieren und builden `RUN` <br>
  `npm install && npm run build`
- App in neues Image Kopieren

:zap: **Diese Datei muss noch individuell angepasst werden!**

::: split

```Dockerfile
# Mit AS builder geben wir dem Image einen
# Namen um darauf zuzugreifen
FROM node:lts-slim AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Ab hier beginnt das Produktive Image!
FROM nginx:1.29-bookworm
LABEL service="myapp"
# Hier kopieren wir nur den gebauten Code
# für den Browser vom builder Image
COPY --from=builder \
     /app/dist/angular-app-name/browser \
     /usr/share/nginx/html
# Hier kopieren wir die nginx.conf Konfigurationsdatei
# (siehe weiter unten)
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

:::

---

# Docker Cheat Sheet (nginx-tempate)

```bash
docker compose build # buildet alle Images
docker compose up -d # -d startet die services im hintergrund (keine logs)
docker compose down  # stop alle services
```

## Eine Bash in einem Container starten

```bash
docker ps                               # zeigt alle gestarteten container an
docker exec -it containername bin/bash  # startet bash im container
```

::: footnotes

https://docs.docker.com/get-started/docker_cheatsheet.pdf

:::
