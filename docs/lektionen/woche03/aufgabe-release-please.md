---
sidebar_position: 4
keywords:
  - pdf
---

# Release Please aufsetzen

Das Muster Template beinhaltet die GitHub Action
["Release Please"](https://github.com/herrhodel/modul-324-muster/blob/main/.github/workflows/release-please.yml)
von Google.

- Alle GitHub Actions befinden sich im Ordner `.github/workflows`.
- Kopiert nun folgenden Inhalt in eine Datei
  `.github/workflows/release-please.yml`.
- Sobald dieser Code im Branch `main` auf GitHub existiert, erstellt oder
  erweitert er bei jedem weiteren commit auf main einen Release Pull-Request
  einen Release Pull Request.

```yaml title=".github/workflows/release-please.yml"
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
# INFO: https://github.com/googleapis/release-please-action
name: Release Please

on:
  push:
    branches:
      - main

permissions:
  contents: write
  pull-requests: write
  issues: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    environment: aws
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          token: ${{ secrets.PAT }}
          release-type: simple
```

## Detailbeschreibung

Die erste Kommentarzeile dient dazu der IDE mitzuteilen, dass es sich um eine
GitHub Action handelt. Dadurch funktionieren Autocomplete.

```yaml
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
# INFO: https://github.com/googleapis/release-please-action
```

Dann Folgt der Name. Dieser wird im GUI auf GitHub angezeigt.

```yaml
name: Release Please
```

Jetzt wird definiert, wann diese Action ausgeführt werden soll. Sie wird immer
bei einem `push` in den branch `main` ausgeführt. Hier könnt hier theoretisch
auch noch andere branches angeben. Dann muss der Wert als Array
`[main, branch2, ...]` definiert werden.

```yaml
on:
  push:
    branches:
      - main
```

Die Permissions definieren, was die Action alles darf. Hier wird z.B. erlaubt
pull-requests zu erstellen.

```yaml
permissions:
  contents: write
  pull-requests: write
  issues: write
```

Schlussendlich folgt unter `jobs` die Action. Wir verwenden eine vorgegebene
[Action "Release Please" von Google](https://github.com/googleapis/release-please-action).
Mit den Attributen `token` und `release-type` wird diese konfiguriert. Das
`token`
[ist euer Personal Access Token](/docs/lektionen/woche01/aufgabe-github-pat-erstellen.md)
aus den Secrets. Der Typ ist
["simple"](https://github.com/googleapis/release-please-action?tab=readme-ov-file#release-types-supported)

```yaml
jobs:
  release-please:
    runs-on: ubuntu-latest
    environment: aws
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          token: ${{ secrets.PAT }}
          release-type: simple
```
