---
sidebar_position: 3
keywords:
  - pdf
---

# Nginx Beispiel App

Das Modul verfolgt das Prinzip, **_make-it-work_, _then-make-it-yours_**. Dies
heisst es existiert ein funktionsfähiges, minimales Beispielprogramm. In diesem
Fall ist es ein einfachen [nginx](https://nginx.org/en/) Webserver, welcher über
ein GitHub Template Repository von jedem Lernenden geklont und dann individuell
angepasst wird.

:::tip Ziel

- Das Ziel vom Modul ist es, dass jeder mindestens diese Beispiel App verstanden
  hat 🥳

:::

## Aufgaben

### Das Template `bbzbl-modul-324-nginx` klonen

- In den GitHub Account einloggen
- [https://github.com/codingluke/bbzbl-modul-324-nginx](https://github.com/codingluke/bbzbl-modul-324-nginx)
  aufrufen
- "Use this Template" -> "Create a new repository" wählen
  ![github_create_repository_from_template](../img/github_create_repository_from_template.png)
- Formular ausfüllen
  ![Github Create New Repository](../img/github_create_new_repository.png)
  - Der Name dürft Ihr selber wählen.
  - Bitte **"Private"** auswählen, später mir (codingluke) berechtigen
  - Mit **"Create Repository"** bestätigen

### AWS Credentials in Repository Environment Variablen übertragen

- Im neu erstellten Repository auf **"Settings" -> "Secrets and variables" ->
  "Actions"** navigieren
- Auf **"New Repository secret"** klicken
  ![GitHub Repository Secret](../img/github_create_secrets.png)
- Für alle Einträge unter **"AWS Details"** ein Secret erstellen, es sollten **5
  Secrets** existieren
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - AWS_SESSION_TOKEN
  - AWS_SSH_PRIVATE_KEY
    ![GitHub AWS Secrets Map](../img/github_copy_secrets.png)
  - AWS_ACCOUNT_ID
    ![GitHub AWS Secrets Account](../img/github_ceate_secrets_account_id.png)

### GitHub Action neu starten

Es wird automatisch, bei einer Änderung auf dem Branch `main` eine
[GitHub Action](https://docs.github.com/en/actions) gestartet. Diese ist
garantiert rot, da die Secrets gefehlt haben.

Nun, da diese übertragen wurden, können wir die Action neu starten.

- Nach **"Actions"** navigieren
- Die fehlgeschlagene Action **"Inital commit"** auswählen
  ![GitHub Action initial commit](../img/github_restart_initial_commit_action.png)
- **"Re-run jobs"** starten
  ![GitHub Action re-run](../img/github_rerun_jobs.png)
- **Warten, und warten** bis...
  ![GitHub Action success](../img/github_success_action.png)

### Webseite in Browser öffnen

Nun ist die Web-App auf AWS ausgeliefert und öffentlich verfügbar.

- Kopiert die Public-IP ganz am Ende vom "output".
  ![GitHub Action success](../img/github_success_action.png)
- öffnet in einem Browser "http://eure-ip"
  ![Public Website](../img/nginx_webseite_public.png)

:::info HTTP ist unsicher...

- Es handelt sich um **http** und nicht httpswenn
- Wenn euer Browser motzt, evt. Firefox verwenden.

:::

### HTML bearbeiten

Nun ist es möglich Änderungen an der App vorzunehmen, welche automatisch auf AWS
deployed werden!

- Navigiert zu **"Code -> src -> index.html"** und klickt auf **"Edit"**
  ![Edit index.html](../img/github_edit_index_html.png)
- Ändere die Seite nach belieben ab
  ![Magic](../img/github_edit_index_magic.png)

  :::tip Beispiel Änderung

  ```html
  <img
    src="https://media1.tenor.com/images/b5c0aaca498dd84fa218239572165129/tenor.gif?itemid=5025891"
  />
  ```

  :::

- Änderungen "commiten". Die Nachricht ist noch nicht wichtig.
  ![Commit](../img/github_edit_index_html_commit.png)
- Warten bis die GitHub Actions fertig sind
  ![Commit Action](../img/github_edit_index_html_action.png)

