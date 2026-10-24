---
sidebar_position: 3
keywords:
  - pdf
---

# Versionskontrolle

## Handlungsziele

3. Wendet die Sourcecode- und Artefaktverwaltung für eine
   anforderungsorientierte Entwicklung im Team an.
   1. Kennt Praktiken, um Sourcecode featurebasiert zu verwalten (z.B.
      **GIT-Workflow**, **semantic Versioning** etc.).
   2. Kennt Möglichkeiten, um benötigte und erstellte Artefakte/Binaries zu
      verwalten (z.B. Artefakt-Repository/Registry, Dependency-Management wie
      npm/maven etc.).

## Wofür ist es gut?

Eine Versionskontrolle speichert jede Änderung am Code mit Autor, Zeitpunkt und
Beschreibung. Dadurch kann man:

- frühere Stände wiederherstellen,
- nachvollziehen, wer was wann und warum geändert hat,
- im Team parallel am selben Code arbeiten,
- Änderungen vor dem Zusammenführen prüfen (Code Review).

## Probleme beim Programmieren

Ohne Versionskontrolle entstehen typische Probleme:

- Kopien wie `projekt_final_v2_neu` und Unklarheit, welcher Stand aktuell ist.
- Änderungen von mehreren Personen überschreiben sich gegenseitig.
- Ein Fehler lässt sich nicht auf die verursachende Änderung zurückführen.
- Es gibt keinen Weg zurück zu einem funktionierenden Stand.

## Git

[Tutorial](https://www.hostinger.com/tutorials/git-tutorial)

### Pull Request

Ein Pull Request (PR) schlägt vor, die Änderungen eines Feature-Branches in den
`main`-Branch zu übernehmen.

- Pro Feature ein Feature-Branch und ein PR.
- PRs sollten klein und thematisch fokussiert sein, damit sie gut prüfbar sind.
- Den PR mit dem zugehörigen Issue verknüpfen (z.B. `Closes #12`).
- Automatische Checks (Lint, Tests) laufen im PR und müssen grün sein.

**Code Review**

Eine andere Person prüft die Änderungen, bevor sie gemergt werden.

- Fehler und Verständnisprobleme werden früh entdeckt.
- Wissen wird im Team geteilt.
- Kommunikation: sachlich und konstruktiv bleiben, Änderungen begründen und
  Fragen statt Vorwürfe formulieren.

### Git Flow

[Tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

Git Flow arbeitet mit mehreren langlebigen Branches:

- `main`: ausgelieferte Releases.
- `develop`: Integrationsstand der nächsten Version.
- Feature-Branches: neue Funktionen, werden von `develop` abgezweigt.
- Release-Branches: Vorbereitung eines Releases.
- Hotfix-Branches: dringende Korrekturen auf `main`.

Das ist aufwändig und lohnt sich erst bei grossen Projekten. Für dieses Modul
wird der einfachere GitHub Flow empfohlen: nur `main` und Feature-Branches,
jeweils mit Pull Request. Releases sind Tags auf `main`.

## Semantic Versioning

Versionsnummern bestehen aus `MAJOR.MINOR.PATCH` (z.B. `2.4.1`):

- `MAJOR`: inkompatible Änderungen (Breaking Changes).
- `MINOR`: neue Funktionen, die abwärtskompatibel sind.
- `PATCH`: abwärtskompatible Fehlerkorrekturen.

Das vereinfacht das Management von Abhängigkeiten und verhindert Fehler durch
Upgrades. Besonders wichtig ist es für Bibliotheken. Im Modul wird die
Versionsnummer mit [Release Please](/docs/lektionen/woche03/aufgabe-release-please.md)
anhand der Commit-Nachrichten (Conventional Commits) automatisch erhöht.
