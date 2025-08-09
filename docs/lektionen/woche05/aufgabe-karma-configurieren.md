---
sidebar_position: 3
keywords:
  - pdf
---

# Karma Konfiguration

Um Karma Browser Tests im Dockerfile laufen zu lassen, braucht es die Option
einen sogenannten "Headless Browser" zu verwenden. Am gängigsten ist der
ChromeHeadless. Damit dieser von Karma verwendet wird, muss folgende
Konfiguration erstellt werden.

## Neuer Branch erstellen

Wie immer, wenn man ein neues Feature entwickelt sollte dies in einem neuen
Branch geschehen.

`git checkout -b feat/karma-config`

## Karma config generieren

Als erstes muss die Karma configuration generiert werden, damit diese angepasst
werden kann. Ohne diesen Schritt wird automatisch immer die
Standardkonfiguration verwendet. Nach dem folgenden Befehl sollte die Datei
`./karma.conf.js` zur Verfügung stehen.

```bash
ng generate config karma
```

## ChromeHeadlessNoSandbox launcher hinzufügen

Als nächstes muss ein neuer `customLaunchers` erstellt werden. Damit wird Karma
gesagt, wie genau der Browser gestartet werden soll. Es gibt bereits den
"ChromeHeadless", welcher kein GUI Browser öffnet, sondern ein Browser als CLI
Befehl verwendet.

Da wir jedoch im Dockerfile arbeiten, und der ChromeHeadless root access
braucht, müssen wir noch den Parameter `--no-sandbox` hinzufügen. Wieso jetzt
genau ist nicht so wichtig, kopiert einfach den grünen Teil in der Datei
`karma.conf.js` direkt nach dem Key `browsers`. Dieser launcher heisst nun
`ChromeHeadlessNoSandbox`.

```js title="karma.conf.js"
//...
    browsers: ['Chrome'],
// highlight-green-start
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
// highlight-green-end
    restartOnFileChange: true
//...
```

## Script `test:ci` im package.json definieren

Als letztes muss in der Datei `package.json`, unter `scripts` ein neues script
namens `test:ci` hinzugefügt werden. Dieses startet die tests mit dem oben
erstellten "Laucher" `ChromeHeadlessNoSandbox`. Auch wird mitgeteilt, dass kein
Ladebalken ausgegeben werden soll und auch nicht auf Dateiänderungen gehört
werden soll.

Der Befehl `npm run test:ci` wird später verwendet um die Tests in der CI
Pipeline laufen zu lassen.

```json title="package.json"

  "scripts": {
    "//": "..."
    "test": "ng test",
    // highlight-green-next-line
    "test:ci": "ng test --no-watch --no-progress --browsers=ChromeHeadlessNoSandbox",
    "//": "..."
  },
```
