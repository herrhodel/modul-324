# Editorconfig

Angular hat für uns automatisch eine Datei `.editorconfig` erstellt. Die Datei
`.editorconfig` ist ein IDE-übergreifenden Standard der zum Ziel hat, dass egal
wo der Code geschrieben wird, gewisse basics eingehalten werden.

:::note

VS Code kennt `.editorconfig` durch das Plugin
[EditorConfig for VS Code](/docs/lektionen/woche02/aufgabe-install-tools.md#editorconfig-for-vs-code)

:::

Es kann pro Dateityp Standards spezifiziert werden, wie z.B. Angular hier macht.

```editorconfig title="/app/.editorconfig"
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

### Line Endings

Das generierte `.editorconfig` definiert leider nicht die `end_of_line = lf`. Da
wir Windows und Linux Rechner haben,
[und diese unterschiedliche Metazeichen für Zeilenumbrüche besitzen](https://www.qftest.com/doc/manual/de/tech_linebreaks.html),
ergänzen wir das `.editorconfig` noch mit `end_of_line = lf`. Damit verwendet
auch Windows LineFeed und nicht CarriageReturn/LineFeed.

:::note

Fehlt diese Information, habt Ihr bei jedem bearbeiten von Windows resp. Linux
all diese Metazeichen im Pull-Request. Zudem haben shell Scripte mühe mit
Windows Lineendings.

:::

```editorconfig title="/app/.editorconfig"
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
//highlight-green-next-line
end_of_line = lf

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

## Für das ganze Repo verwenden.

Damit diese Einstellungen nicht nur für Angular, sondern das gesamte repo
gelten, kopieren wir die Datei `.editorconfig` von `/app/.editorconfig` nach
`/.editorconfig` also direkt ins Root-Verzeichnis.
