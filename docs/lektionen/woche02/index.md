# Woche 2

:::note Heute startet der **[Sprint 1](/docs/sprints/sprint-1/index.md)**

:::

## Thema

<div className="grid"><div>

<Slide name="projektmanagement"/>

</div><div>

:::caution Hausaufgaben

Bitte alle lokal einmal folgenden Befehle ausführen:

- `docker run -d ubuntu:24.04`
- `docker run -d nginx`
- :bulb: wehr das Repository lokal schon geklont hat, kann **alternativ**
  folgende Befehle ausführen.
  - `docker compose up -d`
  - `docker compose down`

Zum Stoppen der Container, müssen zuerst die Containernamen durch `docker ps`
ausfindig gemacht werden:

- `docker ps` -> Namen der container kopieren
- `docker stop {name_ubuntu}`
- `docker stop {name_nginx}`

:bulb: Nächste Woche werden wir lokal entwickeln und diese zwei Befehle stellen
sicher, dass im Unterricht die Ubuntu Images bei allen schon gecached sind und
das Schulnetz weniger belastet wird.

:::

</div></div>

## Sprint 1 - Aufgaben

<DocCardList />
