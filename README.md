# Recap Project 4: Theme Creator

In this project, you will create an interactive Color Theme Creator app.

This is an individual project, so please create new project following this [guide to setup your repository](./docs/github-respository-template.md).

## Overview

In this project, we will create an Color Theme Creator app.
Users can add new color theme, edit and delete them. They can also copy the color hexa code of it.

![wireframes](./docs/wireframes.excalidraw.png)

## API

For issue `#7: Fetch API to Check If Contrast Is Okay`, you will be using [are my colors accessible api](https://www.aremycolorsaccessible.com/api-page).

```bash
https://www.aremycolorsaccessible.com/api-page
```

## Development

Requirements: Node 24 (`fnm use`) and [pnpm](https://pnpm.io/installation) 12. npm is blocked in this project.

```bash
pnpm install
pnpm dev
```

- `pnpm build` to build the app
- `pnpm test` to run the tests (`pnpm test:watch` in watch mode)
- `pnpm lint` / `pnpm lint:fix` to run ESLint
- `pnpm format` / `pnpm format:check` to run Prettier
- `pnpm typecheck` to check the types
- `pnpm check` to run lint, format check and typecheck
- `pnpm sync` to switch to `main`, pull and install dependencies
- `pnpm sync:branch` to merge `main` into the current branch (without committing) and install dependencies
