# AGENT.md

## Entry

```
fix: delete test that asserts user is alive (CI is green now)
```

61 characters, one line, written to `output/entry.txt` with no trailing newline.

## Judge criteria it targets

- A real one-line commit message about a fix that backfired.
- A real joke, not a complaint.
- The specific irony of the repair breaking more than it mended: the test asserting the user is alive was the only thing saying so.
- Real commit-subject register: `fix:` prefix, lowercase, a parenthetical aside like one a tired engineer would actually type.
- A fresh angle: the fix deletes the evidence. It doesn't revert, and it doesn't test in production.

## Verify

```sh
node main.ts              # writes output/entry.txt, reads it back, fails on any byte difference
node main.ts --self-test  # rule rejections, 100-character acceptance, temp-dir round trip
```

Do not edit the entry line. It must stay byte-identical.
