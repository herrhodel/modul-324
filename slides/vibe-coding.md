---
marp: true
theme: bbzbl
paginate: true
header: Modul 324 - Vibe Coding
footer: BBZBL / Lukas Hodel / DevOps-Prozese mit Tools unterstützen
---

<!-- _class: big center -->

# Vibe Coding<br /> _vs_<br /> Agentic Engineering

---

# Vibe Coding

- Programmierer schreibt nur noch "Prompts" in natürlicher Sprache.
- Der Agent wird "konfiguriert" mit Files wie "Agents.md", Skills, MCP Servers
  und Co.
- Der generierte Sourcecode wird nicht angeschaut! Nur "geprüft" ob das Resultat
  stimmt.

---

# Vibe Coding / Vorteile

- Programmierer muss nicht Programmieren können.
- Fachpersonen **mit tiefem Fachverständnis** können Programme schreiben.
- Hilfsprogramme, für die die Zeit fehlte, können nun schnell erstellt werden.
- **Super für Prototyping!**

---

# Vibe Coding / Risiken

- Kein Verständnis vom Code!
  ([Cognitive Depth](https://florian-gahn.de/blog/cognitive-debt-ki-coding))
- Der Programmierer denkt nicht aktiv mit. **"Heureka" Effekte nehmen ab**.
- Wenn etwas im GUI sichtbar ist, muss es noch lange nicht auch korrekt
  umgesetzt sein.
  - z.B. Benutzerberechtigung, Autorisierung, Sicherheit im Allgemeinen
- Produktive Errors, können schlimmstenfalls nicht behoben werden, da das Wissen
  nicht da ist und die KI nicht hilfreich sein muss dabei.
- Neue Studien zeigen KI macht Wissenschaftler zwar effizienter,
  [nicht aber besser](https://spectrum.ieee.org/ai-science-research-flattens-discovery).
  Das Gleiche gilt für Programmierer.

---

# Agentic Engineering

- Programmierer schreibt aktiv Code
- **Teilbereiche** werden durch KI-Agenten ergänzt/initialisiert.
  - Ähnlich zu StackOverflow nur individueller
  - Super für Bootstrapping und Co.
- Es werden kleine, einzelne Feature umgesetzt und Reviewed

---

# Agentic Engineering / Vorteile

- Schnelleres Entwickeln durch KI
  - Bootstrapping / Boilerplate
  - Individuelle Lösungen zu Fragen
  - Refactoring!
- Human in the Loop, sollte
  [Cognitive Depth](https://florian-gahn.de/blog/cognitive-debt-ki-coding)
  verhindern.

---

# Agentic Engineering / Risiken

- Alles wie beim Vibe-Coding, ausser man behält wirklich die Kontrolle!
- Es braucht **Selbstdisziplin**!

---

# Cognitive Debt / Warnsignale

- Niemand im Team kann erklären, warum eine bestimmte Designentscheidung
  getroffen wurde.
- Einfache Änderungen brechen unerwartet andere Teile des Systems.
- Onboarding neuer Entwickler dauert auffällig länger als früher.
- Refactorings werden vermieden, aus Angst, etwas zu zerstören, das niemand mehr
  versteht.
- Pull Requests werden durchgewunken, weil „die Tests grün sind“.
- Bei Bugs wird nicht debugged, sondern der Agent gebeten, „das mal zu fixen“.
- Das Team behandelt die eigene Software wie eine Drittbibliothek.

[Quelle](https://florian-gahn.de/blog/cognitive-debt-ki-coding)

---

# 👮‍♀️ Regeln fürs Modul

- Vibe Coding ist **nicht** erlaubt!
- Agentic Engineering ist Ok, ABER!

  - Kleine PRs mit **nur einem Feature**.
  - Die PRs werden **kommentiert**, damit das Verständnis wächst.
  - Ich erkenne Pseudokommentare. **Diese geben Abzug**.
