### Features

- 🍒 Integrated [Naive UI](https://www.naiveui.com)，recommended by Evan You.
- 🍑 Integrated login, logout and permission verification.
- 🍐 Integrated multi-environment configuration, dev, test, production and github pages environments.
- 🍎 Integrated `eslint + prettier`.
- 🍌 Integrated `husky + commitlint`.
- 🍉 Integrated `Mock`.
- 🍍 Integrated `pinia`，lightweight, simple and easy to use alternative to vuex.
- 📦 Integrated `unplugin` auto import.
- 🍇 Integrated `unocss`.


### Docs

[Vue Naive Admin Docs](https://zclzone.github.io/vue-naive-admin-docs)


### Getting Started

```shell
# Install dependencies(Recommended use pnpm: https://pnpm.io/zh/installation)
npm i -g pnpm # Installed and can be ignored
pnpm i # or npm i

# Start
pnpm dev
```

### Build and Release

```shell
# Test Environment
pnpm build:test

# Github Environment
pnpm build:github

# Prod Environment
pnpm build
```

### Other

```shell
# eslint check
pnpm lint

# eslint check and fix
pnpm lint:fix

# Preview（Need to build first）
pnpm preview

# Commit（husky+commitlint）
pnpm cz
```
