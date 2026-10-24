---
sidebar_position: 6
keywords:
  - pdf
---

# Testautomation

## Handlungsziele

2. Konfiguriert und nutzt die lokale Entwicklungsumgebung integriert mit den
   automatisierenden Tools.
   1. Kennt Möglichkeiten, um automatisierende Tools in der Entwicklungsumgebung
      zu nutzen (z.B. Linting, Build, Ausführen, **Testen**, Versionierung,
      Abhängigkeiten/Pakete).

## Wofür ist es gut?

- Fehler werden früh und automatisch gefunden, noch vor dem Deployment.
- Änderungen am Code können sicher vorgenommen werden (Refactoring).
- Tests dienen als Dokumentation, welches Verhalten erwartet wird.
- In der CI-Pipeline verhindern fehlschlagende Tests, dass fehlerhafter Code
  deployt wird.

## Arten

### Unit Test

Prüft eine einzelne Einheit (z.B. eine Methode) isoliert. Sie wird mit
verschiedenen Argumenten aufgerufen und das Ergebnis wird mit dem erwarteten
Resultat verglichen. Unit Tests sind schnell und können in grosser Zahl
ausgeführt werden.

- [JUnit (Java)](https://junit.org/junit5/)
- [Jest (Javascript)](https://jestjs.io/)
- [Vitest (Javascript)](https://vitest.dev/)

### Integration Test

Prüft das Zusammenspiel mehrerer Komponenten. Bei Webapplikationen wird die
Benutzerinteraktion in einem (Headless-)Browser nachgestellt. Diese Tests sind
langsamer und aufwändiger als Unit Tests.

- [Playwright (Browser automation)](https://playwright.dev/)
- [Selenium](https://www.selenium.dev)
- [Puppeteer (Browser automation)](https://pptr.dev/)
- [Taiko (Browser automation)](https://taiko.dev/)
- [Gauge (Browser automation und BDD)](https://gauge.org/)

:::tip[Test Driven Development (TDD)]

Zuerst wird der Test anhand der Anforderung geschrieben, danach wird so lange
programmiert, bis er erfolgreich ist.

:::

## Tutorial

- [Unit Tests mit Vitest](/docs/lektionen/woche05/aufgabe-vitest.md)
- [Integrationstests mit Playwright](/docs/lektionen/woche05/aufgabe-playwright.md)
