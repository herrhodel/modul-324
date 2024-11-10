---
sidebar_position: 4
keywords:
  - pdf
---

# Devcontainer anpassen

Der Devcontainer ist standardmässig nur mit Nginx ausgestattet. Es sind noch
keine Programmiersprachen installiert. Dies wird für die meisten Projekte nicht
reichen.

Es wurde jedoch das Tool [`mise`](https://mise.jdx.dev/) installiert, mit
welchem sehr einfach beliebige Sprachen installiert werden können.
[Mise](https://mise.jdx.dev/) ist ein universeller Packetmanager für Sprachen,
aber auch andere Tools.

<details>
<summary>:tv: Video der Aufgabe</summary>

<YouTube id="V_Ky1xibL_M" />

<br/>
:::caution

- Im Video verwende ich noch den Befehl `~/.local/bin/mise use`
- Neu könnt Ihr auch im Dockerfile `mise use` verwenden!

:::

</details>

## Aufgaben

### Branch `mise-test` erstellen

Die folgende Aufgabe soll jeder für sich machen und ist nur bedingt
Projektbezogen. Um Mergekonflikte zu vermeiden, sollen diese in einem eigenen
Branch geschehen. Dieser Branch müsst ihr nicht pushen. Einen Branch erstellt
ihr mit folgendem Befehl:

```bash
git checkout -b mise-test
```

### Node installieren

Startet **ein Terminal im devcontainer** und führt folgende Befehle aus

- Zuerst schauen wir ob `node` vorhanden ist (es sollte nicht)
  ```bash
  node
  > bash: command not found: node
  ```
- Dann installieren wir node lts
  ([long-term supported](https://nodejs.org/en/about/previous-releases)) global
  (-g)
  ```bash
  mise use node@lts -g
  ```
- Nun prüfen wir nochmals ob `node` vorhanden ist (es sollte sein)
  ```bash
  node
  Welcome to Node.js v22.10.0.
  Type ".help" for more information.
  >
  ```

### Java installieren

Startet **ein Terminal im devcontainer** und führt folgende Befehle aus

- Zuerst schauen wir ob `java` vorhanden ist (es sollte nicht)
  ```bash
  java
  > bash: command not found: java
  ```
- Dann installieren wir java lts (long-term supported) global (-g)
  ```bash
  mise use java@lts -g
  ```
- Nun prüfen wir nochmals ob `java` vorhanden ist (es sollte sein)
  ```bash
  java --version
  openjdk 21.0.2 2024-01-16
  OpenJDK Runtime Environment (build 21.0.2+13-58)
  OpenJDK 64-Bit Server VM (build 21.0.2+13-58, mixed mode, sharing)
  ```

:::note

So könnt ihr ziemlich jede noch so exotische Sprache installieren

- wie [rust](https://www.rust-lang.org/) (`mise use rust@stable -g`) oder
  [zig](https://ziglang.org/): (`mise use zig@0.13.0 -g`)

:::

### Herausfinden was es für Versionen gibt

Mit dem Befehl `mise list-all [sprache] [prefix]` ist es möglich alle
verfügbaren Versionen aufzulisten

#### Zeige alle node Versionen an

```bash
mise list-all node
0.1.14
0.1.15
...
22.10.0
23.0.0
23.1.0
```

#### Zeige alle Java "openjdk" Versionen an

```bash
mise list-all java openjdk
openjdk-9.0.0
openjdk-9.0.1
...
openjdk-23.0.0
openjdk-23.0.1
```

### Für alle Programmiersprachen bereitstellen

Um zu garantieren, dass alle im Team die selbe Umgebung haben, müssen die
Sprachen, nicht wie oben im Container, **sondern im
[`.devcontainer/Dockerfile`](https://github.com/codingluke/bbzbl-modul-324-template/blob/main/.devcontainer/Dockerfile)**
installiert werden.

Dabei ist folgendes zu beachten:

- Öffne das Projekt im Devcontainer mit **"Reopen in Container"**
- Öffne die Datei
  [`.devcontainer/Dockerfile`](https://github.com/codingluke/bbzbl-modul-324-template/blob/main/.devcontainer/Dockerfile)
- Suche folgenden Befehl
  ```dockerfile
  RUN curl https://mise.run | sh \
  ```
  - Damit wird das cli tool "mise" installiert.
- Um nun damit Programmiersprachen direkt im Image zu installieren, muss dies
  **danach** passieren.
- Füge nun den folgenden **Befehl danach ins `Dockerfile`** ein. (Er sollte
  bereits als Kommentar existieren)
  ```dockerfile
  RUN  mise use node@lts -g
  ```
  - Damit wird die "long-term supported" Version von Nodejs installiert
- Wenn das `.devcontainer/Dockerfile` geändert wurde, muss der Devcontainer neu
  gebaut werden. **"Rebuild Container"**

:::tip

- Es macht durchaus Sinn zuerst im Devcontainer zu prüfen was möglich ist und
  erst danach den Code ins `Dockerfile` zu kopieren.
- Auch macht es Sinn den devcontainer mit `docker compose build devcontainer`
  zuerst zu bauen, da VS Code nicht so schöne Fehlermeldungen generiert.

:::
