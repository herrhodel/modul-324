---
sidebar_position: 6
keywords:
  - pdf
---

# Git cheat sheet

## Git Amend

Es ist gut regelmässig Commits zu erstellen. Dies verhindert, dass Code verloren
geht. Wenn nun aber "conventional commits" verwendet werden sollen, ist es
schwierig immer ein korrekter Typ und Nachricht zu finden.

Dafür ist folgender Befehl hilfreich:

Durch das Attribut `--amend` werden die aktuellen Änderungen nicht als neuer
Commit hinzugefügt, sondern der letzte Commit wird mit den Änderungen erweitert.

```bash
git commit --amend
```

Möchte man zusätzlich noch die Nachricht korrigieren geht dies mit dem Attribut
`-m`:

```bash
git commit --amend -m "feat: Neues Feature mit beschreibender Nachricht"`
```

:::danger

Wurde der letzte Commit schon auf GitHub gepushed, muss das pushen forciert
werden. Der letzte Commit wird so überschrieben.

```bash
git push feat/mein-feature-branch --force-with-lease
```

- :exclamation: **Immer nur im feature Branch ausführen!**

:::

### Git rebase -i

Durch `git commit --amend` kann also der letzte Commit angepasst werden. Was
nun, wenn mehrere Commits, z.B. zwei, zusammengeführt "gesquashed" und oder
umbenannt werden sollen? Dies geht mit
[Rebase interactive](https://about.gitlab.com/de-de/blog/keep-git-history-clean-with-interactive-rebase/).

```bash
git rebase -i HEAD~2 # die 2 ist Anzahl Commits zurück
```

Dieses Script öffnet automatisch den Editor, der in der Environment-Variable
`$EDITOR` angegeben wurde.

In diesem lässt sich durch `pick`, `squash` und `reword` pro Commit auswählen,
wie vorgegangen werden soll:

- `pick` heisst, der Commit wird gelassen wie er ist.
- `squash` heisst, der Commit wird dem nächsten angefügt, also entfernt.
- `reword` heisst, der Commit bleibt bestehen, die Nachricht soll jedoch
  geändert werden.

Zum Beispiel zurück. Es existieren 2 Commits. Den Ersten wird mit `reword`
markiert, der zweite mit `squash`.

```bash
reword 6bcf266 Ein Feature dass fertig ist
squash 7b2317c Ein Fehler behoben vom Feature
```

Speichert man den Dialog erscheint ein neuer Dialog, um die Nachricht
anzupassen. Zu oberst muss die neue Nachricht stehen. Die alten Nachrichten
werden nach unten geschoben. Diese kann man stehen lassen als "history" oder
einfach löschen.

```bash
feat: Neue Nachricht für den Commit

# This is a combination of two commits.
# This is the 1st commit message

Ein Feature dass fertig ist

# This is the commit message #2

Ein Fehler behoben vom Feature
```

Sobald gespeichert wird, werden die 2 Commits zusammengeführt.

:::tip

Ist ein Fehler geschehen, und ihr wollt abbrechen geht das mit
**`git rebase --abort`**

:::

## Git merge vs git rebase

Wenn man am eigenen Branch arbeitet und während dessen bereits neue Features in
den `main` Branch gemerged wurden, besitzt der eigene Branch diese noch nicht.
Man ist hinter nach. Dies kann zu Merge-Konflikten im Pull-Request führen.

Es gibt zwei Möglichkeiten den eigenen Branch upzudaten. Diese währen
`git merge main` sowie `git rebase main`.

### Git merge

In dem Modul wird diese Methode bevorzugt. Sie führt zu weniger Probleme. Das
Vorgehen ist folgendermassen, angenommen man befindet sich im feature Branch
`feat/mein-feature`:

Als Erstes muss sichergestellt werden, dass der aktuelle Feature-Branch keine
"uncomittete" Änderungen beinhaltet. Wenn dies bereit der Fall ist, kann der
Schritt übersprungen werden.

```bash
git checkout feat/mein-feature # in branch feat/mein-feature wechseln
git add . # alle Dateien "stagen" sodass sie auch comitted werden
git commit -m "feat: tolle Nachricht" # Der aktuelle Feature Branch muss alles committed haben
git checkout main # den main Branch auschecken
```

Dann muss der lokale `main`-Branch durch ein `git pull` mit GitHub
synchronisiert werden, sodass alle Änderungen durch gemergte Pull-Requests auch
lokal verfügbar sind.

```bash
git checkout main # den main Branch auschecken
git pull origin main # den main Branch pullen, sodass alle Änderungen lokal vorhanden sind
```

Ist der `main`-Branch auf dem neusten Stand, muss wieder, mit `checkout`, in den
Feature-Branch `feat/mein-feature` gewechselt werden. Dieser Branch wollen wir
jetzt mit `merge` auf den neusten Stand vom `main` Branch bringen.

```bash
git checkout feat/mein-feature # in branch feat/mein-feature wechseln
git merge main # alle Änderungen vom Branch main übernehmen.
```

:::caution

Hier kann es zu Merge-Konflikten führen. Diese müssen aufgelöst werden.

- Wurden diese gelöst, kann mit `git merge --continue` den Merge abgeschlossen
  werden.
- Seit Ihr unsicher und **wollt abbrechen** geht das mit **`git merge --abort`**

:::

Danach sind alle commits von `main` auch im Feature-Branch `feat/mein-feature`
vorhanden. Als Letztes muss der Feature-Branch wieder nach GitHub, mittels
`push`, hochgeladen werden.

```bash
git push origin feat/mein-feature
```

:::info

Das Pushen geht ohne `--force-with-lease` oder `--force`, da die Commits in der
Reihenfolge übernommen wurden, wie diese chronologisch geschehen sind. Die
Git-Historie wird nicht angefasst.

**Der letzte eigene Commit im Feature-Branch muss jetzt nicht mehr unbedingt am
Ende stehen!**

:::

### Git rebase

Bei `git rebase` gehen wir grundsätzlich gleich vor wie beim merge:

1. Der Feature-Branch muss komplett commitet sein.
2. `main` muss per `pull` aktualisiert werden.
3. Es kann zu Merge-Konflikten kommen.

Es wird jedoch nicht `git merge`, sondern `git rebase` ausgeführt.

```bash
git checkout feat/mein-feature # in branch feat/mein-feature wechseln
git rebase main # alle Änderungen vom Branch main übernehmen und eigene hinten anstellen
```

Der Unterschied liegt darin wie die Commits sortiert sind. Rebase garantiert,
dass die eigenen Commits **zeitlich nach** den Commits von `main` angefügt
werden.

- Dies hat **den Vorteil**, dass alle Commits im Feature-Branch hintereinander
  aufgelistet sind.
- Dies hat **den Nachteil**, dass die Git "History" geändert wurde und man
  gezwungen ist mit `--force` die Änderungen nach GitHub zu pushen!

```bash
git push origin feat/mein-feature --force-with-lease
```

:::danger

Nie nach `main` mit `--force` pushen!

:::

:::tip

- Der Nachteil überwiegt, da böse Dinge passieren können, somit empfehle ich
  immer `git merge` vorzuziehen.
- Wenn Ihr sowieso nur ein Feature in einem Pull-Request habt, könnt Ihr auch
  **[Squash and Merge](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github#squashing-your-merge-commits)**
  konfigurieren. So generiert GitHub nach dem Merge genau ein Commit uns stellt
  diesen nach hinten.

:::
