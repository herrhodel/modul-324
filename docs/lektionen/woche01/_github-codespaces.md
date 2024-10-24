---
sidebar_position: 4
draft: true
keywords:
  - pdf
---

# Github Codespaces

- Open in CodeSpaces
- Warten bis gestartet
- Ordner `local-template`` in `local` umbenennen
- die Credentials und der ssh-key übertragen

Mit ssh auf server zugreifen

```bash
ssh -o IdentityAgent=none -i local/ssh/id_rsa.pem ubuntu@mit-private-ip-ersetzen
```

### AWS cli test

```bash
aws describe-instances
```

### Terraform testen

```bash
cd terraform
sh deploy.sh
```

### Kamal testen

1. `kamal/deploy.yml` öffnen
2. folgende Linien auskommentieren

   ```yaml
   # keys_only: true
   # keys: ["~/.ssh/id_rsa.pem"]
   ```

3. Kamal ausführen

   ```bash
   cd kamal
   kamal setup
   ```

### HTML Seite verändern!

1. `src/index.html` öffne n
2. eine beliebige Änderung vornehmen
3. Commiten
4. Warten bis GitHub actions alles deployed haben
5. 🪄
