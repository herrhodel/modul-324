---
sidebar_position: 3
keywords:
  - pdf
---
# Prettier verwenden

Ihr habt bereit das VS-Code Plugin
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
