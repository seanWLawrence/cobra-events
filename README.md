# Cobra Events

> This project is a work in progress

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

An open source event management system.

## Tenets

- No percentage-based or confusing fees for organizers or buyers
- No option to resale for higher cost than originally paid
- Accessibility and performance are top priorities
- Configurable and simple to deploy

## Getting started

### Install dependencies

This will install the Node.js packages that this application uses to run.

```sh
npm install
```

### Create `.env` file to store configuration values

This file will store all of the conigurable values this project depends on.

```sh
# Create .env file based on the sample
cp sample.env .env
```

### Set configuration file values

The following is a list of each configuration value and what they're used for.

- `GITHUB_TOKEN` - access token for `release-please` to create releases on your repository.
- `GITHUB_OWNER` - owner of the GitHub repository
- `GITHUB_REPO` - name of the GitHub repository

### Bootstrap release-please

Release please is a package that manages releases for your application. In essence, it creates a release pull request that gathers all of your changes since the last release from your conventional git commit messages. Then it creates a GitHub release, updates the `CHANGELOG.md` file, tags your commit and increments your `package.json`'s version number when you merge into the `main` branch.

This command sets up the GitHub repository with a manifest file that the tool uses when it runs in GitHub Actions.

```sh
./scripts/release-bootstrap.mjs
git pull
```

## License

MIT
