# ESLint konfigurieren

## Neuer Branch erstellen

`git checkout -b feat/eslint`

## ESLint Dateien generieren

Mit dem Befehl `ng lint` lintet Angular das Projekt. Beim ersten Ausführen
werden direkt alle Konfigurationsdateien erstellt.

- `ng lint` ausführen
- alles mit "yes" akzeptieren

## ESLint Script definieren

Es wird automatisch ein Task `lint` im `package.json` erstellt. Nun kann via
`npm run lint` das Projekt gelintet werden.

Nun wäre es aber noch hilfreich, wenn bei einem Pull-Request automatisch
gelintet wird und sogleich auf den jeweiligen Zeilen eine Anmerkung gemacht.

Dafür muss das Linting das Resultat in eine Datei schreiben.

- Im `package.json` folgendes Script ergänzen

  `"lint:ci": "ng lint --output-file eslint_report.json --format json"`

Der Task `npm run lint` schreibt nun das Resultat in eine Ausgabedatei
`eslint_report.json`

## Der Test Job in der Github Action erweitern

- in der Github Action `./github/workflows/deploy.yml` vor dem testen linten

```yaml title=".github/workflows/deploy.yml"
# ...
  test:
    // highlight-red-next-line
    name: Test
    // highlight-green-next-line
    name: Lint & Test
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
      // highlight-green-start
      - name: Install Dependencies # neu eigener step
        working-directory: ihr-projekt
        run: npm ci
      - name: Lint
        working-directory: ihr-projekt
        run: npm run lint:ci
      - name: Annotate Code
        uses: DerLev/eslint-annotations@v2
        with:
          eslint-report: ihr-projekt/eslint_report.json
        continue-on-error: true
      // highlight-green-end
      - name: Test
        working-directory: ihr-projekt
        // highlight-red-next-line
        run: npm ci && npm run test:ci # Installiert wurde schon
        // highlight-green-next-line
        run: npm run test:ci
```

:::tip GitHub Action eslint-annotations

Die verwendete GitHub Action _`DerLev/eslint-annotations@v2_` liest die eslint
Ausgabedatei und macht direkt im Pull-Request Bemerkungen an die Linien! 🤯

:::
