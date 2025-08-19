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

```json title="package.json"
...
  "prettier": {
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  },
...
```

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

Persönlich würde ich dies nicht machen, da die GitHub action entweder den Commit
überschreiben muss, oder aber einen zusätzlichen Commit hinzufügen muss. Das
eine sowie das andere kann zu merge Konflikten führen. Daher wird es im Projekt
nicht erwartet.

Was ich mir vorstellen könnte, ist eine Formatierungsprüfung, das Formatieren
soll aber lokal vom Entwickler in der IDE geschehen.
