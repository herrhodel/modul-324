---
sidebar_position: 4
keywords:
  - pdf
---

# Devcontainer einrichten

Der DevContainer wird durch das Dockerfile unter `.devcontainer/Dockerfile`
beschrieben. In dem `Dockerfile` können Tools installiert und konfiguriert
werden, die fürs Projekt nötig sind. Dies erleichtert "in Zukunft" den Einstieg
für neue Projektmitglieder und garantiert dass alle die gleiche Umgebung haben

Theoretisch könnte auch jeder Projektmitarbeiter alle Tools `nodejs`, `java` und
co. selber installieren. Dabei muss aber immer darauf geachtet werden, dass alle
dieselben Versionen verwenden.

:::caution Der devcontainer und das produktive Image sind zwei separate Schuhe

- Der DevContainer (.devcontainer/Dockerfile) dient zum entwickeln. Darin wird
  gearbeitet.
  - :bulb: Der DevContainer wird **lokal gestartet**.
- Das produktive Image (nginx/Dockerfile, oder später ihr-projekt/Dockerfile)
  ist optimiert. Dieses sollte so klein wie möglich sein und nur das nötigste
  beinhalten. Meisten z.B. die gebaute Applikation (ohne node_moduls und co.)
  und nicht der dev Build.
  - :bulb: Das produktive Image wird als Container auf **AWS gestartet**.

:::

## Aufgaben

## Mit `docker compose` den devcontainer starten und prüfen

- Den devcontainer starten
  ```bash
  docker compose up devcontainer -d
  ```
- Mit `docker exec` eine shell im Container öffnen
  ```bash
  docker exec -it devcontainer /bin/bash
  ```
- Im Container den `nginx` starten:
  ```bash
  chmod -x nginx/scripts/start-nginx # evt. nicht nötig, schadet aber nicht
  sh nginx/scripts/start-nginx
  ```
- Prüfen ob der Webserver läuft.
  ```bash
  curl http://localhost:3000
  ```
  - :bulb: Mit `curl` kann man beliebige HTTP Request absetzen. `curl` wird
    daher oft fürs testen verwendet

:::tip

Naütlich kann man auch via Browser den Webserver testen. Dafür muss
`http://localhost:3000` im Browser geöffnet werden.

:::

## In VS Code devcontainer starten und prüfen

:::tip

- Bitte startet den devcontainer zuerst mit `docker compose`.
- VS Code hat nicht so tolle Fehlermeldungen wenn was nicht klappt 🙄

:::

:::caution

- Bitte zuerst [alle benötigten VS Code Plugins installieren](/docs/lektionen/woche03/aufgabe-install-tools.md#vs-code-must-have-plugins)

:::

...

## Produktives Dockerfile testen

```bash
docker compose up production -d
```

In der shell oder im Browser:

```bash
curl http://localhost:3001
```

:::info warum ein eigenes Dockerfile für Dev und Production?

TODO: Antwort folgt

:::
