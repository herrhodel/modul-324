---
sidebar_position: 2
keywords:
  - pdf
---

# Automatisiert Testen

Ein Punkt im DevOps Modell ist die _Qualitätssicherung_. Qualitätssicherung soll
sicher stellen, dass das Produkt auch den Erwartungen entspricht. Dies kann
funktional sein: "Tut das Programm was es soll", aber auch qualitativ: "tut es
dies robust und fehlerfrei?".

Die funktionale Erwartung soll durch das Einbinden des Kunden und schnellem
Feedback der umgesetzten Features gesichert werden. Dies kann schlecht
automatisiert geschehen. Die Fehlerfreiheit jedoch ist zu einem gewissen Grad
automatisiert testbar.

Arten von automatisierten Tests sind *Unit Tests* und *Integration Tests*

## Unit-Test

Unit Tests beziehen sich auf einzelne Methoden. Mit Ihnen soll gewährleistet
werden, dass eine Methode korrekte Resultate liefert. Dafür wird **die Methode mit
verschiedensten Argumenten aufgerufen und geprüft ob das Resultat stimmt**.

Gängige Unit-Test Frameworks sind:

- Java: JUnit
- Node:
  - Jasmine (out-of-the-box von Angular verwendet, trotzdem deprecated)
    - Karma (out-of-the-box von Angular verwendet, trotzdem deprecated)
    - Karma führt die Unit-Tests im Browser aus, ist aber kein Integration
      Testing framework.
  - Jest (wird
    [neu von Angular empfohlen](https://blog.angular.dev/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca))
    - [Web-test-Runner](https://modern-web.dev/docs/test-runner/overview/) (wird
      [neu von Angular empfohlen](https://blog.angular.dev/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca))
    - Web-test-Runner führt die Unit-Tests im Browser aus, ist aber kein
      Integration Testing framework.
  - MochaJS

## Integration-Test

Integration Tests testen das Zusammenspiel von Methoden. Dafür wird oft ein
"headless" Browser (playwright, puppeteer) verwendet, mit welchem die
**Benutzerinteraktion nachempfunden** wird. So kann zum Beispiel getestet
werden, ob nach dem Einloggen die Applikation direkt zu einer bestimmten Seite
weitergeleitet wird.

Gängige Integration Testing Frameworks sind:

- Selenium
- Gauge / Taiko
- Cypress
- Cucumber (die Erfinder...)

:::tip

Integration Tests sind meiner Meinung nach Unit-Tests in vielen Bereichen
überlegen:

- Sie testen Benutzerinteraktion und sind daher nicht so theoretisch.
- Sie sind Grobmaschiger, was ein Refactoring nicht behindert.
  - Viele Unit-Tests können das Refactoring hindern, da viele Test angefasst
    werden müssen, was Arbeit bedeutet ;)

:::

:::note Sprachunabhängige Integration-Tests

Da Integration-Tests einen user in einem Browser simulieren, müssen
Integration-Tests nicht in der Sprache geschrieben werden, in der auch die
Applikation programmiert wurde.

:::

## Aber Achtung!

> Program testing can be used to show the presence of bugs, but never to show
> their absence!
>
> -- Edsger Dijkstra

Das bedeutet soviel wie: man kann gar nicht immer Wissen ob ein Programm
Fehlerfrei ist, wenn man dem Fehler noch nicht begegnet ist. Dies ist kein Grund
nicht zu testen, sondern eine Mahnung sich bewusst zu sein, dass auch 100%
getesteter Code, fehlerhaft sein kann.

## Wozu dienen Tests wenn keine Garantie?

- Beim Schreiben von Tests befasst man sich tiefer mit der implementierten
  Methode. Man Reflektiert somit auch das eigene Schaffen.
- Beim Refactoring kann sichergestellt werden, dass die Methode sich noch gleich
  verhaltet!
- Test dienen als Beschreibung und sind somit direkt **lebende Dokumentation** auf
  Englisch
  "[living documentaion](https://cucumber.io/blog/podcast/living-documentation/)".
  - Dazu dienen vor allem Integration Tests, geschrieben in
    [Gherkin](https://cucumber.io/docs/gherkin/reference/) wie Cucumber es
    definiert hat und viele sich davon inspirieren liessen. (optional)

## Testen mit Angular

Angular besitzt den command `ng test`. Sofern nichts anderes definiert, wird
automatisch "jasmin" mit "karma" verwendet und verweise auf **die
[offizielle Anleitung](https://angular.dev/guide/testing)**.

- Versucht nun nach der Anleitung einige Tests für euer Projekt zu erstellen.
- In diesem Modul werden **nur Unit Tests** geschrieben. Ich lade Sie jedoch dazu
  ein sich mit Integration Tests auseinander zu setzen.

:::info Jasime/Karma sind veraltet

Angular selbst will in Zukunft auf Jest mit Web-Test-Runner wechseln. Dies, da
Karma und Jasmin doch langsam in die Jahre gekommen sind. Wer also lust hat,
darf das Projekt so anpassen, dass Jest und Web-Test-Runner verwendet wird.

Ich habe dazu zwei Anleitungen gefunden:

- https://alfredo-perez.dev/setup-jest-in-angular-18
- https://danywalls.com/testing-in-angular-replace-karma-to-web-test-runner

:::

:::info angular.io -> angular.dev

Mir ist aufgefallen, dass die alte Domain [angular.io](https://angular.io) nur
bis Version 17 abdeckt.

- **Neuere Angular Versionen verwenden [angular.dev](https://angular.dev)**!

:::
