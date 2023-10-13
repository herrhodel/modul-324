---
sidebar_position: 4
---

# Formatierung

## Handlungsziele

2. Konfiguriert und nutzt die lokale Entwicklungsumgebung integriert mit den
   automatisierenden Tools.
   1. Kennt Möglichkeiten, um automatisierende Tools in der Entwicklungsumgebung
      zu nutzen (z.B. **Linting**, Build, Ausführen, Testen, Versionierung,
      Abhängigkeiten/Pakete).

## Wiso wichtig?

- Lesbarkeit
- Wartbarkeit
- Konsistenz

## Automtische Formattierung

### Eclipse

**Tastenkürzel**

- Windows / Linux: `Ctrl` + `Shift` + `F`
- Mac: `⌘` + `⇧` + `F`

:::tip Autoformat beim Speichern
`Window -> Preferences -> Java -> Editor -> SaveActions` das Häckchen **Source
Code Formattieruen** setzen. Nun sollte der Source Code automatisch formattiert
werden, sobald die Datei gespeichert wird. :::

### IntelliJ

**Tastenkürzel**

- Windows / Linux: `Ctrl` + `Alt` + `L`
- Mac: `⌥` + `⌘` + `L`

:::tip Autoformat beim Speichern `Preferences -> Tools -> Actions On Save` die
Häckchen **Reformat Code** und **Optimize imports** setzen. Nun sollte der
Source Code automatisch formatiert werden, sobald die Datei gespeichert wird.
:::

## Automatisches Linting

### Was ist Linting

Der unterschied von Linting zu Formatierung

### Tools

- [Coala](https://github.com/coala/coala)
- [SonarQube](https://www.sonarqube.org)
