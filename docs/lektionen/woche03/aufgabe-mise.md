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
<summary>Mise Demo (gif)</summary>

![mise demo](./images/mise-demo.gif)

Quelle: [https://mise.jdx.dev/demo.html](https://mise.jdx.dev/demo.html)

</details>

## Aufgaben

### Mit mise node installieren

Startet **ein Terminal im devcontainer** und führt folgende Befehle aus

- Zuerst schauen wir ob `node` vorhanden ist (es sollte nicht)
  ```bash
  node
  > bash: command not found: node
  ```
- Dann installieren wir node lts (longterm supported) global (-g)
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

### Mit mise java installieren

Startet **ein Terminal im devcontainer** und führt folgende Befehle aus

- Zuerst schauen wir ob `java` vorhanden ist (es sollte nicht)
  ```bash
  java
  > bash: command not found: java
  ```
- Dann installieren wir node lts (longterm supported) global (-g)
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

:::tip

So könnt ihr ziemlich jede noch so exotische Sprache installieren!

:::

### Mit `mise` für alle im `.devcontainer/Dockerfile` Programmiersprachen installieren

Wenn ihr die Sprachen wie oben direkt im Container installiert, ist nicht
garantiert, dass andere auch die selben Versionen verwenden. **Damit alle im
Team die gleichen Umgebung haben, muss das
[`.devcontainer/Dockerfile`](https://github.com/codingluke/bbzbl-modul-324-template/blob/main/.devcontainer/Dockerfile)
angepasst werden.** Dabei ist folgendes zu beachten:

- Auf den
  [Linien 27-28 wir mise installiert](https://github.com/codingluke/bbzbl-modul-324-template/blob/main/.devcontainer/Dockerfile#L27-L28).
- Um nun damit Programmiersprachen direkt im Image zu installieren muss dies
  **danach** passieren.
- Zude muss `mise` im Dockerfile mit dem Pfad `~/.local/bin/mise` referenziert
  werden.

Node wird zum Beispiel folgendermassen installiert.

```dockerfile
RUN  ~/.local/bin/mise use node@lts -g
```

Weitere Programmiersprachen können gleich installiert werden.

:::tip

Es macht durchaus Sinn zuerst im Devcontainer zu prüfen was so möglich ist und
erst danach den Code ins Dockerfile zu kopieren.

:::
