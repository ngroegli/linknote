# Dependency Management

## Current Implementation: npm + Vite

LinkNote uses **npm for dependency management** and **Vite for building**. This provides a modern development experience while maintaining privacy and offline-first principles in production.

---

## Dependencies

### Runtime Dependencies

**marked**
- Markdown parser that converts Markdown to HTML
- Well-maintained, widely used
- MIT licensed

**dompurify**
- XSS protection through HTML sanitization
- Removes malicious scripts and unsafe content
- Mozilla-backed, security-focused
- MIT licensed

### Development Dependencies

**vite**
- Modern build tool and dev server
- Fast hot module replacement (HMR)
- Optimized production builds
- Zero-config for most use cases

---

## Why This Approach?

### ✅ Advantages

1. **Clean Repository**
   - Dependencies in `node_modules/` (not committed to git)
   - Only `package.json` and `package-lock.json` tracked
   - Small git footprint

2. **Modern Development**
   - Fast dev server with hot reload (`npm run dev`)
   - ES modules support
   - Optimized builds

3. **Production Ready**
   - All dependencies bundled into `dist/`
   - No external CDN requests at runtime
   - Fully offline after first load
   - Minified and optimized

4. **Easy Maintenance**
   - `npm update` to update dependencies
   - Clear version management via package.json
   - Security audits via `npm audit`

5. **Privacy First**
   - Production build is self-contained
   - No runtime external requests (except Google Fonts)
   - User data never leaves browser

---

## Build Process

### Development
```bash
npm run dev
```
- Starts Vite dev server at http://localhost:3000
- Hot reload on file changes
- Source maps for debugging
- Fast refresh

### Production
```bash
npm run build
```
Creates optimized bundle in `dist/`:
- Minified JavaScript
- Minified CSS
- All dependencies bundled
- Hash-based filenames for caching
- Relative paths for portable deployment

### Preview
```bash
npm run preview
```
- Tests production build locally
- Simulates production environment

---

## Deployment

The `dist/` folder contains everything needed:
```
dist/
├── index.html           # Entry point
├── favicon.svg          # Favicon
├── logo.svg             # Logo
└── assets/              # Bundled assets
    ├── index-[hash].js  # All JavaScript + dependencies
    └── index-[hash].css # All CSS
```

**Deploy to:**
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any static hosting

**No server required** - just static files!

---

## Dependency Update Strategy

### Regular Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update to latest (major versions)
npm install marked@latest dompurify@latest

# Rebuild and test
npm run build
npm run preview
```

### Security Updates
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Review and test
npm run build
```

---

## Why Not CDN?

We **previously considered CDN** but chose npm + bundling for:

### Privacy & Control
- ❌ CDN requires network requests at runtime
- ❌ Third-party dependency for core functionality
- ❌ Potential tracking via CDN
- ✅ npm bundles everything locally
- ✅ Complete control over dependencies
- ✅ True offline-first

### Development Experience
- ❌ CDN has no local development integration
- ❌ Manual version updates
- ✅ npm has automated updates
- ✅ Version locking via package-lock.json
- ✅ Modern tooling integration

### Performance
- ❌ CDN requires DNS lookup, TCP handshake
- ❌ Cannot optimize/tree-shake
- ✅ Bundled code is minified and optimized
- ✅ Single request for all JS
- ✅ Better compression

---

## Alternative Considered: Vendored Files

We also considered **downloading libraries directly** into the repo:

```
src/vendor/
├── marked.min.js
└── purify.min.js
```

### Why We Chose npm Instead:
- ❌ Vendored files bloat git history
- ❌ Manual download and update process
- ❌ No security audit tools
- ❌ Harder to track versions
- ✅ npm keeps repo clean
- ✅ Automated updates and audits
- ✅ Standard modern workflow

---

## Font Dependencies

**Google Fonts** (Montserrat family)
- Loaded via CDN at runtime
- Allows browser to use cached version
- Non-critical - fallback to system fonts
- Could be self-hosted for full offline

To make fonts offline:
```bash
# Download font files
# Add to src/assets/fonts/
# Update CSS to use local fonts
```

---

## Configuration

### package.json
```json
{
  "dependencies": {
    "dompurify": "^3.0.8",
    "marked": "^11.1.1"
  },
  "devDependencies": {
    "vite": "^5.0.11"
  }
}
```

### vite.config.js
```javascript
{
  root: 'src',
  base: './',              // Relative paths
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    copyPublicDir: true
  },
  publicDir: 'assets'
}
```

---

## Future Considerations

### Potential Optimizations
- [ ] Code splitting for faster initial load
- [ ] Service Worker for true offline PWA
- [ ] Self-host Google Fonts
- [ ] Lazy load DOMPurify if not needed immediately

### Dependency Reduction
Currently minimal - only 2 runtime dependencies:
- marked.js (essential for Markdown)
- DOMPurify (essential for security)

Could consider:
- Custom lightweight Markdown parser (complex)
- Alternative sanitizers (DOMPurify is best-in-class)

**Verdict:** Current dependencies are justified and minimal.

---

## Troubleshooting

### "npm: command not found"
→ Install Node.js: https://nodejs.org/

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Outdated dependencies
```bash
npm outdated
npm update
npm audit fix
```

### Large bundle size
- Check `npm run build` output
- Review what's being bundled
- Currently: ~70KB JS (gzipped ~23KB)

---

## Summary

✅ **Modern tooling** - npm + Vite for great DX
✅ **Clean repository** - Dependencies not in git
✅ **Privacy first** - Self-contained production build
✅ **Offline capable** - No runtime external deps
✅ **Easy updates** - `npm update` and done
✅ **Secure** - `npm audit` for vulnerabilities

This approach balances developer experience, user privacy, and modern best practices.
