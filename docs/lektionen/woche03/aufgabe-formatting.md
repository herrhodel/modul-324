---
sidebar_position: 3
keywords:
  - pdf
---

# Prettier verwenden

Ihr habt bereits das VS-Code-Plugin
[Prettier Formatter for Visual Studio Code](/docs/lektionen/woche02/aufgabe-install-tools.md#prettier-formatter-for-visual-studio-code)
installiert.

Angular hat als dependency prettier und konfiguriert es bereits.

```json title="app/.prettierrc"
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

## Settings vom Modul anpassen

Ersetzt nun den Inhalt der Datei `.prettierrc` mit folgendem Inhalt

<div className="grid"><div>

```json title="app/.prettierrc"
{
  "printWidth": 100,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

</div><div>

### Erläuterung

- `singleQuote: true`: verwendet `'` anstatt `"` wenn möglich.
- `printWidth: 100`: Begrenzt die maximallänge einer Zeile auf 100 Zeichen.
- `useTabs: true`: konvertiert Tabs zu Leerschlägen.
- `semi: true`: fügt überall Semikolons dazu.
- `trailingComma: "all"`: Fügt überall ein `,` dazu wenn möglich.
- `bracketSpacing: true`: fügt zwischen () immer einen Leerschlag (leserlicher).
- `arrowParens: "avoid"`: Macht, dass Funktionen mit nur einem Befehl ohne `{}`
  geschrieben werden.
  ```js
  // Diese Funktion
  const hallo = () => {
    return "hallo";
  };
  // wird zu
  const hallo = () => "hallo";
  ```

</div></div>

## Zu ignorierede Dateien definieren

Gleich wie `.gitignore` Pfade und Dateien definiert, die von Git ignoriert
werden sollen, ist es möglich mit einer `.prettierignore` Datei zu definieren,
welche Pfade von prettier ignoriert werden sollen.

Erstellen Sie die Datei `app/.prettierignore` und kopieren Sie folgenden Inhalt
rein.

```json title="app/.prettierignore"
.classpath
.idea/
.project
.vscode/*
/.angular
/.nx
/bazel-out
/coverage
/dist
/out-tsc
/tmp
node_modules

```

## Formatierung mit Script

````

Mit folgendem `Script` im `package.json` kann das Formatieren automatisiert
werden.

```json title=".package.json"
{
...
 "scripts": {
    ...
    //highlight-green-next-line
    "format": "prettier --write \"src/**/*.{ts,html,scss}\"",
    ...
  }
...
}
````

Nun kann mit dem Befehl `npm run format` formatiert werden. Die Dateien werden
automatisch gespeichert.

## Format On Save

Damit alle immer korrekt formatieren, empfiehlt es sich einzustellen, dass
VS-Code automatisch eine Datei mit prettier formatiert, sobald diese gespeichert
wird.

`Code -> Settings -> Text Editor -> Formatting -> Format On Save`

Wenn `Format On Save` aktiviert ist, wird automatisch formatiert, sobald die
Datei gespeichert wird.

## Automatisches Formatieren mit einer Github Action?

Grundsätzlich könnte man auf die Idee kommen, dass in einer GitHub Action
automatisch formatiert werden soll. So ist der Code immer konsistent.

**Persönlich würde ich dies nicht machen**, da die GitHub Action entweder den
Commit überschreiben muss, oder aber einen zusätzlichen Commit hinzufügen muss.
Das eine sowie das andere kann zu merge Konflikten führen. Daher wird es im
Projekt nicht erwartet.

Was ich mir vorstellen könnte, ist eine Formatierungsprüfung, das Formatieren
soll aber lokal vom Entwickler in der IDE geschehen.
