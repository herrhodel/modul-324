---
marp: true
theme: bbzbl
paginate: true
header: Modul 324 - DevOps
footer: BBZBL / Lukas Hodel / DevOps-Prozese mit Tools unterstützen
---

<!-- _class: big center -->

# Projektmanagement / Sprint 1

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

- [**GitHub Issues**](https://herrhodel.github.io/modul-324/docs/beurteilungen/LB1#bewertung-1):
  Aufgaben beschreiben und ausarbeiten

## Ende

- [**Persönliche Reflexion**](https://herrhodel.github.io/modul-324/docs/beurteilungen/LB1#teilnote-schriftliche-reflexion):
  Retrospektive auf den Sprint

::: split

## Pro Modultag

- **10' Stand-up**:<br> Planen, austauschen, Aufgaben verteilen

- [**Pull-Requests / Commits:**](https://herrhodel.github.io/modul-324/docs/beurteilungen/LB1#teilnote-arbeitsvorgang)<br>
  Aufgaben ausführen

:::

---

# Sprint 1 - Kickoff

Der Sprint 1 hat zum Ziel, dass sich die Gruppe kennenlernt, zusammen ein
Projekt definiert wird und die Grundlage gesetzt wird, um das Projekt
umzusetzen.

- :dart: Gruppen kennenlernen
- :dart: Projekt finden
- :dart: GitHub kennenlernen
- :dart: Arbeitsgrundlage schaffen

---

# GitHub Issues _(Arbeitspakete)_

- haben **Abhängigkeiten** zu anderen Arbeitspakete.
- müssen **klare "Akzeptanzkriterien"** besitzen.
- sollten nur **ein Feature** beschreiben.
- müssen nach Fertigstellung an einen **Pull-Requests** geknüpft sein

> ## <!-- fit --> :bulb: Wenn ein "und" im Titel steht, kann es meistens Aufgesplittet werden.

![bg right fit](images/github-issue-direct.png)

---

# GitHub Issues _(Epics)_

- Beschrieben ein grösseres Feature
- **Zeigen auf Arbeitspakete** welche den Epic umsetzen.
- Dienen als **Gruppierung** von Arbeitspaketen
- **Löst selbst die Aufgabe nicht**, sondern verlinkt zu Issues

![bg right fit](images/github-issue-direct.png)

---

# GitHub Projekt

- Tool um Arbeitspakete (GitHub Issues) zu strukturieren
- GitHub Issues brauchen kein Projekt, es macht es aber übersichtlicher

> :bulb: Sind nicht einem Repository untergeordnet (leider!)

![bg right fit](images/github-kanban-board.png)

---

# GitHub Issue in Projekt

Issues im Projekt sehen ein wenig anders aus als im Repo :scream:

1. Status im Projekt
2. Link zu einem Pull-Request
3. Link zu anderen Issues

Ein "Item" im Projekt, dass kein Issue repräsentiert ist mit "draft" markiert.

- Ein "Draft" kann zu einem Issue umgewandelt werden.

![bg right fit](images/issue-referenzen.png)
