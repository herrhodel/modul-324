---
marp: true
theme: bbzbl
paginate: true
header: Modul 324 - DevOps
footer: BBZBL / Lukas Hodel / DevOps-Prozese mit Tools unterstützen
---

<!-- _class: big center -->

# Projektmanagement

## Modul 324

---

<!-- _class: big -->

> In software, we rarely have meaningful requirements. Even if we do, the only
> measure of success that matters is whether our solution solves the
> **customer's shifting idea of what their problem is**. --
> [Jeff Atwood](https://blog.codinghorror.com/), Gründer von
> [StackOverflow](https://stackoverflow.com/)

---

# Agile Vorgehensmethoden<sup>9</sup>

- Von grosser Beweglichkeit zeugend; regsam und wendig

## Inkrementell / Iterativ

- schrittweise erfolgend, aufeinander aufbauend
- sich schrittweise in wiederholten Rechengängen der exakten Lösung annähernd

::: footnotes

9. Duden | [agil](https://www.duden.de/rechtschreibung/agil),
   [iterativ](https://www.duden.de/rechtschreibung/iterativ),
   [inkrementell](https://www.duden.de/rechtschreibung/inkrementell)

:::

---

![bg w:60%](./images/how_eduScrum_works.png)

---

# Sprint

::: columns

## Start

- [**GitHub Issues**](https://codingluke.github.io/bbzbl-modul-324/docs/beurteilungen/LB3):
  Aufgaben beschreiben und ausarbeiten

## Ende

- [**Fachgespräch**](https://codingluke.github.io/bbzbl-modul-324/docs/beurteilungen/LB1):
  Sprint-Review

- [**Persönliche Reflexion**](https://codingluke.github.io/bbzbl-modul-324/docs/beurteilungen/LB2):
  Retrospektive auf den Sprint

::: split

## Pro Nachmittag

- **10' Stand-up**:<br> Planen, austauschen, Aufgaben verteilen

- [**Pull-Requests / Commits:**](https://codingluke.github.io/bbzbl-modul-324/docs/beurteilungen/LB3)<br>
  Aufgaben ausführen

:::

---

# GitHub Issues _(Arbeitspakete)_

- haben **Abhängigkeiten** zu anderen Arbeitspakete.
- müssen eine **klare "Definition of Done"** besitzen.
- sollten nur **ein Feature** beschreiben.
- müssen nach fertigstellung an einen **Pull-Requests** geknüpft sein

> ## <!-- fit --> :bulb: Wenn ein "und" im Titel steht, kann es meistens Aufgesplittet werden.

![bg right fit](images/github-issue-direct.png)

---

# GitHub Issues _(Epics)_

- Beschrieben ein grösseres Feature
- **Zeigen auf Arbeitspakete** welche den Epic umsetzen.
- Dienen als **Gruppierung** von Arbeitspaketen
- **Löst selbst die Aufgabe nicht**, sondern Verlinkt nur zu Arbeitspakete
  (Issues)

![bg right fit](images/github-issue-direct.png)

---

# GitHub Projekt

- Tool um Arbeitspakete (GitHub Issues) zu strukturieren
- GitHub Issues brauchen kein Projekt, es macht es aber übersichtlicher

![bg right fit](images/github-kanban-board.png)

---

# GitHub Issue in Projekt

1. Status im Projekt
2. Link zu einem Pull-Request
3. Link zu anderen Issues

> ## <!-- fit --> :bulb: Der Text `#1` generiert einen <br> Link zum Issue mit Nummer `1`

![bg right fit](images/issue-referenzen.png)

---

<!-- _class: big center -->

# GitHub Projects und Issues

## [:link: zum Beispiel Projekt](https://github.com/users/codingluke/projects/2)

---

# :pen: Teambildung (10 Min)

- Jedes Team sollte einen im Team haben der gerne koordiniert
- Jedes Team sollte einen im Team haben der gerne Überprüft
- Jedes Team sollte einen im Team haben der Programmieren leidenschaftlich gerne
  hat.

## :muscle: Nur zusammen ist man Stark

---

# :pen: Rollen bestimmen (5 Min)

- **Teamleader**:

  Erstellt das GitHub repo und ladet andere ein, übernimmt Admin Aufgaben

- **Stakeholder**:

  Schaut sich die Arbeitspakete besonders gut an und prüft die Kriterien

- **Mitarbeiter**:

  Ist besonders fleissig am Programmieren

## 🏅Gute Rollenverteilung ist die halbe Miete

---

# :pen: GitHub repository erstellen (10 Min)

- Der Teamleader **erstellt** ein GitHub repository

  - Ihr dürft meine Vorlage nehmen!
  - Ihr dürft leer starten und von mir schrittweise kopieren
  - Ihr dürft alles selber machen (sollte aber gehen ;)
  - :bulb: Der Namen könnt ihr später noch ändern.
  - :bulb: `projekt-m324` sollte für alles passen

- Der Teamleader gibt allen Mitglieder, inkl. der Lehrperson, die
  **Berechtigung** auf das Repository

---

# :pen: GitHub Projekt erstellen (20 Min)

::: columns

- Im erstellten Repository ein
  [GitHub Projekt](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
  erstellen.

  - [📜 GitHub Projekt Doku](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)

::: split

- Erste test-Issues erstellen und experimentieren

  - Verknüpfen, Taggen
  - Erstellt Tasks in Markdown <br> `- [ ] task`

  - [📜 GitHub Issues Doku](https://github.com/features/issues)

:::

> 💡 Schliesst die test-issues, nicht löschen! Sie dienen als Doku.

---

# :pen: Projekt finden

- Projekt als **GitHub Issue** beschreiben, was ist das Ziel?

- Es sollte ein **Web-Projekt** sein, da es nach AWS ausgeliefert wird
- Die Programmiersprache und Frameworks sind **frei wählbar**
- Es **muss nicht fertig werden**!
- Es **darf ein bestehendes Projekt sein**, dass nun ins DevOps-Modell überführt wird.

> 💡 Dieses Issue muss nicht nur eine Aufgabe besitzen

---

# :pen: Erste Epics und Issues definieren

::: columns

## z.B Technische (wie)

- Technologiewahl treffen

- Infrastruktur aufbauen
- Hello World mit gewählter Technologie

::: split

## z.B. Sachliche (was)

- Projekt beschreiben, was ist das Ziel?
- Einzelne Features beschreiben
- :bulb: Für alle ein Ticket für die Reflektion zum Sprint 1 erstellen

:::
