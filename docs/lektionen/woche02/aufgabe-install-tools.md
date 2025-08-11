---
sidebar_position: 4
keywords:
  - pdf
---

# Benötigte Tools installieren

## Docker

Am Ende sollte die Applikation mittels einem Dockerfile als Docker-Image nach
AWS deployed werden können. Um dieses lokal zu erstellen und testen benötigt ihr
`docker` lokal.

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) Sollte mit Docker
  Desktop dabei sein.

:::tip Devcontainer

Das Muster heinhaltet ein Ordner `.devcontainer/`. Sofern Ihr Team Erfahrung
damit hat dürft Ihr diesen gerne verwenden. Leider haben wir keine Zeit allen
Devcontainer zu vermitteln.

:::

:::info gar kein Docker?

Grundsätzlich kann das entwickeln des Dockerfiles ausschliesslich in einer
GitHub Action passieren. Der Feedback-Loop ist jedoch eher bescheiden.

:::

## Git

- [Git](https://github.com/git-guides/install-git#install-git) <br/> oder
  [Github Desktop](https://desktop.github.com/download/) Macht das Clonen
  einfacher auf Windows

## VS Code

Wir arbeiten im Modul mit VS Code. Sofern Ihr ein Java Projekt erstellt dürft
Ihr auch IntelliJ verwenden. Ihr seit aber selber verantwortlich dass es
funktioniert.

- [VS Code](https://code.visualstudio.com/)
- Java Guys dürfen auch [IntelliJ](https://www.jetbrains.com/idea/) verwenden.
- :exclamation: Aber Achtung, devcontainer sind in VS Code besser unterstützt!

## VS Code must have Plugins

Bitte Installiert all diese Plugins!

:::tip lest die Dokus!

- Die Plugins erklären sich selbst am besten ;)

:::

### [Prettier Formatter for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

> [Prettier](https://prettier.io) is an opinionated code formatter. It enforces a consistent
> style by parsing your code and re-printing it with its own rules that take the
> maximum line length into account, wrapping code when necessary.


### [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)

Dieses Plugin "versteht" Conventional Commits und hilft dabei diese korrekt zu
schreiben _(sofern man in VS Code die Git-Commits erstellt)_

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

## Optionale devcontainer Plugins

### [devcontainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Dieses Plugin ermöglicht es direkt in einem lokalen Container zu entwickeln.

### [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

Wird vom Plugin "Dev Containers" benötigt.
