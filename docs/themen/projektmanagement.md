---
sidebar_position: 2
keywords:
  - pdf
---

# Agiles Projektmanagement

## Handlungsziel

1. Erfasst und verwaltet die Anforderungen und **Umsetzungsschritte
   nachvollziehbar** für die Entwicklung im Team.
   1. Kennt den Nutzen bezüglich **kontinuierlicher toolunterstützter
      Entwicklung** und Wartung (z.B. MVP, Kundenfeedback, Kosten/Nutzen,
      Qualität, -Risikoreduktion).
   2. Kennt **Vorgehensweisen zur Verwaltung von Anforderungen** (z.B. Storys,
      Issues, Akzeptanzkriterien etc.).
   3. Kennt Vorgehensweisen zur nachvollziehbaren Entwicklung im Team (z.B.
      **Verknüpfung Commit mit Story, Pull Request/Peer-Review**).

## Projektdefinition

> Vorhaben, das im Wesentlichen durch die Einmaligkeit aber auch Konstante der
> Bedingungen in ihrer Gesamtheit gekennzeichnet ist, wie z.B. Zielvorgabe,
> zeitliche, finanzielle, personelle und andere Begrenzungen; Abgrenzung
> gegenüber anderen Vorhaben; projektspezifische Organisation.
>
> -- DIN 69901

## Agiles Manifest

