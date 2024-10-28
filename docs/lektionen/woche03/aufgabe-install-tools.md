---
sidebar_position: 1
keywords:
  - pdf
---

# Benötigte Tools installieren

## Docker

Damit zügig am Projekt gearbeitet werden, wird das Template mit einem
[DevContainer](https://containers.dev/) ausgeliefert. Dieser benötigt docker.
Auch ist es am einfachsten weitere Services, wie z.B. eine Datenbank, via Docker
zu starten als manuell zu installieren.

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) Sollte mit Docker
  Desktop dabei sein.

:::info kein Docker?

Grundsätzlich ist es möglich auch ohne docker lokal zu entwickeln. Ihr seit
selber verantwortlich alle Tools zum entwickeln zu installieren und
konfigurieren.

:::

## Git

- [Git](https://github.com/git-guides/install-git#install-git) <br/> oder
  [Github Desktop](https://desktop.github.com/download/) Macht das Clonen
  einfacher auf Windows

## VS Code

Wir arbeiten im Modul mit VS Code. Sofern Ihr ein Java Projekt erstellt dürft
Ihr auch IntelliJ verwenden. Ihr seit aber selber verantwortlich dass es
funktioniert.

- [VS Code](https://code.visualstudio.com/) Java Guys dürfen auch
  [IntelliJ](https://www.jetbrains.com/idea/) verwenden.

## VS Code must have Plugins

Bitte Installiert all diese Plugins!

### [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

Dieses Plugin garantiert, dass alle (auch Windows Benutzer) die richtigen Line
Endings verwenden.

:::danger

Es gibt gewisse Bash-Scripte unter `/terraform/scripts` die nicht funktionieren
mit Windows-Lineendigns!

:::

### [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

Standard Plugin um laufende Docker containers in VS Code zu sehen. Geht auch
ohne, VS Code wird euch sowieso nerven es zu installieren.

### [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Dieses Plugin ermöglicht es direkt in einem lokalen Container zu entwickeln.

:::info Kein bock auf DevContainer?

Ihr dürft auch ohne DevContainer entwickeln. Müsst euch dann einfach absprechen,
welche Tools (Programmierspachen und co.) in welcher Version verwendet werden
sollen.

:::

### [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

Wird vom Plugin "Dev Containers" benötigt.

## Projekt Repository lokal klonen


