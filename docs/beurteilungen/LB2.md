---
sidebar_position: 2
keywords:
  - pdf
---

# LB 2: Sprint 2

## Überblick

| Sozialform           | Form                                                            | Abgabe  | Gewicht               |
| :------------------- | :-------------------------------------------------------------- | :------ | :-------------------- |
| 😄 **Einzelarbeit**  | [🪞 Schriftliche Reflexion](#1-teilnote-schriftliche-reflexion) | Woche 8 | 8                     |
| 👬 **Gruppenarbeit** | [📐 Projektstand](#2-teilnote-projektstand)                     | Woche 8 | 26                    |
|                      | **Total**                                                       |         | **34**                |
| ...                  |                                                                 |         |                       |
|                      | 🏅 **LB2: Sprintnote**                                          | Woche 8 | **30% der Modulnote** |

## 1. Teilnote: Schriftliche Reflexion

| Sozialform               | Form                                                 |  Zeit  | Abgabe  | Gewicht      |
| :----------------------- | :--------------------------------------------------- | :----: | :------ | :----------- |
| :smile: **Einzelarbeit** | schriftlich / [Classtime](https://www.classtime.com) | 45 Min | Woche 8 | 8/34 vom LB2 |

Am **Ende des Sprints** wird in der **letzten Lektion**, in **Einzelarbeit**
eine **schriftliche Reflexion** über den Verlauf des Sprints verfasst.

:::caution[Achtung!]

Die schriftliche Reflexion wird **im Unterricht, in 45 Min. auf
[Classtime](https://www.classtime.com) geschrieben**.

- Die Fragen sind gegeben, **vorbereiten ist erlaubt** resp. erwünscht.
- Es werden **Plagiate geprüft**, wenn der verdacht besteht wird die **Note 1**
  für beide/alle Parteien gegeben.
- Während den 45 Minuten sind **keine Hilfsmittel** erlaubt!
  - Wenn Ihr Euch schriftlich vorbereitet, macht es ausserhalb vom Repo.

:::

### Bewertung

:::info[Punktekriterien]

- **0-Punkte**: Frage ist nicht resp. sehr mangelhaft beantwortet
- **0.5-Punkt**: Frage ist beantwortet
- **1-Punkt**: Frage ist tiefgründig beantwortet

:::

### Fragen

:::danger[nicht ganz gleich zum LB1!]

:::

#### Inhalt

- 1.1. Welche verschiedenen Themen beinhaltete der Sprint?
- 1.2. Was haben die Themen mit dem Begriff DevOps zu tun?

#### Gruppendynamik

- 1.3. Hat sich die Kommunikation im Team verändert seit dem ersten Sprint?
- 1.4. Was ist **uns** besonders gut gelungen, worauf sind alle richtig stolz?

#### Lernzuwachs

- 1.5. Was ist **mir** besonders gut gelungen, worauf bin ich richtig stolz?
- 1.6. Welche Schwierigkeiten gab es?

#### Lerneffekt (bezogen auf das Modul)

- 1.7. Was sollte beibehalten werden?
- 1.8. Was würden Sie anders machen?

## 2. Teilnote: Projektstand

Am **Ende des Sprint 2** wird der **Arbeitsvorgang der Gruppe** analysiert und
bewertet.

| Sozialform           | Form         | Abgabe  |       Gewicht |
| :------------------- | :----------- | :-----: | ------------: |
| 👬 **Gruppenarbeit** | 👷 Am Objekt | Woche 8 | 26/36 vom LB2 |

:::danger[Achtung Kollektivnote!]

- 👮 Bitte kontrolliert Euch selbst, dass alle sich an die Vorgaben halten.
- 💡 Diese Note ist bewusst nicht individuell, damit die Gruppe sich
  zusammenrauft.
- ⏲️ Es wird der **Stand vom Ende des Nachmittags** bewertet.

:::

### Bewertung

:::info[Punktekriterien]

- **0-Punkte**: Thema fehlt oder ist sehr mangelhaft vorhanden
- **1-Punkt**: Thema existiert ist jedoch ausbaufähig
- **2-Punkte**: Thema ist einwandfrei umgesetzt

:::

| Nr.  | Thema                                                                                           | Max-Punkte |
| :--: | :---------------------------------------------------------------------------------------------- | :--------: |
| 2.1  | **Epics/Issues** entsprechen den gleichen Kriterien wie im LB1                                  |     2      |
| 2.2  | **Geschlossene Issues** sind an einen **Pull Request geknüpft** resp. verweisen auf Artefakte.  |     2      |
| 2.3  | **Geschlossene Issues** beinhalten ein **Protokoll/Beweis der ausgeführten Akzeptanzkriterien** |     2      |
|      | Dies können z.B. Screenshots oder ein Video sein                                                |            |
| 2.4  | **Pull Requests** besitzen eine Referenz auf den Issue den ihn beschreibt.                      |     2      |
| 2.5  | **Pull Requests** sind **konstruktiv** kommentiert (auch Code!)                                 |     2      |
| 2.6  | **Pull Requests** beziehen sich **genau auf einen** Issue                                       |     2      |
| 2.7  | **Commits** sind anhand **conventional-commits** geschrieben                                    |     2      |
| 2.8  | Alle umgesetzten **Features werden automatisiert getestet**                                     |     2      |
| 2.9  | Applikation wird **via Dockerfile virtualisiert**                                               |     2      |
| 2.10 | Applikation wird **via Semantischer-Versionierung Released** (Release-Please, GH-Action)        |     2      |
| 2.11 | Ein Release generiert automatisch ein **Docker-Image** (GH-Action)                              |     2      |
| 2.12 | Die AWS Umgebung wird durch **Terraform** automatisch aufgesetzt (GH-Action)                    |     2      |
| 2.13 | Das Docker-Image wird **automatisch nach AWS deployt** und ist vom Kunde testbar (GH-Action)    |     2      |
|      | ...                                                                                             |            |
|      | **TOTAL**                                                                                       |   **26**   |

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

- Sie richten Services für die Auslieferung ein. [h3.1] (2.8, 2.9, 2.10, 2.11)
- Sie stellen Komponenten für die Auslieferung bereit. [h3.3] (2.4, 2.8)
- Sie paketieren eine Applikation. [h3.4] (2.9)
- Sie verwalten und versionieren Artefakte. [h3.5] (2.10)
- Sie überprüfen den Auslieferungsprozess der Applikation gemäss Vorgaben.
  [h3.6] (2.3, 2.8)

**Irrelevant durch Vorgabe**

- Sie bestimmen geeignete Integrationspraktiken und halten diese fest. [h2.2]
  - ✅ Gegeben, dockerisierte Web-Applikation
- Sie bestimmen geeignete Deployment-Praktiken und halten diese fest. [h2.3]
  (2.12, 2.13)
  - ✅ kamal-deploy.org nach AWS
- Sie bestimmen eine geeignete Artefakt-Verwaltung und halten diese fest. [h2.4]
  (2.12)
  - ✅ AWS Docker Image Registry
