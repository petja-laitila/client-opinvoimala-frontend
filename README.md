# Frontend for Opinvoimala

React project bootstrapped with [Create React App](https://github.com/facebook/create-react-app) & [Typescript](https://www.typescriptlang.org/docs/home.html).

**Relevant links**:

- [MobX state tree](https://mobx-state-tree.js.org/)
- [Styled components](https://styled-components.com/docs/basics)
- [Semantic UI](https://react.semantic-ui.com/)
- [React-i18next](https://github.com/i18next/react-i18next)
- [Prettier](https://prettier.io/docs/en/index.html)

## Commands

```sh
# Install dependencies
yarn

# Run dev version
yarn start

# Build production version
yarn build
```

## Branches

- `dev` - Finished features
- `stage` - Staging version
- `master` - Production version

## Digital Ocean deploy

### Upgrade stage

Create & push new tag `*-stage` (e.g. yyyymmdd-HHMM-stage)

```sh
git checkout stage
# Make sure that all changes are merged into stage
git tag [tag]
git push origin stage --tags
```

### Upgrade production

Create & push new tag `*-production` (e.g. 0.0.1-production)

```sh
git checkout master
# Make sure that all changes are merged into master
git tag [tag]
git push origin master --tags
```
