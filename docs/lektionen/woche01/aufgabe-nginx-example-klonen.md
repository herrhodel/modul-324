---
sidebar_position: 3
keywords:
  - pdf
---

# Web-Applikation Template Repository

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

### Das Template `bbzbl-modul-324-template` klonen

- In den GitHub Account einloggen
- [https://github.com/codingluke/bbzbl-modul-324-template](https://github.com/codingluke/bbzbl-modul-324-template)
  aufrufen
- "Use this Template" -> "Create a new repository" wählen
  ![github_create_repository_from_template](../../img/github_create_repository_from_template.png)
- Formular ausfüllen
  ![Github Create New Repository](../../img/github_create_new_repository.png)
  - Der Name dürft Ihr selber wählen.
  - Bitte **"Private"** auswählen, später mir (codingluke) berechtigen
  - Mit **"Create Repository"** bestätigen

### AWS Credentials in Repository Environment Variablen übertragen

- Im neu erstellten Repository auf **"Settings" -> "Secrets and variables" ->
  "Actions"** navigieren
- Auf **"New Repository secret"** klicken
  ![GitHub Repository Secret](../../img/github_create_secrets.png)
- Für alle Einträge unter **"AWS Details"** ein Secret erstellen, es sollten **5
  Secrets** existieren
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - AWS_SESSION_TOKEN
  - AWS_SSH_PRIVATE_KEY
    ![GitHub AWS Secrets Map](../../img/github_copy_secrets.png)
  - AWS_ACCOUNT_ID
    ![GitHub AWS Secrets Account](../../img/github_ceate_secrets_account_id.png)

### Berechtigungen setzen

1. Im neu erstellten Repository auf **"Settings" -> "Actions" -> "General"**
   navigieren
2. Ganz nach unten scrollen
3. **"Allow GitHub Actions to create and approve pull requests"** erlauben

![github_action_pull_request_permissions](images/github_action_pull_request_permissions.png)

:::info

- Diese Berechtigung ist wichtig, dass automatisch Pull-Request erstellt werden
  können, was die Automatisierung von Releases ermöglicht.
- Mehr dazu nächste Woche.

:::

### Amazon AWS Infrastruktur aufsetzten

Es existiert eine GitHub Action
[Setup Infrastructure on Amazon AWS](https://github.com/codingluke/bbzbl-modul-324-template/blob/main/.github/workflows/aws-infrastructure.yml)

:::caution

- Diese kann manuell gestartet werden.
- Da die Action sich mit Amazon verbindet, müssen **zuerst die Credentials
  übertragen** sein.

:::

Danach die Action folgendermassen gestartet werden:

1. Nach **"Actions"** navigieren
2. **"Setup Infrastructure on Amazon AWS"** auswählen
3. **"Run workflow"** auswählen

![GitHub Action initial commit](../../img/github_restart_initial_commit_action_v2.jpg)

Nun wird ein Workflow mit zwei Steps gestartet:

- der Erste "Create AWS Resourcen" erstellt alle AWS Resourcen, d.H. die Ubuntu
  VM und co.
- der Zweite "Bootstrap Kamal on AWS EC2 instance" installiert die nötigen tools
  in der Ubuntu VM

![github_start_aws_infrastructure](images/github_start_aws_infrastructure.png)

- Wenn alles grün ist (hoffentlich :sweat_smile:) sollte die Umgebung parat
  sein, dass Docker-Images deployed werden können.

### Nginx Image bauen und ausliefern (deployen)

Ist die AWS Umgebung aufgesetzt, kann die Action "Deploy to Amazon AWS" analog
gestartet werden.

1. **"Deploy to Amazon AWS"** auswählen
2. **"Run workflow"** auswählen

![github_action_deploy_to_amazon](images/github_action_deploy_to_amazon.png)

3. Warten bis das Deployment geklappt hat
4. Nun sollte einen Link "Visit me on http://public-ip :rocket:" sichtbar sein

![github_action_deploy_to_amazon_success](images/github_action_deploy_to_amazon_success.png)

### Webseite in Browser öffnen

Nun ist die Web-App auf AWS ausgeliefert und öffentlich verfügbar.

:::caution HTTP ist unsicher...

- Es handelt sich um **http** und nicht https!
- Wenn euer Browser motzt, evt. Firefox verwenden.

:::

![Public Website](../../img/nginx_webseite_public.png)

### HTML bearbeiten

Nun ist es möglich Änderungen an der App vorzunehmen, welche automatisch auf AWS
deployed werden!

- Navigiert zu **"Code -> nginx -> src -> index.html"** und klickt auf **"Edit"**
  <!-- ![Edit index.html](../../img/github_edit_index_html.png) -->
  ![github_edit_index_html](images/github_edit_index_html.png)
- Fügt folgenden Tag in den Body ein

  ```html
  <img src="https://media1.tenor.com/images/b5c0aaca498dd84fa218239572165129/tenor.gif?itemid=5025891" />
  ```

- **"Commit changes"**.

  :::caution

  - :boom: Verwendet bitte die Commit-Message `feat(nginx): show some magic`!

  :::

  ![Commit](../../img/github_edit_index_html_commit.png)

- Nun wird automatisch die GitHub Action **"Deploy to Amazon AWS"** gestartet.
- Warten bis die GitHub Action fertig ist
  ![Commit Action](../../img/github_edit_index_html_action.png)

- **:boom: Nun die Webseite refreshen**
