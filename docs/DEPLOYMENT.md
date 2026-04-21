# Deployment

LinkNote is deployed as a static site to a production web server via FTP using GitHub Actions.

---

## Overview

| Property | Value |
|---|---|
| Production URL | https://linknote.groeg.li |
| Deployment method | FTP (GitHub Actions) |
| Triggered by | Release workflow success or manually |
| Source | `dist/` folder (Vite production build) |
| Deploy strategy | Clean slate (full replacement on every deploy) |

---

## Workflow

The deploy workflow is defined in `.github/workflows/deploy-production.yml`.

### Triggers

**Automatic** — runs after the `Release` workflow completes successfully on `main`. This means every new version tag (`v*`) automatically triggers a production deployment once the release is built.

**Manual** — can be triggered from the GitHub Actions UI:
1. Go to **Actions → Deploy to Production**
2. Click **Run workflow**
3. Enter the tag to deploy (e.g. `v1.0.6`)

### Steps

```
Checkout code
  └── Setup Node.js
        └── Install dependencies (npm ci)
              └── Build project (npm run build)
                    └── Deploy dist/ to server via FTP (clean slate)
                          └── Verify deployment (HTTP check)
                                └── Deployment summary
```

### Clean slate deployment

`dangerous-clean-slate: true` is set intentionally. Vite generates hashed asset filenames (e.g. `index-COaYzZOQ.js`) that change on every build. Without clean slate, old files accumulate alongside new ones on the server. Since `dist/` is always fully rebuilt from source, wiping the remote directory before uploading is safe and keeps the server clean.

---

## GitHub Configuration

### Secrets

Sensitive values stored as GitHub Secrets (masked in logs, never exposed in UI):

| Secret | Description |
|---|---|
| `PROD_FTP_SERVER` | FTP server hostname |
| `PROD_FTP_USERNAME` | FTP username |
| `PROD_FTP_PASSWORD` | FTP password |

### Variables

Non-sensitive connection settings stored as GitHub Variables:

| Variable | Example | Description |
|---|---|---|
| `PROD_FTP_PORT` | `21` | FTP port |
| `PROD_FTP_PROTOCOL` | `ftps` | Protocol (`ftp` or `ftps`) |
| `PROD_FTP_SERVER_DIR` | `/linknote/` | Remote directory to deploy to |

> **Why split between secrets and variables?**
> Credentials (server, username, password) are secrets because they grant access.
> Port, protocol and path are variables — they're non-sensitive and easier to inspect when debugging.

---

## Local Build

To reproduce the production build locally:

```bash
npm install
npm run build
```

The `dist/` folder contains everything that gets deployed:

```
dist/
├── index.html
├── favicon.svg
├── logo.svg
├── robots.txt
├── ai.txt
├── llms.txt
├── .well-known/
│   └── security.txt
└── assets/
    ├── index-<hash>.js
    └── index-<hash>.css
```

---

## Rollback

To roll back to a previous version, trigger the workflow manually:

1. Go to **Actions → Deploy to Production**
2. Click **Run workflow**
3. Enter the previous tag (e.g. `v1.0.5`)

This will check out, build and deploy that exact version to production.
