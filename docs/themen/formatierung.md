---
sidebar_position: 4
keywords:
  - pdf
---

# Formatierung und Linting

## Handlungsziele

2. Konfiguriert und nutzt die lokale Entwicklungsumgebung integriert mit den
   automatisierenden Tools.
   1. Kennt Möglichkeiten, um automatisierende Tools in der Entwicklungsumgebung
      zu nutzen (z.B. **Linting**, Build, Ausführen, Testen, Versionierung,
      Abhängigkeiten/Pakete).

## Was ist Formatierung?

Formatting bezieht sich auf die Darstellung des Codes, indem Leerzeichen,
Einzüge und Zeilenumbrüche verwendet werden.

Das Ziel ist es, den Code lesbar und konsistent zu gestalten.

### Wieso ist Formatierung wichtig?

- Lesbarkeit
- Wartbarkeit
- Konsistenz

### Automatische Formatierung

#### VS Code



**Tastenkürzel**

- Windows: `Shift` + `Alt` + `F`
- Mac: `Shift` + `Option` + `F`
- Linux: `Ctrl` + `Shift` + `I`

#### Eclipse

**Tastenkürzel**

- Windows / Linux: `Ctrl` + `Shift` + `F`
- Mac: `⌘` + `⇧` + `F`

:::tip Autoformat beim Speichern

`Window -> Preferences -> Java -> Editor -> SaveActions` das Häkchen **Source
Code Formatierungen** setzen. Nun sollte der Source Code automatisch formatiert
werden, sobald die Datei gespeichert wird.

:::

#### IntelliJ

**Tastenkürzel**

- Windows / Linux: `Ctrl` + `Alt` + `L`
- Mac: `⌥` + `⌘` + `L`

:::tip Autoformat beim Speichern `Preferences -> Tools -> Actions On Save` die

Häkchen **Reformat Code** und **Optimize imports** setzen. Jetzt sollte der
Source Code automatisch formatiert werden, sobald die Datei gespeichert wird.

:::

### Tools

- [Google Java Format](https://marketplace.visualstudio.com/items?itemName=wx-chevalier.google-java-format)
- [Prettier (JS/TS)](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Was ist Linting?

Linting sowie Formatierung dienen beide dazu, die Code-Qualität zu verbessern.
Während das Formatting auf die ästhetische Darstellung abzielt, konzentriert
sich das Linting auf die **funktionale Korrektheit**.

Linting identifiziert:

- potenzielle Fehler
- stilistische Probleme
- unsichere Praktiken

Das Ziel von Linting ist:

- Konformität und Standards
- einheitliche Qualität
- **Sicherheit**

### Tools

- [SonarLint (Ganz viele Sprachen)](https://www.sonarsource.com/products/sonarlint/)
- [eslint (JavaScript/Typescript)](https://eslint.org/)

## Externe Links

- [Java formatting and linting](https://code.visualstudio.com/docs/java/java-linting)
