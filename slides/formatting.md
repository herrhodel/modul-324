---
marp: true
theme: bbzbl
paginate: true
header: Modul 324 - DevOps
footer: BBZBL / Lukas Hodel / DevOps-Prozese mit Tools unterstützen
---

<!-- _class: big center -->

# Woche 3

## Formatierung und Linting

### Modul 324

---

# Was ist Formatierung?

Definition der **Darstellung des Codes** durch

- **Leerzeichen**

- **Einzüge**
- **Zeilenumbrüche**

![bg right fit](./images/formating-html.gif)

---

# Ziele der Formatierung

::: columns

- :dart: Lesbarkeit

- :dart: Wartbarkeit
- :dart: Konsistenz

## Tastenkürzel

> - Windows: `Shift` + `Alt` + `F`
> - Mac: `Shift` + `Option` + `F`
> - Linux `Ctrl` + `Shift` + `I`

::: split

# <!--fit --> 💅

:::

---

# Formatierungs Regeln

- Es gibt in diesem Kurs keine vorgabe.

- Je nach Programmiersprache gibt es eigene standards.

> :bulb: Nehmt am besten den Standard der IDE!

## Gängige Plugins

- [Google Java Format](https://marketplace.visualstudio.com/items?itemName=wx-chevalier.google-java-format)
- [Prettier (JS/TS)](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

---

<!-- _class: big -->

# :bulb: Merken

- ### Syntaktisch falscher Code kann nicht formatiert werden
- ### Formatierung zeigt Professionalität

---

# Was ist Linting?

Garantiert die **funktionale Korrektheit** durch das Identifizieren von

- **potenziellen Fehlern**

- **stilistischen Problemen**
- **unsicheren Praktiken**

![bg right fit](./images/linting-htmlhint.jpg)

---

# :dart: Ziele vom Linting

::: columns

- **Konformität und Standards**

- **einheitliche Qualität**
- **Sicherheit** -> _DevSecOps_

::: split

# <!-- fit --> 👮

:::

---

<!-- _class: big -->

# :bulb: Merken

- ### Syntaktisch falscher Code kann geprüft werden
- ### Gängige Strukturfehler werden erkannt (best practices)
- ### Linting erhöht massiv die Sicherheit!
