---
sidebar_position: 1
keywords:
  - pdf
---

# ESLint konfigurieren

:::info

Diese Action **existiert nicht im Muster**, da das Muster nur aus einem nginx
besteht und somit keinen Code zum Linten beinhaltet.

:::

## Neuer Branch erstellen

`git checkout -b feat/eslint`

## ESLint Dateien generieren

Mit dem Befehl `ng lint` lintet Angular das Projekt. **Beim ersten Ausführen
werden direkt alle Konfigurationsdateien erstellt.**

- `ng lint` ausführen
- alles mit "yes" akzeptieren

Ab nun kann mit `ng run lint` das Projekt gelintet werden.

## Applikation in der Github Action linten

In der CI-CD Pipeline ist es möglich, dass bei einem Pull-Request automatisch
gelintet wird und sogleich auf den jeweiligen Zeilen eine Anmerkung angezeigt
wird. Dass dies funktioniert, muss das Linting das Resultat in eine Datei
schreiben.

Dazu benötigen wir ein neues Script sowie eine GitHub Workflow definition.

### ESLint CI Script definieren

Dies erreichen wird, indem wir in der Datei `app/package.json` einen neues
Script `lint:ci` wie folgt definieren:

```json
{
  "scripts": {
    "...",
    //highlight-green-next-line
    "lint:ci": "ng lint --output-file eslint_report.json --format json",
    "..."
  }
}
```

Der Task `npm run lint:ci` lintet das Projekt und schreibt das Resultat in eine
Ausgabedatei `eslint_report.json`

### GitHub Action Workflow

Damit automatisch auf GitHub das Projekt gelintet wird benötigen wir einen
GitHub Action Workflow.

Dafür erstellen wir eine GitHub Action Datei `.github/workflows/lint.yml` mit
folgendem Inhalt.

```yaml title=".github/workflows/lint.yml"
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: Lint
on:
  push:
    paths: app/**
jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install node
        uses: actions/setup-node@v4
        with:
          node-version: 22 # lts
          cache: "npm"
          cache-dependency-path: app/package-lock.json
      - name: Install Dependencies
        working-directory: app
        run: npm ci
      - name: Lint
        working-directory: app
        run: npm run lint:ci
        continue-on-error: true
      - name: Annotate Code
        uses: DerLev/eslint-annotations@v2
        with:
          eslint-report: app/eslint_report.json
```

:::tip GitHub Action eslint-annotations

Die verwendete GitHub Action _`DerLev/eslint-annotations@v2_` liest die eslint
Ausgabedatei und macht direkt im Pull-Request Bemerkungen an die Linien! 🤯

:::

### Genaue Analyse der Datei

Der Workflow heisst Lint, da er den Code lintet.

```yaml
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: Lint
```

Es wird definiert, dass dieser Workflow immer dann ausgeführt werden soll, wenn
Code nach GitHub gepushed wird, welcher unter dem Ordner `app` Änderungen
beinhaltet. Egal in welchen Branch.

```yaml
on:
  push:
    paths: app/**
```

Es wird ein Job `lint` definiert. Dieser heisst Lint und wird in einer ubuntu
Instanz ausgeführt. Unter `steps` werden die verschiedenen Schritte definiert.

```yaml
jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
```

Jede Action, welche auf den Code vom Repository zugreifen möchte, benötigt
diesen Schritt. Dies ladet den Code vom Repo in den Container.

```yaml
- uses: actions/checkout@v4
```

Da wir NodeJs verwenden wird es mit diesem Schritt im Container installiert.
Wichtig hier der Cache, sodass es schneller geht!

```yaml
- name: Install node
  uses: actions/setup-node@v4
  with:
    node-version: 22 # lts
    cache: "npm"
    cache-dependency-path: app/package-lock.json
```

Ist NodeJs installiert werden die Pakete installiert. `npm ci` ist ein
`npm install` das exakt die Pakete installiert welche im `package-lock.json`
definiert sind.

```yaml
- name: Install Dependencies
  working-directory: app
  run: npm ci
```

Jetzt, da NodeJs existiert und die Pakete installiert wurden, kann mit dem
Befehl `npm run lint:ci` das linting gestartet werden. Der Befehl schreibt die
Datei "app/eslint_report.json".

Zu beachten ist der Punkt `continue-on-error: true`. Er garantiert, dass die
Action nicht abgebrochen wird, wenn eslint einen Error findet. Dies ist wichtig,
damit der nächste Schritt überhaupt ausgeführt wird, welcher den Code dem Pull
Request hinzufügt.

```yaml
- name: Lint
  working-directory: app
  run: npm run lint:ci
  continue-on-error: true
```

Schlussendlich wird durch die Action
[`DerLev/eslint-annotations@v2`](https://github.com/DerLev/eslint-annotations)
die geschriebene Datei _eslint_report.json_ ausgewertet und direkt im Pull
Request vermerkt.

```yaml
- name: Annotate Code
  uses: DerLev/eslint-annotations@v2
  with:
    eslint-report: app/eslint_report.json
```
