---
marp: true
theme: bbzbl
paginate: true
header: Modul 324 - CD
footer: BBZBL / Lukas Hodel / DevOps-Prozese mit Tools unterstützen
---

<!-- _class: big center -->

# Continious Delivery

---

# Provisionieren mit Terraform

```mermaid
flowchart LR
    subgraph AWS["AWS Infrastructure"]
        EC2[AWS EC2<br/>Ubuntu VM]
        DockerReg[Docker Registry<br/>on EC2]
        SG[Security Groups]
        NETWORK[Network Config]
    end

    subgraph Process["Github Action"]
        TerraformInit[Terraform Init]
        TerraformPlan["Terraform Plan"]
        TerraformApply[Terraform Apply]
    end

    TerraformInit --> TerraformPlan
    TerraformPlan --> TerraformApply
    TerraformApply --> EC2
    TerraformApply --> NETWORK
    TerraformApply --> SG
    TerraformApply --> DockerReg
```

---

# Deployment mit Kamal

```mermaid width=730px
flowchart TD

    subgraph GitHubAction - deploy.yml
      DOCKER@{ shape: rounded, label: "docker build" }
      KAMAL@{ shape: rounded, label: "kamal deploy" }
    end

    subgraph AWS
      VM[aws_instance - ubuntu2404]
      APP([Application Container])
      PROXY([KAMAL PROXY Container])
      REG[(aws_ecr_repository - myecr)]
    end

    DOCKER -.-> KAMAL

    DOCKER -->|SSH push image| REG
    KAMAL -->|SSH deploy| VM
    VM -->|docker run| APP
    VM -->|docker pull image| REG

    Users[Users] -->|HTTPS| PROXY
    PROXY -->|HTTP| APP

  %% SSH Tunnel Verbindungen grün färben
    linkStyle 2 stroke:#00aa00,stroke-width:3px,color:#00aa00
    linkStyle 1 stroke:#00aa00,stroke-width:3px,color:#00aa00

    %% Legende
    L1>"SSH Tunnel"]
    style L1 fill:#eaffea,stroke:#00aa00,stroke-width:2px,color:#000
```

---

# Deployment mit Kamal (local Registry)

````mermaid width=730px
flowchart TD

    subgraph GitHubAction - deploy.yml
      DOCKER@{ shape: rounded, label: "docker build" }
      KAMAL@{ shape: rounded, label: "kamal deploy" }
      REG[(Local Docker Registry - localhost:5000)]
    end

    subgraph AWS
      VM[aws_instance - ubuntu2404]
      PROXY([KAMAL PROXY Container])
      APP([Application Container])
    end

    DOCKER -.-> KAMAL

    DOCKER -->|push image| REG
    KAMAL -->|**SSH** deploy| VM
    VM -->|docker run| APP
    VM -->|**SSH** docker pull image| REG

    Users[Users] -->|HTTPS| PROXY
    PROXY -->|HTTP| APP

    style REG fill:#ffcc66,stroke:#cc6600,stroke-width:4px,color:#000

    %% SSH Tunnel Verbindungen grün färben
    linkStyle 2 stroke:#00aa00,stroke-width:3px,color:#00aa00
    linkStyle 4 stroke:#00aa00,stroke-width:3px,color:#00aa00

    %% Legende
    L1>"SSH Tunnel"]
    style L1 fill:#eaffea,stroke:#00aa00,stroke-width:2px,color:#000
```
