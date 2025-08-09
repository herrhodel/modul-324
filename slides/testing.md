---
marp: true
theme: bbzbl
paginate: true
header: Modul 324 - Testautomatisierung
footer: BBZBL / Lukas Hodel / DevOps-Prozese mit Tools unterstützen
---

<!-- _class: big center -->

# Testautomatisierung

---

# Qualitätssicherung

- Soll sicher stellen, dass das Produkt auch den Erwartungen entspricht

- Die **funktionale Erwartung** soll durch das Einbinden des Kunden und
  schnellem Feedback der umgesetzten Features gesichert werden

- Die **Fehlerfreiheit** ist zu einem gewissen Grad automatisiert testbar.

---

# Unit-Tests

- Gewährleisten, dass **eine Methode** korrekte Resultate liefert

- Methoden werden mit verschiedensten Argumenten aufgerufen und geprüft ob das
  Resultat stimmt

## Frameworks (JavaScript)

- Jasimne / Karma
- Jest
- MochaJs

---

# Integration-Tests

- Testen das Zusammenspiel von Methoden

- Es wird die **Benutzerinteraktion nachempfunden**

- Dafür werden "Headless Browser" verwendet.

## Frameworks (Sprachunabhängig!)

::: columns

- [Selenium](https://www.selenium.dev/)
- [Gauge / Taiko](https://gauge.org/)

::: split

- [Cypress](https://www.cypress.io/)
- [Cucumber](https://cucumber.io/) (die Erfinder...)

:::

---

# Test Driven Development (TDD)

> Make it green, then clean

- Es wird zuerst einen Test geschrieben anhand der Anforderungen

- Es wird programmiert bis dieser Test grün ist

- Die Tests dienen direkt als Dokumentation, welche Features vorhanden sind.

> Viele Tests können aber auch hinderlich sein. "Oh nein, dann muss ich all die
> wieder anfassen..."

---

# Best Practices

- Test schreiben, wenn ein Fehler auftritt

- Für komplexe Berechnungen immer einen Test schreiben

- Ein Integration-Tests Framework einführen und damit testen

---

# Aber Achtung!

> There are known knowns. These are things we know that we know. There are known
> unknowns. That is to say, there are things that we know we don’t know. But
> there are also unknown unknowns. **There are things we don’t know we don’t
> know**.
>
> -- Donald Rumsfeld, US-Amerikanischer Politiker

> Program testing can be used to show the presence of bugs, but never to show
> their absence!
>
> -- Dijkstra

---

# :pencil: Aufgabe 2: Test step einbauen

- Erstellt **einen** automatisierten Test für euer Framework
  - Angular: https://angular.dev/guide/testing
  - Spring Boot: https://www.baeldung.com/spring-boot-testing

- Führt den Test in der GitHub Action aus (siehe Anleitung auf der Webseite)
- So wird sichergestellt, dass die Tests grün sind, sonst bricht das deployment
  ab
