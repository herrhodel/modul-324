---
sidebar_position: 2
keywords:
  - pdf
---

# Kamal Konfigurieren

Im Musterbeispiel verwenden wir [kamal](https://kamal-deploy.org) um die
Applikation zu einer EC2 Virtuellen Instanz auf AWS zu deployen.

Natürlich hätte AWS viele andere Möglichkeiten eine App zu deployen. Diese sind
jedoch alle AWS spezifisch und erschweren das Portieren. Das Modul hat den
Anspruch, Techniken zu vermitteln, welche Open-Source sind und es Euch
ermöglicht das Wissen ohne teure Lizenzen auch privat oder im Geschäft
anzuwenden.

## Was ist kamal?

> [Kamal](https://kamal-deploy.org) offers zero-downtime deploys, rolling
> restarts, asset bridging, remote builds, accessory service management, and
> everything else you need to deploy and manage your web app in production with
> Docker. Originally built for Rails apps, Kamal will work with any type of web
> app that can be containerized.

<details>
  <summary>Video zu Kamal vom Erfinder</summary>
  <YouTube id="QC4b2teG_hc" />
</details>

## Neuer Branch erstellen

Wie immer, wenn man ein neues Feature entwickelt sollte dies in einem neuen
Branch geschehen.

`git checkout -b feat/kamal`

## Kamal Dateien kopieren

Auch für Kamal existieren bereits die Dateien der
[Musterlösung](https://github.com/herrhodel/modul-324-muster/tree/main/kamal),
wie davor von Terraform.

- Kopiert nun den gesamten Ordner
  [`kamal`](https://github.com/herrhodel/modul-324-muster/tree/main/kamal)

## GitHub Action starten

Nun könnt Ihr die Action "Setup Infrastructure on Amazon AWS" erneut starten.
Dieses Mal sollte auch der Job "Bootstrap Kamal on AWS EC2 instance"
funktionieren, da nun die Kamal Konfiguration existiert.

:::info

Wer das Video geschaut hat, sieht das DHH die Befehle direkt lokal, im Terminal,
ausführt. Dies wäre auch möglich, wenn Ihr die Credentials auf euren Rechner
kopiert und lokal auch Kamal installiert. Wir führen die Befehle direkt in einer
GitHub Action aus, sodass es garantiert überall funktioniert.

- https://github.com/herrhodel/modul-324-muster/blob/main/.github/workflows/aws-infrastructure.yml#L80-L96

:::
