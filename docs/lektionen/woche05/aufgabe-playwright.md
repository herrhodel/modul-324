---
sidebar_position: 4
keywords:
  - pdf
---

# Playwright

Auch wenn das Unit-Testing von Angular, durch die Möglichkeit von Router Tests,
die Grenze zwischen Unit-Testing und Integration-Testing verschwimmen lässt, ist
das verwenden eines Integrationtest-Framework, wie z.B. Playwright, zu Empfelen.

Wo das Angular Testen sehr nah am SourcCode ansetzt, sind
Integrationtest-Framework nur durch den Browser bedienbar. Es handelt sich
dadurch um konsequentes Blackbox Testing. Es zeigt am besten den User-Flow auf
und deckt neben technischen auch ux-Probleme auf.

Eine Möglichkeit bietet [Playwright](https://playwright.dev/docs/writing-tests).
Wir verwenden im Modul dieses, da Playwright bereits für den Browser Mode von
Vitest verwendet wird.

## Neuer Branch erstellen

`git checkout -b feat/playwright`

## Playwright initialisieren

Mit folgendem Befehl wird Playwright im Ordner `app` automatisch initialisiert.

Er wird nach einem Ordner gefragt. Den dürft Ihr nennen wie ihr wollt. Standard
ist `tests` ich persönlich finde den zu generisch und würde entweder `e2e`
verwenden.

Es wird auch danach gefragt, ob eine Github Action erstellt werden soll. **Diese
mit `n` ablehnen**. Wir haben eine eigene Action, die auf das Projekt abgestimmt
ist.

```bash
cd app
npm init playwright@latest
```

## Package.json Script erstellen

In der Datei `package.json` sollen nun im `scripts` Teil zwei neue Script
hinzugefügt werden.

```json title="package.json"
{
  ...
"scripts": {
    ...
    "e2e": "playwright test"
    "e2e:ui": "playwright test --ui"
    ...
  }
  ...
}
```

- `npm run e2e`: startet die Playwright-Tests
- `npm run e2e:ui`: startet die Playwright-Tests im UI Modus

:::caution

- Damit e2e Tests funktionieren, muss zuerst die App gestartet sein!
- Auch muss natürlich die url die Playwright verwendet `http://localhost:4200`
  sein

:::

## Tests schreiben

Hier ein Beispiel Test der mit der Angular Bootstrap index.html Page
funktioniert.

```ts title="e2e/example.spec.ts"
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await expect(page).toHaveTitle(/App/);
});
```

Weitere Beispiele findet Ihr auf der
[Playwright Webseite](https://playwright.dev/docs/writing-tests).

Schreibt ab nun eigene e2e Tests.

## Tests und Server zusammen starten

Wärend dem Entwickeln macht es Sinn, dass der Server und die e2e-Tests einzeln
gestartet werden können. In der CI (Github Actions) muss jedoch garantiert sein,
dass der Server gestartet ist, bevor Playwright versucht zu testen.

Dafür gibt es die Library (Wireit). Diese ermöglicht es im `package.json`
verschiedene Scripts zu verbinden.

### Wireit installieren

```bash
npm i -D wireit
```

### Create Wireit Scripts for e2e Tests

Wenn nun `npm run e2e:ci` ausgeführt wird, sollten:

1. Zuerst der Development Server starten.
2. Dann die Playwright Tests ausgeführt werden.
3. Alls stoppen, sobald die Tests fertig sind.

Dies wird erreicht, wenn das `app/package.json` mit folgendem Code ergänzt wird.

```json title="app/package.json"
{
  ...
  "scripts": {
    ...
    "e2e:ci": "wireit",
    "e2e:server": "wireit",
    ...
  },
  "wireit": {
    "e2e:ci": {
      "command": "playwright test",
      "dependencies": [
        "e2e:server"
      ]
    },
    "e2e:server": {
      "command": "ng serve",
      "service": {
        "readyWhen": {
          "lineMatches": ".*localhost*"
        }
      }
    }
  },
  ...
}

```

## Github Action

Nun kann dieses Script in der GithHub Action ausgeführt werden.

```yaml title="e2e-tests.yml"
name: E2E Tests
on:
  push:
    paths: app/**
jobs:
  test:
    timeout-minutes: 60
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
      - name: e2e Test
        working-directory: app
        run: npm run e2e:ci
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: app/playwright-report/
          retention-days: 30
```
