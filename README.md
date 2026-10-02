# Northstar

Northstar is a fictional six-task board for reproducible
[Roamgate](https://github.com/powerfooI/roamgate) screenshots. The tasks, names,
and workspace are invented. The app uses local assets and needs no account,
external service, analytics, or personal data.

## Run

```sh
git clone https://github.com/powerfooI/northstar-demo.git
cd northstar-demo
bun run test
bun run dev
```

Open `http://127.0.0.1:4317`. Use `bun run dev 4318` to change the preview port.
No package installation is needed. The server bundles TypeScript in memory.

`index.html` includes all six cards, so Roamgate's static HTML preview remains
useful while scripts are blocked. `assets/board-map.svg` is a local image for
file-preview screenshots.

## Status filter demo

`main` contains the title-search baseline. The `codex/status-filter` branch adds
All, To do, In progress, and Done filters, combines status with title search,
and provides an empty state with Clear filters. To run that version:

```sh
git switch codex/status-filter
bun run test
bun run dev
```

The open [pull request](https://github.com/powerfooI/northstar-demo/pulls) and
Bun test workflow provide real GitHub metadata for Roamgate's PR/MR card. On the
machine running Roamgate's bridge, install GitHub CLI and authenticate with
`gh auth login`, then open this checkout on `codex/status-filter` in Roamgate.

The implementation reuses Roamgate's prepared screenshot fixture. It does not
represent a recorded agent run. For capture and privacy instructions, see
[Roamgate's screenshot workflow](https://github.com/powerfooI/roamgate/blob/main/docs/SCREENSHOTS.md).
