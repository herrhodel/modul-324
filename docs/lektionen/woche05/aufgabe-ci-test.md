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

## Dedizierter Test-Job im `deploy.yml`

Die gängige Art ist es, einen dedizierten Test-Job direkt in das bestehende
`deploy.yml` einzufügen. Dafür muss in der GitHub Action node und chrome
installiert werden.

:::note

Das untere Beispiel sollte für eine Angular Applikation direkt funktionieren.
Sie müssen Einzig den Pfad `ihr-projekt/` jeweils anpassen.

:::

Damit der Deploy-Job auf den Test-Job wartet, muss dieser den test job als
Abhängigkeit besitzen. Dies geschieht mit dem key `needs: test`

```yaml title=".github/workflows/deploy.yml"
name: Deploy to Amazon AWS
# ...
jobs:
  // highlight-green-start
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
          cache-dependency-path: ihr-projekt/package-lock.json
      - name: Test
        working-directory: ihr-projekt
        run: npm ci && npm run test:ci
  // highlight-green-end
  deploy:
    // highlight-green-next-line
    needs: test # wartet auf den Test-Job
    # ...
```

Dies alles hat zur Folge, dass die Action nicht mehr so schnell ist.

### Es gibt aber auch Vorteile:

1. Der Test-Job wird vor dem Deploy-Job ausgeführt. Dadurch muss nicht nach AWS
   eingelogged werden und kein Dockerfile gebaut werden, sofern der Test
   fehlschlägt.
2. Es ist klar ersichtlich, ob der Build wegen eines Testes fehlgeschlagen ist
   oder doch einem anderen Problem.
3. Die Testresultate können als Artefakte an den Job angeheftet werden.
   (optional)
   - https://www.npmjs.com/package/karma-jasmine-html-reporter
   - https://github.com/actions/upload-artifact

:::note

- :rocket: GitHub Actions Cache ist super schnell, cached immer, wenn möglich!

:::

## Direkt im Dockerfile _(Altervative)_

Sofern Sie bereits die Applikation mit einem "Multistage Dockerfile" builden,
könnten die Tests auch direkt vor dem Build, mit dem Befehl `npm run test:ci`
ausgeführt werden.

:::note

- Chromium nur im `builder` installieren. Das produktive Image braucht Google
  Chrome nicht.

:::

Damit diese funktionieren, muss zuerst ein HeadlessChrome im Dockerfile
installiert werden. Das untere Script sollte bei jedem (auch Apple Silicon)
funktionieren.

```dockerfile title="Dockerfile"
FROM node:lts-slim AS builder

# ...

// highlight-green-start
# Install Chromium
# (Use Chromium from "Playwright" instead of Puppeteer, for getting ARM64 build, which is not provided by Puppeteer)
RUN mkdir -p /tmp/cli-chromium && \
  cd /tmp/cli-chromium && \
  npm i playwright@latest && \
  PLAYWRIGHT_BROWSERS_PATH=/usr/local/bin/pw-browsers npx playwright install --with-deps chromium && \
  ln -s $(find /usr/local/bin/pw-browsers -name "chrome" -executable | head -n 1) /usr/local/bin/chrome && \
  rm -rf /tmp/cli-chromium
ENV CHROME_BIN="/usr/local/bin/chrome"
// highlight-green-end

# ...

// highlight-red-next-line
RUN npm ci && npm run build
// highlight-green-next-line
RUN npm ci && npm run test:ci && npm run build

# ...

# Ab hier beginnt das produktive Image!
FROM node:lts-slim

# ...
```

Der Vorteil an dieser Art ist, dass die App nur einmal gebaut werden muss.

### Es gibt jedoch auch Nachteile!

1. Dadurch, dass der Test im Dockerfile gemacht wird, ist es nicht direkt klar,
   dass der Build fehlgeschlagen ist, weil ein Test fehlgeschlagen ist. Es
   könnte auch der Build an sich fehlschlagen.
2. Das Installieren vom Chrome im Dockerfile ist komplex und dauert lange.
3. GitHub Actions erlauben es sogenannte Artefakte zu speichern. Dies könnten
   z.B. die Testresultate sein. Wird der Tests im Dockerfile ausgeführt können
   diese nicht (oder nur sehr schwer) als Artefakte gespeichert werden.

:::tip

- Daher ist es gängiger, dafür einen eigenen "Job" in der GitHub Action
  einzubauen.

:::
