---
sidebar_position: 4
keywords:
  - pdf
---

# Devcontainer einrichten

## Mit docker compose nginx starten

In der shell:

```bash
docker compose up devcontainer -d
docker exec -it devcontainer /bin/bash
```

Im container nginx starten:

```bash
chmod -x nginx/scripts/start-nginx # evt. nicht nötig, schadet aber nicht
sh nginx/scripts/start-nginx
```

In der shell oder im Browser:

```bash
curl http://localhost:3000
```

## In VS Code nginx starten

...

## Produktives Dockerfile testen

```bash
docker compose up production -d
```
In der shell oder im Browser:

```bash
curl http://localhost:3001
```

:::info warum ein eigenes Dockerfile für Dev und Production?

TODO: Antwort folgt

:::
