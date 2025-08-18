---
sidebar_position: 3
keywords:
  - pdf
---

# Erste Epics und Issues definieren

:dart: Projekt grob erfasst haben | :dna: Gruppenarbeit | :clock1: 45 Min

## Von Epics und Issues

Ein Issue sollte immer nur eine Aufgabe beschreiben. Am Anfang eines Projekts
ist es jedoch illusorisch, schon viele, genaue Arbeitspakete erstellen zu
können, da man das Projekt noch nicht genau kennt.

Hier kommen die Epics ins Spiel. Epics beschreiben nicht eine Aufgabe, sondern
ein Bereich. z.B. könnte man sich in einem Web-Shop einen Epic "Warenkorb"
vorstellen. Ein "Warenkorb" kann man nicht in einem Guss programmieren. Der Epic
dient nun dazu zu beschreiben, was man sich darin vorstellt. Dann kann man
Issues erstellen die Teilbereiche abdecken wie z.B. Mockup, Produkt hinzufügen,
Produkt löschen, Warenkorb anzeigen, Warenkorb bestellen, ...

:::tip bleibt Agil

Es müssen noch nicht alle Epics und Issues erstellt werden. Es ist erlaubt und
erwünscht im Projektverlauf neue Epics und Issues zu erstellen.

:::

## Issues und ihre Freunde

Wenn Arbeitspakete erstellt werden, sollten die so isoliert wie möglich sein,
damit Sie unabhängig abgearbeitet werden können. Um dies zu ermöglichen ist es
wichtig, dass die Issues nicht zu gross sind. Daher die Regel, dass ein Issue
nur eine Aufgabe beinhalten soll.

Und trotzdem kommt es zwangsläufig dazu, dass Issues Abhängigkeiten zu anderen
Issues haben. So macht z.B. "Produkt löschen" keinen Sinn, wenn "Produkt
hinzufügen" nicht schon umgesetzt ist.

Diese Abhängigkeiten sollen in Form von Issue Referenzen (z.B. #1) in der
Beschreibung abgebildet werden.

- [Autolinked references and URLs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls)

Ebenso sollen auch die Epics verlinkt sein!

:::danger Notenrelevant

- Alle Issues sollten immer auf den zugehörigen "Epic" zeigen.
- Alle Issues sollen auf andere Issues verweisen, von welchem er abhängig ist.

:::

## Issue Beschreibung und Akzeptanzkriterien

Jeder Issue besitzt eine Beschreibung, diese **definiert die Aufgabe**, welche
anhand vom Issue erstellt werden soll. Die Beschreibung richtet sich an den
Programmierer.

:::info

- Die Beschreibung muss nicht einer Konvention wie "As a user a want to …"
  folgen, darf dies aber.
- Sie muss immer verständlich machen, was umgesetzt werden soll.

:::

Um überprüfen zu können, ob ein Issue erledigt worden ist, benötigt es eine
Kurzanleitung, wie dies verifiziert werden kann. **Hier sprechen wie von
"Akzeptanzkriterien"**.

- :bulb: **Die "Akzeptanzkriterien" richteten sich an den Kunden!**

:::danger Notenrelevant

- Alle Issues müssen eine Beschreibung beinhalten, der jeder, auch ohne Insider
  Wissen, entnehmen kann was zu tun ist.
- Alle Issues müssen ein "Akzeptanzkriterien" beinhalten mit welcher der Kunde
  (also ich), die Umsetzung prüfen kann.

:::

## Sprint-Reflexionen

[Die Reflexionen sollen auch als Pull-Request geschehen](/docs/beurteilungen/LB1.md#wo-wird-die-reflexion-geschrieben).
Daher bietet es sich an für diese ein Epic mit Issues für jede Reflexion **pro
Projektmitglied** zu erstellen.

:::tip

- Ein Epic "Sprint-Reflexionen" erstellen
- Für alle ein Issue für die Reflexion zum Sprint 1 und 2 erstellen

:::

:::danger Notenrelevant

- Achtet pingelig genau an die Anweisung unter Beurteilungen

:::

## Epics im Projekt

- **Es gibt keine Epics in GitHub Projects** :scream:
- Erstellt ein Tag namens "epic".
- Erstellt Issues mit dem Tag "epic".
- _Ihr könnt auch_ eine Swimmline "Epic" Erstellen, dies dient der Übersicht
  enorm.

:::note

- :bulb: Ab und zu muss man einfach kreativ sein und die Tools passend machen …

:::

## 📝 Auftrag

Erstellt nun im GitHub Projekt neue Epics und Issues für euer Projekt.

### Hier ein Beispiel von Themen:

- Administrative Issues wie z.B. Sprint-Reflexionen
- Technologiewahl treffen
  - Die Programmiersprache ist **frei wählbar**
- Infrastruktur aufbauen
- Hello World mit gewählter Technologie
- Erste Features beschreiben
- Mockup resp. Wireframe erstellen

:::tip Schaut euch Woche 3 an!

In der Woche 3 setzen wir zusammen auf, dass Ihr lokal entwickeln könnt. Das
wäre doch ein paar Issues wert, oder?

:::

:::tip Mockups (Wireframes)

Am Anfang kann es gut möglich sein, dass noch nicht alle Code Schreiben können,
da die Applikation noch nicht lauffähig ist. Daher macht es Sinn auch **Issues
für das "Mockup", also ein grafischer Preview** von Features zu erstellen.

- :bulb: Hat man bereits ein Mockup, kann man auch besser über Features sprechen
  und es kommt zu weniger Missverständnissen.
- :bulb: **Die Mockups könnt Ihr z.B. unter `/docs/mockups` einchecken.**
- **:exclamation: Bitte keine Videos einchecken!**

:::
