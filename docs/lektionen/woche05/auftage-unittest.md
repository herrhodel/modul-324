---
sidebar_position: 2
keywords:
  - pdf
---

# Automatisiert Testen

Ein Punkt im DevOps Modell ist die _Qualitätssicherung_. Qualitätssicherung soll
sicherstellen, dass das Produkt auch den Erwartungen entspricht. Dies kann
funktional sein: "Tut das Programm, was es soll", aber auch qualitativ: "tut es
dies robust und fehlerfrei?".

Die funktionale Erwartung soll durch das Einbinden des Kunden und schnellem
Feedback der umgesetzten Features gesichert werden. Dies kann schlecht
automatisiert geschehen. Die Fehlerfreiheit jedoch ist zu einem gewissen Grad
automatisiert testbar.

Arten von automatisierten Tests sind _Unit-Tests_ und _Integration-Tests_

## Unit-Test

Unit-Tests beziehen sich auf einzelne Methoden. Mit Ihnen soll gewährleistet
werden, dass eine Methode korrekte Resultate liefert. Dafür wird **die Methode
mit verschiedensten Argumenten aufgerufen und geprüft, ob das Resultat stimmt**.

Gängige Unit-Test Frameworks sind:

- Java: JUnit
- NodeJs:
  - [Vitest](https://vitest.dev/) (neuer Standard in Angular)
  - [Jest](https://jestjs.io/)
  - [MochaJs](https://mochajs.org/)

## Integration-Test

Integration Tests testen das Zusammenspiel von Methoden. Dafür wird oft ein
"headless" Browser (playwright, puppeteer) verwendet, mit welchem die
**Benutzerinteraktion nachempfunden** wird. So kann zum Beispiel getestet
werden, ob nach dem Einloggen die Applikation direkt zu einer bestimmten Seite
weitergeleitet wird.

Gängige Integration Testing Frameworks sind:

- [Playwright](https://playwright.dev/docs/writing-tests) (Empfohlen, da mit
  Vitest kompatibel)
- [Cucumber](https://cucumber.io/) (die Erfinder!)
- [Selenium](https://www.selenium.dev/) (sehr verbreitet)
- [Cypress](https://www.cypress.io) (sehr verbreitet)
- [Gauge](https://gauge.org/) / [Taiko](https://taiko.dev/)
- [Vitest Browser Mode](https://vitest.dev/guide/browser/why.html) (Limitiert,
  kein richtiges e2e Testing)

:::tip

Integration Tests sind _meiner Meinung nach_ Unit-Tests in vielen Bereichen
überlegen:

- Sie testen Benutzerinteraktion und sind daher nicht so theoretisch.
- Sie sind Grobmaschiger, was ein Refactoring nicht behindert.
  - Viele Unit-Tests können das Refactoring hindern, da zusätzlich viele Tests
    angefasst werden müssen, was Arbeit bedeutet ;)

:::

:::note[Sprachunabhängige Integration-Tests]

Da Integration-Tests einen Benutzer in einem Browser simulieren, müssen
Integration-Tests nicht in der Sprache geschrieben werden, in der auch die
Applikation programmiert wurde.

:::

## Aber Achtung!

> Program testing can be used to show the presence of bugs, but never to show
> their absence!
>
> -- Edsger Dijkstra

Das bedeutet soviel wie: Man kann gar nicht immer Wissen, ob ein Programm
fehlerfrei ist, wenn man dem Fehler noch nicht begegnet ist. Dies ist kein Grund
nicht zu testen, sondern eine Mahnung sich bewusst zu sein, dass auch 100%
getesteter Code, fehlerhaft sein kann.

## Wozu dienen Tests wenn keine Garantie?

- Beim Schreiben von Tests befasst man sich tiefer mit der implementierten
  Methode. Man Reflektiert somit auch das eigene Schaffen.
- Beim Refactoring kann sichergestellt werden, dass die Methode sich noch gleich
  verhaltet!
- Test dienen als Beschreibung und sind somit direkt **lebende Dokumentation**
  auf Englisch
  "[living documentaion](https://cucumber.io/blog/podcast/living-documentation/)".
  - Dazu dienen vor allem Integration Tests, geschrieben in
    [Gherkin](https://cucumber.io/docs/gherkin/reference/) wie Cucumber es
    definiert hat und viele sich davon inspirieren liessen. (optional)

## Test mit KI schreiben lassen?

:::caution

Viele meiner Berufskollegen vertreten die Ansicht, man kann die Tests ja einfach
von der KI schreiben lassen. Ich persönlich denke, viel eher sollte man die
Tests selber schreiben und das Programm von der KI schreiben lassen. Am Ende
sollte der Programmiere die Kontrolle und Übersicht behalten, was er erwartet
und nicht einfach akzeptieren, dass alles grün ist. Da kann man theoretisch auch
`true == true` testen, ist auch grün.

Ja, KI kann als initialstart nützlich sein, sobald aber Code neu angefasst wird,
sollte nicht die KI einfach die Tests anpassen.

:::
