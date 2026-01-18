# GitHub Workflows

This directory contains automated workflows for LinkNote.

## Workflows

### 🔧 CI (Continuous Integration)
**File:** `ci.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**What it does:**
- Lints JavaScript, HTML, and CSS
- Validates package.json
- Builds the project
- Checks bundle sizes
- Tests on Node.js 20.x and 25.x
- Uploads build artifacts

**Status Badge:**
```markdown
![CI](https://github.com/ngroegli/linknote/workflows/CI/badge.svg)
```

---

### 🔒 Security
**File:** `security.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Scheduled: Every Sunday at 2 AM UTC
- Manual trigger

**What it does:**
- Runs `npm audit` for dependency vulnerabilities
- Checks for exposed secrets in code
- Validates dependency licenses
- Runs CodeQL analysis
- Creates GitHub issues for vulnerabilities found during scheduled scans
- Generates security reports

**Alerts:**
- High/critical vulnerabilities will fail the workflow
- Scheduled scans create issues automatically

**Status Badge:**
```markdown
![Security](https://github.com/ngroegli/linknote/workflows/Security/badge.svg)
```

---

### 🚀 Release
**File:** `release.yml`

**Triggers:**
- Push of version tags (e.g., `v1.0.0`, `v2.1.3`)
- Manual trigger with version input

**What it does:**
- Validates version format
- Runs security audit
- Builds production bundle
- Creates distribution ZIP
- Generates SHA256 checksums
- Creates GitHub Release with changelog
- Uploads release assets

**Usage:**

#### Option 1: Git Tag (Recommended)
```bash
# Create and push a version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

#### Option 2: Manual Trigger
1. Go to Actions → Release workflow
2. Click "Run workflow"
3. Enter version (e.g., `1.0.0`)
4. Optionally mark as pre-release
5. Run workflow

**Version Format:**
- Standard: `X.Y.Z` (e.g., `1.0.0`, `2.1.3`)
- Pre-release: `X.Y.Z-tag` (e.g., `1.0.0-beta`, `2.0.0-rc1`)

**Status Badge:**
```markdown
![Release](https://github.com/ngroegli/linknote/workflows/Release/badge.svg)
```

---

## Local Testing

### Test CI locally
```bash
# Install dependencies
npm ci

# Run build
npm run build

# Check for issues
npm audit
```

### Test Security locally
```bash
# Run audit
npm audit --audit-level=moderate

# Check for high/critical issues
npm audit --audit-level=high

# Check licenses
npx license-checker --summary
```

### Prepare Release locally
```bash
# Build production
npm run build

# Create archive
cd dist && zip -r ../linknote-dist.zip . && cd ..

# Generate checksum
sha256sum linknote-dist.zip > linknote-dist.zip.sha256
```

---

## Workflow Artifacts

Workflows generate artifacts that are stored temporarily:

- **CI:** Build outputs (7 days retention)
- **Security:** Security and license reports (30 days retention)
- **Release:** Distribution archives (90 days retention)

Access artifacts from the Actions tab on GitHub.

---

## Required Secrets

No secrets are required for these workflows. They use the default `GITHUB_TOKEN` automatically provided by GitHub Actions.

---

## Branch Protection

Recommended branch protection rules for `main`:

- ✅ Require status checks to pass (CI, Security)
- ✅ Require pull request reviews
- ✅ Require conversation resolution
- ✅ Include administrators

---

## Troubleshooting

### Workflow fails on "npm ci"
→ Delete `package-lock.json` and run `npm install` locally, then commit

### Security workflow creates too many issues
→ Adjust schedule in `security.yml` or disable auto-issue creation

### Release fails on tag push
→ Ensure version format is correct: `vX.Y.Z`

### CodeQL analysis times out
→ This is rare but can happen on large codebases. Adjust timeout in workflow if needed.

---

## Contributing

When contributing, ensure:
- CI passes before requesting review
- No security vulnerabilities introduced
- Follow semantic versioning for releases

---

## Status Badges

Add to README.md:

```markdown
![CI](https://github.com/ngroegli/linknote/workflows/CI/badge.svg)
![Security](https://github.com/ngroegli/linknote/workflows/Security/badge.svg)
![Release](https://github.com/ngroegli/linknote/workflows/Release/badge.svg)
```
