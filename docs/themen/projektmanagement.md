---
sidebar_position: 2
---

# Agiles Projektmanagement

## Handlungsziel

1. Erfasst und verwaltet die Anforderungen und Umsetzungsschritte nachvollziehbar für die Entwicklung **im Team**
   1. Kennt den Nutzen bezüglich **kontinuierlicher toolunterstützter Entwicklung** und Wartung (z.B. MVP, Kundenfeedback, Kosten/Nutzen, Qualität, Risiko- reduktion).
   2. Kennt **Vorgehensweisen zur Verwaltung von Anforderungen** (z.B. Stories, Issues, Akzeptanzkriterien etc.).
   3. Kennt Vorgehensweisen zur nachvollziehbaren Entwicklung im Team (z.B. **Verknüpfung Commit mit Story, Pullrequest/PeerReview**).

## Projektdefinition

> Vorhaben, das im Wesentlichen durch die Einmaligkeit aber auch Konstante der Bedingungen in ihrer Gesamtheit gekennzeichnet ist, wie Z . B. Zielvorgabe, zeitliche, finanzielle, personelle und andere Begrenzungen; Abgrenzung gegenüber anderen Vorhaben; projektspezifische Organisation.
>
> -- DIN 69901

## Agiles Manifesto

> Wir erschließen bessere Wege, Software zu entwickeln,
> indem wir es selbst tun und anderen dabei helfen.
> Durch diese Tätigkeit haben wir diese Werte zu schätzen gelernt:
>
> - **Individuen und Interaktionen** mehr als Prozesse und Werkzeuge
> - **Funktionierende Software** mehr als umfassende Dokumentation
> - **Zusammenarbeit mit dem Kunden** mehr als Vertragsverhandlung
> - **Reagieren auf Veränderung** mehr als das Befolgen eines Plans
>
> Das heißt, obwohl wir die Werte auf der rechten Seite wichtig finden,
> schätzen wir die Werte auf der linken Seite höher ein.
>
> -- https://agilemanifesto.org/iso/de/manifesto.html

## Das Vorgehensmodell _Kanban_

Im Agilen Projektmanagement haben sich die Vorgehensmodelle _SCRUM_ und _Kanban_ durchgesetzt.
Beiden Modelle verwenden eine **iterative Vorgehensweise**. Anders als in klassischen Vorgehensmodelle wie dem Wasserfall-Model, werden in die **Arbeitspakete fortwährend erstellt und angepasst**.

Wo _SCRUM_ einer klar definiertem Struktur mit vordefinierten Zeremonien folgt (Daily, Refinement, Review, Retrospektive) ist _Kanban_ einfacher/flexibler gehalten.

Da das Modul 324 nicht Projektmanagement im Fokus hat, **werden wir für das Projekt _Kanban_ verwenden**. 

:::note Protip

_Kanban_ eignet sich auch für kleine Privatprojekte, oder sogar zum Planen vom eigenen Tagesablauf.

:::

In _Kanban_ werden die Arbeitspakete in verschiedene Stati unterteilt. Standardmässig heissen diese:

- **To do**: Arbeitspakete welche bereits definiert wurden, jedoch noch nicht bearbeitet werden
- **In Process**: Arbeitspakete welche momentan gerade bearbeitet werden
  - immer nur 1 Arbeitspaket pro Person
- **Done**: Arbeitspakete welche erfolgreich umgesetzt wurden

Dabei ist wichtig, dass immer nur **ein Arbeitspaket pro Person "In Process"** ist. Ansonsten gibt es bei _Kanban_ nicht so viele Regeln.

:::tip Status Waiting

Für Arbeitspakete, welche **"In Process" sind, jedoch auf externe gewartet wird** darf ein zusätzlicher Status _Waiting_ eingeführt werden. (z.B. Warten auf eine Unterschrift, Infrastruktur usw.)

:::

### Einfaches Github Kanban Board

![](images/github-kanban-board.png)

1. Mit **Add item** können direkt neue Arbeitspakete (*Issues*) erstellt werden
2. Mit dem rechten **+** können neue Stati hinzugefügt werden (z.B. *Waiting*)
3. Die *Arbeitspakete 3* und *4* wurden noch nicht begonnen
4. Das *Arbeitspaket 2* ist begonnen und es wurde eine Person zugeteilt
5. Das *Arbeitspaket 1* wurde bereits fertiggestellt

### Arbeitspakete (Github Issues)

Die Arbeitspakete, auch Issues/Stories/Cards/Tickets usw. genannt beinhalten die Tätigkeiten, welche erledigt werden müssen, um das Projekt erfolgreich umzusetzen.

- haben **Abhängigkeiten**
- müssen eine **klare "Definition of Done"** besitzen
- sollten **nur eine Aufgabe** beschreiben
  - die ein "und" im Titel haben, können meistens Aufgesplitte

[:link: Github Issues](https://github.com/features/issues)

#### Verknüpfen mit Code (git, pull requests)

### Akzeptanzkriterien

## Kosten / Nutzen

## Kundenfeedback

## :toolbox: Tools

- [**Github Projects**](https://docs.github.com/en/issues/planning-and-tracking-with-projects) **:point_left: Im Unterricht verwendet**
- [Trello](https://trello.com/)
- [Jira](https://www.atlassian.com/software/jira)
  - wird von vielen Grossfirmen verwendet in Kombiation mit BitBucket und Confluence
- [Basecamp](https://basecamp.com/)

## :pencil: Aufgaben

- [Github Projekt erstellen](../aufgaben/github-projekt-erstellen.md)
- [Github Issues erfassen](../aufgaben/github-issues-erfassen.md)
