---
sidebar_position: 4
keywords:
  - pdf
---

# Testen in der GitHub Action

Besitzt die Applikation Unit-Test, macht es nur Sinn, dass diese auch
automatisiert ausgeführt werden. Es gibt nun **zwei Orte**, an denen die Tests
ausgeführt werden können.

Behilflich ist uns das Script `npm run test:ci` welches in der
[vorherigen Anleitung](/docs/lektionen/woche05/aufgabe-karma-configurieren.md)
erstellt wurde.

## GitHub Action Workflow

Dieses Script kann gleich wie beim
[Linten](/docs/lektionen/woche04/aufgabe-linting.md) in einer GitHub Action
ausgeführt werden.

```yaml title=".github/workflows/test.yml"
name: Test
on:
  push:
    paths: app/**
jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - name: Install headless chrome
        uses: browser-actions/setup-chrome@v1
        with:
          chrome-version: 120
          install-chromedriver: true
      - uses: actions/checkout@v4
      - name: Install node
        uses: actions/setup-node@v4
        with:
          node-version: 22 # lts
          cache: "npm"
          cache-dependency-path: app/package-lock.json
      - name: Test
        working-directory: app
        run: npm ci && npm run test:ci
```

:::note

- :rocket: GitHub Actions Cache ist super schnell, cached immer, wenn möglich!

:::