> Wir erschliessen bessere Wege, Software zu entwickeln, indem wir es selbst tun
> und anderen dabei helfen. Durch diese Tätigkeit haben wir diese Werte zu
> schätzen gelernt:
>
> - **Individuen und Interaktionen** mehr als Prozesse und Werkzeuge.
> - **Funktionierende Software** mehr als umfassende Dokumentation.
> - **Zusammenarbeit mit dem Kunden** mehr als Vertragsverhandlung.
> - **Reagieren auf Veränderung** mehr als das Befolgen eines Plans.
>
> Das heisst, obwohl wir die Werte auf der rechten Seite wichtig finden,
> schätzen wir die Werte auf der linken Seite höher ein.
>
> -- [agilemanifesto](https://agilemanifesto.org/iso/de/manifesto.html)

## Das Vorgehensmodell <u>Kanban</u>

Im agilen Projektmanagement haben sich die Vorgehensmodelle _SCRUM_ und _Kanban_
durchgesetzt. Beiden Modelle verwenden eine **iterative Vorgehensweise**. Anders
als in klassischen Vorgehensmodelle wie dem Wasserfall-Model werden die
**Arbeitspakete fortwährend erstellt und angepasst**.

Wo _SCRUM_ einer klar definiertem Struktur mit vordefinierten Zeremonien folgt
(Daily, Refinement, Review, Retrospektive) ist _Kanban_ einfacher/flexibler
gehalten.

In _Kanban_ werden die Arbeitspakete in verschiedene **Status** eingeteilt.
Standardmässig heissen diese:

- **To do:** Arbeitspakete, welche bereits definiert wurden, jedoch noch nicht
  bearbeitet werden
- **In Process:** Arbeitspakete, welche momentan gerade bearbeitet werden
  - immer nur <u>1 Arbeitspaket pro Person</u>
- **Done:** Arbeitspakete welche erfolgreich umgesetzt wurden
- **Waiting:** Für Arbeitspakete, welche "In Process" sind, jedoch auf externe
  Einflüsse gewartet wird darf ein <u>optionaler Status</u> _Waiting_ eingeführt
  werden. (z.B. Warten auf eine Unterschrift, Infrastruktur usw.)

Da das Modul 324 nicht Projektmanagement im Fokus hat, werden wir für das
Projekt Kanban verwenden.

:::tip Protip

_Kanban_ eignet sich auch für kleine Privatprojekte, oder sogar zum Planen vom
eigenen Tagesablauf.

:::

### Einfaches GitHub Kanban Board

![Kanban-Board](images/github-kanban-board.png)

1. Mit <u>Add item</u> können direkt neue Arbeitspakete (_Issues_) erstellt
   werden.
2. Mit dem rechten <u>+</u> können neue Status hinzugefügt werden (z.B.
   _Waiting_).
3. Die _Arbeitspakete 3_ und _4_ wurden noch nicht begonnen.
4. Das _Arbeitspaket 2_ ist begonnen und es wurde eine Person zugeteilt.
5. Das _Arbeitspaket 1_ wurde bereits fertiggestellt.

## Arbeitspakete (GitHub Issues)

Die Arbeitspakete beschreiben die Aufgaben, welche erledigt werden müssen, um
das Projekt erfolgreich umzusetzen.

Sie werden je nach Software und Vorgehensmodell auch
[<u>Issues</u>](https://github.com/features/issues), Stories, Cards, Tickets
usw. genannt und:

- müssen eine **klare
  ["Definition of Done"](#definition-of-done-akzeptanzkriterien)**
  (Akzeptanzkriterien) besitzen.
- dürfen **nur eine Aufgabe** beschreiben.
  - Ein _"und"_ im Titel ist ein Hinweis darauf, dass ein Arbeitspaket
    aufgesplittet werden sollte.
- müssen **auf den Code verweisen** (Branch, Pull-Request), welcher die
  Beschreibung implementiert.
  - Natürlich geht dies erst wenn das Paket "In Progress" ist und es sich durch
    Code lösen lässt.
- müssen vorhandene **Abhängigkeiten** aufzeigen.
  - Es gibt auch Arbeitspakete die isoliert, also unabhängig implementiert
    werden können.

### Definition of Done (Akzeptanzkriterien)

Die Akzeptanzkriterien geben vor, **wie geprüft werden kann, ob das Arbeitspaket
korrekt umgesetzt wurde**. Grundsätzlich kann zwischen zwei Arbeitspaket-Typen
unterschieden werden, _[formelle Tätigkeiten](#1-administrativen-tätigkeiten)_
und [_programmierbare Funktionalitäten_](#2-programmierbare-funktionalitäten).

#### 1. **Administrativen Tätigkeiten**

Definieren der erwarteten Artefakte\*\* (z.B. GUI Skizzen, Dokumente usw.) und
wo diese gefunden werden können:

- Beschaffung von Infrastruktur
- Beschaffung von Lizenzen
- Meetings mit Kunden
- Ausarbeiten der Arbeitspakete
- ...

#### 2. **Programmierbare Funktionalitäten**

Definieren der erwarteten Funktionalität, **wo sie gefunden und getestet werden
kann**:

- Jegliche Software Funktionalität die umgesetzt werden soll
- _DevOps_ Automatisierungen
- _Infrastruktur as Code_
- Alles was in Code resultiert
- ...

:::danger wichtig

Ein Arbeitspaket ist erst dann **"Done"** wenn die **Akzeptanzkriterien** <u>auf
dem **Testsystem** erfolgreich durchgeführt</u> wurden.

:::

:::tip Schnelles Kundenfeedback

Wenn das Projekt im _DevOps_ Model mit einer [CI/CD Pipeline](./ci-cd.md)
umgesetzt wird, können die abgeschlossenen Arbeitspakete direkt im Testsystem
überprüft werden, da neue Funktionen _(Features)_ automatisiert online gestellt
_(deployed)_ werden.

- Optimalerweise kann dies direkt vom Kunde übernommen werden.

:::

:::tip Automatisierte Integrations-Tests

Automatisierter **Integrations Test** durch ein Testing Framework wie
[Puperteer](https://pptr.dev/), [Playwright](https://playwright.dev/),
[Selenium](https://www.selenium.dev/selenium/docs/api/javascript/index.html)
**spart Zeit und garantiert das Funktionieren auf Zeit**

- Geht nur für Web-Applikationen
- Vergleichbar mit einem Suchmaschinen-Bot

:::

### <u>Eine klare Aufgabe</u> pro Arbeitspaket

Jede komplexe Aufgabe besteht aus vielen einfacheren Unteraufgaben. Dabei gibt
es häufig Unteraufgaben, die schneller und solche die weniger schnell gelöst
werden können.

Wenn nun eine komplexe Aufgabe in einem Arbeitspaket beschreiben wird, werden
diese meistens sowieso im Arbeitspaket nacheinander gelöst. Dies führt dazu,
dass Teilbereiche der Aufgabe bereits fertiggestellt sind, jedoch noch nicht
abgeschlossen werden können, da sie von der komplexeren Aufgabe blockiert
werden.

#### Vorteil von kleinen Arbeitspakete

- Sie sind **schneller gelöst**
- Es gibt ein **Erfolgsgefühl** ein Arbeitspaket abschiessen zu können
- Die **Motivation steigt** das Arbeitspaket überhaupt anzufangen
- Es **verhindert Knotenrisiko** ("Eigentlich sind wir ja fertig, wenn nur XY
  funktionieren würde")
- Garantiert schnelles **Feedback vom Kunden**
  - erhöht die **Kundenzufriedenheit**
  - vermeidet, **löst Missverständnisse** frühzeitig
- Macht die **Gedanken frei** um sich auf etwas zu konzentrieren
- Wenn bereits beim Erstellen der Arbeitspakete überlegt wird, ob man dieses
  noch mehr unterteilen kann, setzt man sich schon früh mit der Funktionalität
  auseinander. Dies führt dazu, dass **eventuelle Probleme schon früher
  erkennbar werden**.

:::important

- Natürlich darf man im agilen Projektmanagement ein <u>Arbeitspaket auch noch
  im Nachhinein splitten!</u> :sweat_smile:

:::

### Verweist auf den Code

Handelt es sich bei einem Arbeitspaket um eine **programmierbare
Funktionalität**, muss das Arbeitspaket auf den **Code verweisen**, welches es
umsetzt.

Dies wird in diesem Modul durch die Versionskontrolle
[_Git_](https://git-scm.com/) in Kombination mit der Plattform
[_GitHub_](https://github.com) ermöglicht.

Natürlich muss die Verweisung erst angefügt werden, **sobald das Arbeitspaket
umgesetzt wird** und in den Status <u>"In Progress"</u> gesetzt wurde.

### Verweist auf Abhängigkeiten

Ist ein Arbeitspaket abhängig von anderen Arbeitspaketen, muss diese
Abhängigkeit klar ersichtlich sein. Dafür wird am Anfang der Beschreibung eine
Liste erstellt, welche **auf Arbeitspakete verweist, welche davor gemacht werden
müssen**.

In GitHub Markdown sieht eine Liste folgendermassen aus:

```markdown
# Abhängigkeiten

- [x] #1
- [ ] #2

# Beschreibung

Die genaue Beschreibung...
```

- `#1` ist die **Nummer des GitHub Issues** und wird <u>automatisch</u> von
  GitHub aufgelöst

### GitHub Issues: Verweisung auf Code und Abhängigkeiten in

![Referenzen](images/issue-referenzen.png)

1. Das _Arbeitspaket 2_ ist **"In Progress"**
2. Es hat **Abhängigkeiten**, wobei eine noch aussteht
3. Es zeigt auf den **_"Pull Request"_, also den Code** welche zur
   Implementation benötigt wird.

## Kosten / Nutzen der agilen Vorgehensweise

Bei der agilen Vorgehensweise mit dem DevOps Model, entstehen
traditionellerweise **am Anfang höhere Kosten**, da alle Entwicklungsumgebungen,
das Testsystem, die CI/CD Pipelines usw. aufgebaut werden müssen. Während des
Projektes sinken die Kosten für gewöhnlich.

### Vorteile der Agilen Vorgehensweise

- Missverständnisse werden früh gefunden durch **schnelles Kundenfeedback**
- Es existiert von Anfang an ein **Funktionsfähiges System**
- Für alle **klarer Entwicklungsstand** _(Keine Katze im Sack,
  works-on-my-machine wird ausgehebelt)_
- Das **<u>Risiko wird minimiert</u>**, da der Kunde frühzeitig einschreiten
  kann, wenn was nicht stimmt.
- Teure **Nachbesserungsarbeiten, werden vermieden**
- Die **administrativen Tätigkeiten werden gesenkt**, da weniger über das
  Einhalten von Verträgen (Pflichtenheft) verhandelt werden muss
- Eine Funktionalität wird meistens erst klar, wenn man sie umsetzt. Die
  "hands-on" Mentalität führt dazu, dass schnell umgesetzt wird und somit
  schneller klar ist, **was der <u>Kunde</u> genau will** und wie es **am besten
  umsetzbar** ist.

## Kundenfeedback

## :toolbox: Tools

- [**GitHub Projects**](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
  <u>:point_left: Im Unterricht verwendet</u>
- [Trello](https://trello.com/)
- [Jira](https://www.atlassian.com/software/jira)
  - wird von vielen Grossfirmen verwendet in Kombiation mit BitBucket und
    Confluence
- [Basecamp](https://basecamp.com/)

