# Worst Fix Ever: Funniest Commit Message

> `fix: delete test that asserts user is alive (CI is green now)`

Bounty: [Worst Fix Ever: Funniest Commit Message](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)

[![make.fun bounty](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)
[![make.fun rank](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/emasinves0-commits/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/rank.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)
[![make.fun reward](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/emasinves0-commits/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/reward.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)

## The joke

The test said the user was alive. The test was failing, so the user wasn't. The fix deletes the test.

CI goes green because the witness is gone. The repair kills the evidence, not the bug, and the bug is now much worse than a red build.

## What main.ts does

`main.ts` is a dependency-free Node script (built-ins only). It:

1. Holds the entry line as a constant.
2. Validates it against a small rule table: not blank, at most 100 characters, single line with no line breaks.
3. Writes it to `output/entry.txt` with no trailing newline.
4. Reads the file back and fails if the bytes differ.

`--self-test` checks that each bad input is rejected by the intended rule, that a 100-character entry is accepted, and that the real entry round-trips byte-identical through a temp directory.

## Run it

Requires a Node version that can run `.ts` files directly (Node 22.6+ with type stripping, or Node 24+).

```sh
node main.ts              # writes output/entry.txt
node main.ts --self-test  # runs the checks
```

## License

MIT, see [LICENSE](LICENSE).
