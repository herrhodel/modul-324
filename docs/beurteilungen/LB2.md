---
sidebar_position: 2
keywords:
  - pdf
---

# LB 2 : Sprint 2

## Überblick

| Sozialform           | Form                                                            | Abgabe  | Gewicht               |
| :------------------- | :-------------------------------------------------------------- | :------ | :-------------------- |
| 😄 **Einzelarbeit**  | [🪞 Schriftliche Reflexion](#1-teilnote-schriftliche-reflexion) | Woche 4 | 10                    |
| 👬 **Gruppenarbeit** | [📐 Projektstand](#2-teilnote-projektstandktstand)              | Woche 4 | 26                    |
|                      | **Total**                                                       |         | **36**                |
| ...                  |                                                                 |         |                       |
|                      | 🏅 **LB2: Sprintnote**                                          | Woche 8 | **40% der Modulnote** |

## 1. Teilnote: Schriftliche Reflexion

| Sozialform               | Form        |  Zeit  | Abgabe  | Gewicht     |
| :----------------------- | :---------- | :----: | :------ | :---------- |
| :smile: **Einzelarbeit** | schriftlich | 45 Min | Woche 4 | 1/3 vom LB1 |

Am **Ende des Sprints** wird in der **zweiten Lektion**, in **Einzelarbeit**
eine **schriftliche Reflexion** über den Verlauf des Sprints verfasst.

:::caution Achtung!

Die schriftliche Reflexion wird **im Unterricht, in 45 Min. geschrieben** und
direkt im Projekt eingecheckt.

- Die Fragen sind gegeben, **vorbereiten ist erlaubt** rsp. erwünscht.
- Es werden **Plagiate geprüft**, wenn der verdacht besteht wird die **Note 1**
  für beide/alle Parteien gegeben.
- Während den 45 Minuten sind **keine Hilfsmittel** erlaubt!
  - Wenn Ihr euch schriftlich vorbereitet, macht es ausserhalb vom Repo.

:::

### Bewertung

:::info Punktekriterien

- **0-Punkte**: Thema fehlt oder ist sehr mangelhaft vorhanden
- **1-Punkt**: Thema existiert ist jedoch ausbaufähig
- **2-Punkte**: Thema ist einwandfrei umgesetzt

:::

| Thema                                                                              | Punkte |
| :--------------------------------------------------------------------------------- | -----: |
| Alle Leitfragen sind beantwortet                                                   |      2 |
| Die Themen wurden detailliert beschrieben _(keine Stichpunkte)_.                   |      2 |
| Die Antworten sind Tiefgründig und kritisch hinterfragt.                           |      2 |
| Gruppen- und Eigenerfolg sind voneinander unterscheidbar _(Leitfragen 1.7., 1.10)_ |      2 |
| Die Reflexion wurde in gewünschter Form abgegeben                                  |      2 |
| ...                                                                                |        |
| **TOTAL**                                                                          | **10** |

### Wo wird die Reflexion geschrieben?

- Für jede Reflexion pro Person soll ein `GitHub Issue` erstellt werden.
- Die Reflexion soll als `markdown`-Datei unter folgendem Pfad
  `/docs/reflections/ihr-nachname/reflexion-sprint2.md` geschrieben werden.
- Für jede Reflexion pro Person wird ein Branch erstellt.
- Es wird ein Pull-Request erstellt und mir `@herrhodel` als Reviewer
  zugewiesen.
- Nach dem mergen, soll der Branch wieder gelöscht werden.

:::caution

- :boom: Die Commit-Message soll folgendermassen heissen.
  - `docs(lb2): Reflexion Sprint 2 ([ihr-nachname])`

:::

:::tip Beispieldatei: `/docs/reflections/hodel/reflexion-sprint2.md`

```markdown
# Hodel - Reflexion Sprint 2

## 1.2 Welche verschiedenen Themen beinhaltete der Sprint?

lorem ipsum...

## 1.2 Sind diese Themen zum Zeitpunkt im Projekt gut gewählt, wenn ja, wieso?

lorem ipsum...

...
```

Commit-Message: `docs(lb2): Reflexion Sprint 2 (Hodel)`

:::

:::info Wieso so kompliziert?

1. Ihr wendet direkt Prinzipien von Git und GitHub an
2. Ich habe dich Möglichkeit im Pull-Request einzelne Zeilen zu kommentieren
3. Ihr verwendet mit conventional-commits direkt das Autorelease Feature

:::

### Leitfragen

:::danger nicht ganz gleich zum LB1!

:::

#### Inhalt

- 1.1. Welche verschiedenen Themen beinhaltete der Sprint?
  - Bitte detailliert und nicht nur Stichworte!
- 1.2. Sind diese Themen zum Zeitpunkt im Projekt gut gewählt, wenn ja, wieso?
- 1.3. Was wurde in diesem Sprint erreicht?
- 1.4 Was wurde in diesem Sprint nicht erreicht?

#### Gruppendynamik

- 1.5. Wie war die Zusammenarbeit im Team?
- 1.6. Auf was achtet Ihr bei der Kommunikation, damit diese Konstruktiv ist?
- 1.7. Was ist **uns** besonders gut gelungen, worauf sind alle richtig stolz?

#### Lernzuwachs

- 1.8. Was kann ich nun mehr als vorher?
- 1.9. Dieses Thema vom Sprint ist besonders relevant? Begründen Sie.
- 1.10. Was ist **mir** besonders gut gelungen, worauf bin ich richtig stolz.

#### Lerneffekt

- 1.11 Was sollte beibehalten werden?
- 1.12 Was sollte geändert werden?

## 2. Teilnote: Projektstand

Am **Ende des Sprint 2** wird der **Arbeitsvorgang der Gruppe** analysiert und
bewertet.

| Sozialform           | Form         | Abgabe  |     Gewicht |
| :------------------- | :----------- | :-----: | ----------: |
| 👬 **Gruppenarbeit** | 👷 Am Objekt | Woche 4 | 1/3 vom LB2 |

:::danger Achtung Kollektivnote!

- 👮 Bitte kontrolliert euch selbst, dass alle sich an die Vorgaben halten.
- 💡 Diese Note ist bewusst nicht individuell, damit die Gruppe sich
  zusammenrauft.
- ⏲️ Es wird der **Stand vom Ende des Nachmittags** bewertet.

:::

### Bewertung

<!-- TODO: An Modulidentifikation angleichen -->

| Thema                                                                                                                         | Punkte |
| :---------------------------------------------------------------------------------------------------------------------------- | :----: |
| **Issues** sind **klar und verständlich** beschrieben                                                                         |   1    |
| **Issues** beinhalten eine **Definion of Done**                                                                               |   1    |
| **Geschlossene Issues** sind an einen **Pull Request geknüpft**                                                               |   1    |
| **Geschlossene Issues** erfüllen die **Akzeptanzkriterien**                                                                   |   1    |
| **Pull Requests** besitzen eine **Berschreibung** (oder eine Referenz in der Beschreibung, auf den Issue den ihn beschreibt). |   1    |
| **Pull Requests** sind **konstruktiv** kommentiert (auch Code!)                                                               |   2    |
| **Pull Requests** beziehen sich **genau auf einen** Issue                                                                     |   1    |
| **Commits** sind anhand **conventional-commits** geschrieben                                                                  |   1    |
| **Commits** beschreiben den **Inhalt** kurz (und nicht die Datei die geändert wurde)                                          |   1    |
| ...                                                                                                                           |        |
| **TOTAL**                                                                                                                     | **10** |

## LB2 der offiziellen Modulidentifikation

Der LB2 entspricht der
[:link: LBV-324-1, Element 2](https://www.modulbaukasten.ch/module/324/1/de-DE?title=DevOps-Prozesse-mit-Tools-unterst%C3%BCtzen&lbv=0)
der Modulidentifikation.

### Offizielle Beschreibung

> Die Kandidaten und Kandidatinnen erstellen ein Portfolio über den Teil des
> Operations (Ops). Dabei werden die Teile des Freigebens (Release) und der
> Veröffentlichung (Deploy) bewertet. Die Teile des Betriebs (Operate) und der
> Überwachung (Monitor) werden nur marginal betrachtet.

Informatikerinnen und Informatiker bestimmen geeignete Massnahmen zur
Integration und zum Deployment von Applikationen. Dabei bestimmen sie eine
geeignete Artefakteverwaltung für die effiziente Arbeit im Team.

- Sie richten Services für die Auslieferung ein. [h3.1]
- Sie stellen Komponenten für die Auslieferung bereit. [h3.3]
  - Features entwickeln
- Sie paketieren eine Applikation. [h3.4]
  - Dockerisieren
- Sie verwalten und versionieren Artefakte. [h3.5]
  - release please einsetzen
- Sie überprüfen den Auslieferungsprozess der Applikation gemäss Vorgaben.
  [h3.6]

  **Irrelevant durch Vorgabe**

- Sie bestimmen geeignete Integrationspraktiken und halten diese fest. [h2.2]
  - ✅ Gegeben, dockerisierte Web-Applikation
- Sie bestimmen geeignete Deployment-Praktiken und halten diese fest. [h2.3]
  - ✅ kamal-deploy.org nach AWS
- Sie bestimmen eine geeignete Artefakt-Verwaltung und halten diese fest. [h2.4]
  - ✅ AWS docker image registry
