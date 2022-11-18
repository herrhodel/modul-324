# CI / CD

## Continious Integration

### Automatisierungstools

- [Github Actions](https://docs.github.com/en/actions)
- [Jenkins](https://www.jenkins.io)
  - [How to Install and Run Jenkins With Docker Compose](https://www.cloudbees.com/blog/how-to-install-and-run-jenkins-with-docker-compose)

### Image bauen

- [Dockerfile](https://docs.docker.com/engine/reference/builder/)
- [`docker build`](https://docs.docker.com/engine/reference/commandline/build/)

### In Registry pushen 

- [`docker push`](https://docs.docker.com/engine/reference/commandline/push/)
- [`npm publish`](https://docs.npmjs.com/cli/v6/commands/npm-publish)

## Continious Delivery

**[Docker Compose](https://docs.docker.com/compose/compose-file/)**

- Build image with Github Action oder Jenkins
- Ändere das `docker-compose.yaml` um das neuste Image zu verwenden
- SSH in prod system `git pull` restart compose
  - [Docker Compose Continuous Deployment setup](https://stackoverflow.com/a/42302633)
