# Ready to Deploy

Nun sollten wir soweit sein, dass mit `docker compose up produciton -d` jedes
Teammitglied lokal die produktive App laufen lassen kann. Dieses Image ist nicht
optimal zum entwickeln, da es immer neu gebaut werden muss. Es hilft jedoch
lokal testen zu können wie die produktive Applikation startet.

Um das Image nach AWS deployen zu können braucht es nun noch folgende
Anpassungen:

- Die Kamal config `./kamal/config/deploy.yml` muss als **service** den gleichen
  Namen besitzen wie das **LABEL** im Dockerfile.
  - Im Beispiel lautet dies `service: neues-ssg-projekt`
- Der GitHub Action Workflow `./github/workflows/deploy.yml` muss das richtige
  Dockerfile builden und pushen
  - Sucht nach dem step **Build and push nginx Image**
  - ändert hier `context: ./nginx` -> `context: ./neues-ssg-projket`

### Zusätzlich muss der Angular App eine Route /up erstellt werden:

:::info SPA Apps die mit NGINX geserved werden könnend diesen Schritt auslassen

:::

Auf AWS existiert ein reverse proxy, welcher die Route `/up` prüft. Diese
ermöglicht ein sogenanntes zero-downtime deployment. Damit dies jedoch klappt
muss die Route auch existieren.

Damit der node server die route `/up` kennt, müsst ihr folgendermassen vorgehen:

- Öffnet die Datei `server.ts` im Projektordner
- Sucht nach `server.set('views'`
- Nach diesem Befehl registrieren wir nun eine GET Route `/up` mit diesem Befehl
  ```typescript
  // Health check route
  server.get("/up", (req, res) => {
    res.status(200).send("OK");
  });
  ```

:::caution

Die Route `/up` muss vor der Wildcard Route `**` gesetzt werden!

:::

## Auf AWS deployen

Wenn ihr nun diese Änderungen via Pull-Request in `main` merged, wird
automatisch ein deployment nach AWS durchgeführt.

:::caution Credentials!

Achtet darauf, dass die Credentials immer wieder übertragen werden müssen!

:::

### Workfile Datei anpassen, damit auch PRs deployed werden


