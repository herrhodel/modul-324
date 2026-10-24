---
sidebar_position: 5
keywords:
  - pdf
---

# Paketmanager

## Handlungsziele

3. Wendet die Source-Code- und Artefaktverwaltung für eine
   anforderungsorientierte Entwicklung im Team an.
   1. Kennt Praktiken, um Sourcecode featurebasiert zu verwalten (z.B.
      Git-Workflow, Semantic Versioning etc.).
   2. Kennt Möglichkeiten, um benötigte und erstellte Artefakte/Binaries zu
      verwalten (z.B. **Artefakt-Repository/Registry**,
      **Dependency-Management** wie **npm/maven/gradle** etc.).

## Was ist ein Paketmanager?

Ein Paketmanager installiert, aktualisiert und entfernt Software-Pakete
(Bibliotheken oder Programme) und verwaltet deren Abhängigkeiten. Die benötigten
Pakete werden in einer Datei beschrieben (z.B. `package.json`) und aus einer
zentralen Registry geladen (z.B. [npmjs.com](https://www.npmjs.com/)).

## Wofür braucht man diese?

- Bibliotheken müssen nicht mehr von Hand kopiert werden.
- Es ist klar definiert, welche Version verwendet wird.
- Abhängigkeiten von Abhängigkeiten (transitive Abhängigkeiten) werden
  automatisch aufgelöst.
- Alle im Team und die CI-Pipeline erhalten dieselben Versionen (Lock-Datei,
  z.B. `yarn.lock`).
- Bekannte Sicherheitslücken in Paketen können erkannt werden.
- Gängige Aufgaben wie Bauen und Testen lassen sich als Skripte definieren.

:::caution[Supply Chain Attack]

Pakete sind Teil der Abhängigkeitskette. Wird ein weitverbreitetes Paket
kompromittiert, gelangt der Schadcode in alle Projekte, die es verwenden.
Abhängigkeiten sollten daher regelmässig, aber bewusst aktualisiert werden.

:::

## Typen

| Paketmanager                                | Sprache               | Konfigurationsdatei |
| :------------------------------------------ | :-------------------- | :------------------ |
| [Gradle](https://gradle.org/)               | Java / Kotlin         | `build.gradle`      |
| [Maven](https://maven.apache.org/)          | Java                  | `pom.xml`           |
| [NPM](https://www.npmjs.com/) / Yarn / pnpm | JavaScript/TypeScript | `package.json`      |
| [Bundler](https://bundler.io/)              | Ruby                  | `Gemfile`           |
| [Composer](https://getcomposer.org/)        | PHP                   | `composer.json`     |

### Gradle

Build-Tool für Java und Kotlin. Die Konfiguration wird als Skript geschrieben
und ist dadurch sehr flexibel. Gradle verwaltet Abhängigkeiten und definiert
Tasks wie `build` und `test`.

### Maven

Build-Tool für Java mit einer deklarativen Konfiguration in XML (`pom.xml`). Das
Vorgehen folgt festen Konventionen und einem definierten Build-Lifecycle.

### NPM / Yarn

NPM ist der Standard-Paketmanager von Node.js. Yarn ist eine Alternative, die
auf derselben Registry aufbaut. Abhängigkeiten stehen in `package.json`, im Feld
`scripts` werden Aufgaben definiert (z.B. `npm run build`).

### Bundler

Paketmanager für Ruby. Die Abhängigkeiten ("Gems") stehen im `Gemfile`, die
exakten Versionen im `Gemfile.lock`.

### Composer (PHP)

Paketmanager für PHP. Die Abhängigkeiten stehen in `composer.json`, die exakten
Versionen in `composer.lock`.

## :superhero: asdf / mise en place
