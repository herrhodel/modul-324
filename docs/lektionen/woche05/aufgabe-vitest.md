---
sidebar_position: 3
keywords:
  - pdf
---

# Vitest mit Angular

Angular besitzt den command `ng test`. Dieser ist in den Scripts als "test"
bereits vorkonfiguriert (`npm run test`). Sofern nichts anderes definiert, wird
automatisch **[Vitest](https://vitest.dev/)** verwendet. Hier **die
[offizielle Anleitung](https://angular.dev/guide/testing)**.

- Versucht nun nach der Anleitung einige Unit-Tests für euer Projekt zu
  erstellen.
- Hier werden z.B.
  [einzelne Testmöglichkeiten](https://angular.dev/guide/testing#more-information-on-testing)
  aufgezeigt.

## Vitest Browser Mode

Es ist immer gut, Tests in einer Umgebung zu starten, die so nah an der
Produktion ist wie möglich. Auch wenn Vitest "nur" Unit-Tests sind, können diese
[im Browser ausgeführt werden](https://vitest.dev/guide/browser/why.html). So
wird z.B. direkt die Browser API verwendet wie z.B. `window.` usw.

Um [Vitest im Browser](https://vitest.dev/guide/browser/why.html) Mode starten
zu können müssen zusätzlich folgendes Pakete installiert werden.

```bash
npm i -D @vitest/browser-playwright
```

Zudem muss Playwright einen Testbrowser installieren. Dies wird mit folgendem
Befehl erreicht.

```bash
npx playwright install
```

Danach können die Tests im Browsermode gestartet werden. Dafür muss im
`package.json` das `script.test` angepasst werden.

```json title="package.json"
{
  ...
  script: {
    ...
    //highlight-red-next-line
    "test": "ng test",
    //highlight-green-next-line
    "test": "ng test --browsers=chromiumHeadless",
    ...
  }
  ...
}
```

## Testen von Routen und Navigation

Neu ist es in Angular auch möglich
[Routen und Navigation ohne zusätzliches End-zu-End-Testframework zu testen](https://angular.dev/guide/routing/testing).
Dies lässt Unit-Tests und Integration-Tests langsam in sich verschmelzen.

Persönlich denke ich, dafür sind jedoch Integrationtest-Frameworks
übersichtlicher.

## Vitest in der GitHub Action

Besitzt die Applikation Unit-Test, macht es nur Sinn, dass diese auch
automatisiert ausgeführt werden. Es gibt nun **zwei Orte**, an denen die Tests
ausgeführt werden können.

Behilflich ist uns das Script `npm run test`.

## GitHub Action Workflow

Dieses Script kann gleich wie beim
[Linten](/docs/lektionen/woche04/aufgabe-linting.md) in einer GitHub Action
ausgeführt werden.

```yaml title=".github/workflows/unit-test.yml"
name: Unit Test
on:
  push:
    paths: app/**
jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - uses: actions/checkout@v7
      - name: Install node
        uses: actions/setup-node@v6
        with:
          node-version: 24 # lts
          cache: "npm"
          cache-dependency-path: app/package-lock.json
      - name: Unit Test
        working-directory: app # Wichtig!!
        run: npm ci && npm run test
```

:::note

- :rocket: GitHub Actions Cache ist super schnell, cached immer, wenn möglich!

:::
