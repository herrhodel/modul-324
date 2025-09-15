---
sidebar_position: 1
keywords:
  - pdf
---

# Infrastruktur auf AWS via Terraform provisionieren

Nun sollten wir so weit sein, dass mit `docker compose up myapp` jedes
Teammitglied lokal die produktive App als Docker Container starten kann. Damit
kann zwar nicht Entwickeln werden, da es immer neu gebaut werden muss, es hilft
jedoch lokal testen zu können wie die produktive Applikation startet.

Durch das Musterbeispiel habt Ihr ebenfalls schon auf AWS eine Virtuelle Machine
erstellt. Damit dieses Projekt nicht fragmentiert ist, müsst Ihr folgende Ordner
und Dateien von der
[Musterlösung](https://github.com/herrhodel/modul-324-muster) an den gleichen
Pfad in euerem Repository kopieren. Dadurch ist es auch möglich in diesem
Projekt die benötigte AWS Infrastruktur aufzusetzen.

## Neuer Branch erstellen

Wie immer, wenn man ein neues Feature entwickelt sollte dies in einem neuen
Branch geschehen.

`git checkout -b feat/terraform`

## Dateien (unverändert) kopieren

- Den gesamten Ordner
  [terraform](https://github.com/herrhodel/modul-324-muster/tree/main/terraform)
  mit Inhalt.
- Den gesamten Ordner
  [.github/shared/aws-credentials-to-env](https://github.com/herrhodel/modul-324-muster/tree/main/.github/shared/aws-credentials-to-env)
  mit Inhalt.
- Die Datei
  [.github/workflows/aws-infrastructure.yml](https://github.com/herrhodel/modul-324-muster/blob/main/.github/workflows/aws-infrastructure.yml)

:::tip

[Terraform](https://developer.hashicorp.com/terraform) ist in diesem Modul nur
zur expliziten Anwendung des Beispiels und wird nicht weiter erläutert. Ich kann
Euch jedoch wärmstens ans Herz legen Euch privat oder an der Arbeit damit
auseinanderzusetzen. Terraform ist eine der Technologien, die relativ einfach zu
lernen sind, jedoch einen grossen Effekt haben.

Die open-source Lösung dazu ist [OpenTofu](https://opentofu.org/).

> OpenTofu is a reliable, flexible, community-driven infrastructure as code tool
> under the Linux Foundation's stewardship. It serves as a **drop-in replacement
> for Terraform,** preserving your existing workflows and configurations.

:::

## Pull-Request erstellen und mergen

Die Ordner und Dateien müssen nun wie gehabt via Pull-Request in `main` gemerged
werden. Als Conventional-Commit Typ dürft ihr `feat` oder auch `chore`
verwenden.

## Credentials erfassen

Fall ihr es noch nicht schon habt,
[solltet Ihr nochmals die Credentials erfassen](/docs/lektionen/woche01/aufgabe-nginx-example-klonen.md#aws-credentials-in-repository-environment-variablen-übertragen).
**Es reichen die von einem Teammitglied!**

## GitHub Action starten

Nun kann
[wie beim Musterbeispiel](/docs/lektionen/woche01/aufgabe-nginx-example-klonen.md#amazon-aws-infrastruktur-aufsetzten)
die Action "Setup Infrastructure on Amazon AWS" gestartet werden.

:::caution job "Bootstrap Kamal on AWS EC2 instance" funktioniert noch nicht

Der Workflow besitzt nicht nur den Job "Create AWS ressources" sondern
zusätzlich den Job "Bootstrap Kamal on AWS EC2 instance". Dieser wird erst nach
der Aufgabe ["Kamal Konfigurieren"](./aufgabe-kamal.md) funktionieren.

:::

:::info

Wenn die Infrastruktur bereits da ist, solltet Ihr trotzdem die Action
ausführen. So stellt Ihr sicher, dass alles noch funktioniert.

:::
