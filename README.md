# LinkNote

**A privacy-first, client-side-only Markdown editor where your content lives in the URL.**

![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)
![No Backend](https://img.shields.io/badge/backend-none-green.svg)
![Privacy](https://img.shields.io/badge/privacy-first-orange.svg)
![CI](https://github.com/ngroegli/linknote/actions/workflows/ci.yml/badge.svg)
![Security](https://github.com/ngroegli/linknote/actions/workflows/security.yml/badge.svg)

---

## Features

### Core Features

- **Client-side only** - No backend, no server, no database
- **Markdown editor** - Full-featured textarea with live preview
- **Live preview** - Real-time Markdown rendering with marked.js

### Additional Features

- **Copy URL button** - One-click URL copying with fallback
- **Clear button** - Reset document with confirmation
- **Light/dark mode** - CSS-only theme switching with system preference detection
- **URL length warning** - Alerts when URL exceeds 2000 characters
- **Responsive design** - Mobile-friendly layout

### Benefits

- **Zero Server**: Everything runs in your browser—no backend, no database, no API calls
- **Privacy by Design**: Your content never leaves your device
- **URL-based Storage**: All document state is encoded in the URL fragment
- **Live Preview**: See your Markdown rendered in real-time
- **Share Anywhere**: Just copy and share the URL
- **Works Offline**: No internet required after initial load
- **Theme Support**: Built-in light and dark modes
- **No Tracking**: Zero analytics, zero cookies, zero data collection
- **Modern & Minimal**: Clean, responsive interface that works on all devices

---

## Quick Start

### For End Users (No Setup Required)

Open the deployed app and start writing - everything works in your browser!

### For Developers

**First time setup:**

1. Install Node.js (if not already installed):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   source ~/.zshrc
   nvm install --lts
   ```

2. Clone and setup:
   ```bash
   git clone https://github.com/ngroegli/linknote.git
   cd linknote
   npm install
   ```

3. Start development:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

📘 **See [docs/QUICKSTART.md](docs/QUICKSTART.md) for detailed setup instructions**

### Deployment

After running `npm run build`, deploy the `dist/` folder to:
- **GitHub Pages**: Free and easy
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration
- **Any web server**: Just serve the static files

The production build includes all dependencies - no external CDN requests needed!

---

## How to Use

### Writing Markdown

1. Type or paste your Markdown in the left editor pane
2. Watch the live preview appear on the right
3. Your content is automatically encoded into the URL

### Saving Your Work

**There is no "Save" button**—your document IS the URL!

To save your work:
1. Click the **"📋 Copy URL"** button
2. Bookmark the URL, or
3. Share it with others, or
4. Paste it in your notes

When you or anyone else opens that URL, the document will be restored exactly as you left it.

### Sharing Documents

1. Write your content
2. Copy the URL (it contains your encoded document)
3. Share the URL via email, chat, social media, etc.
4. Anyone with the URL can view and edit (creating their own URL)

### Theme Toggle

Click the **🌓** button in the header to switch between light and dark modes. Your preference is saved locally.

### Clear Content

Click the **🗑️ Clear** button to start fresh. You'll be asked to confirm first.

---

## Important Limitations

### URL Length

- **Browser Limit**: Most browsers support URLs up to ~2,000 characters (some up to ~65,000)
- **Warning**: LinkNote will warn you when your URL exceeds 2,000 characters
- **Practical Limit**: Works best for short to medium-length documents
- **Workaround**: For longer documents, consider splitting into multiple notes

### What This Means

✅ **Perfect for:**
- Quick notes and snippets
- README files
- Documentation snippets
- Meeting notes
- Code examples
- Blog post drafts

❌ **Not ideal for:**
- Very long documents (10,000+ words)
- Documents with many large images (images must be linked, not embedded)
- Binary file storage

---

## Privacy & Security

### What We DON'T Do

- ❌ No servers
- ❌ No databases
- ❌ No cookies
- ❌ No localStorage (except theme preference)
- ❌ No analytics
- ❌ No tracking
- ❌ No external API calls (except for CDN libraries)

### What This Means for You

- **Complete Privacy**: Your content never leaves your browser
- **No Account Needed**: No sign-up, no login, no password
- **Your Data, Your Control**: You control the URL, you control the content
- **Cannot Be Censored**: No one can delete or modify your documents except you
- **No Data Breaches**: There's no database to breach

### XSS Protection

✅ **LinkNote protects against XSS attacks**
- **DOMPurify** sanitizes all HTML before rendering
- Malicious scripts are automatically removed
- Event handlers and dangerous attributes are blocked
- Only safe Markdown/HTML elements are allowed
- See [docs/SECURITY.md](docs/SECURITY.md) for detailed security information

### Security Considerations

⚠️ **URLs are NOT encrypted**
- Anyone with your URL can read your document
- Don't put sensitive information (passwords, API keys, etc.) in LinkNote
- URLs might appear in browser history, server logs, or referrer headers
- Use only for content you're comfortable sharing via URL

---

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables for theming
- **Vanilla JavaScript**: No framework dependencies (ES modules)

### Dependencies (npm)
- **[marked](https://github.com/markedjs/marked)**: Markdown parsing
- **[DOMPurify](https://github.com/cure53/DOMPurify)**: HTML sanitization for XSS protection

### Build Tools
- **[Vite](https://vitejs.dev/)**: Fast dev server and production bundler
- **Node.js & npm**: Dependency management

### Dependency Management

✅ **Clean Repository**
- Dependencies installed via npm (not committed to git)
- Production build includes all dependencies (no external CDN)
- Modern ES module imports

### Why No Framework?

To keep LinkNote:
- Fast and lightweight
- Easy to understand and modify
- Minimal dependencies
- Running forever without maintenance

---

## Project Structure

```
linknote/
├── LICENSE                 # GNU GPL-3.0 license
├── README.md              # This file (main documentation)
├── package.json           # npm dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── vite.config.js         # Vite build configuration
├── .gitignore             # Git ignore
├── robots.txt             # Web crawler blocking (67 lines)
├── ai.txt                 # AI crawler blocking (40 lines)
├── llms.txt               # LLM crawler blocking (15 lines)
├── .well-known/           # Well-known URIs
│   └── security.txt      # Security contact information
├── .github/               # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml        # Continuous integration
│       ├── security.yml  # Security scanning
│       └── release.yml   # Release automation
├── src/                   # Application source
│   ├── index.html        # Main HTML file (uses ES modules)
│   ├── styles.css        # All styling and themes
│   ├── app.js            # Application logic (imports npm packages)
│   └── assets/           # Brand assets (logos, icons)
│       ├── favicon.svg   # App icon
│       ├── logo.svg      # Brand logo
│       └── logo-dark.svg # Dark theme logo
├── dist/                  # Production build output (created by npm run build)
├── node_modules/          # npm dependencies (NOT committed to git)
└── docs/                  # Documentation
    ├── ARCHITECTURE.md   # Technical architecture
    ├── BRAND_ALIGNMENT.md # Brand guideline implementation
    ├── BRANDING_GUIDELINE.md # Personal brand guidelines
    ├── DEPENDENCIES.md   # Dependency management comparison
    ├── QUICKSTART.md     # Quick start & developer setup
    ├── SECURITY.md       # Security documentation
    └── drawings/         # Architecture diagrams (D2 + PNG)
        ├── data-flow.d2
        ├── data-flow.png
        ├── security-architecture.d2
        ├── security-architecture.png
        └── ...           # Additional diagrams
```

---

## Architecture

### Modular Design

The application is organized into 5 main modules:

1. **URLCodec** - URL encoding/decoding
   - `encode()` - Text to URL-safe Base64
   - `decode()` - Base64 to text
   - `getFromURL()` - Read from URL fragment
   - `setToURL()` - Write to URL fragment

2. **MarkdownEngine** - Markdown parsing
   - `initialize()` - Configure marked.js
   - `parse()` - Convert Markdown to HTML

3. **EditorManager** - Editor state management
   - `initialize()` - Set up editor
   - `handleInput()` - Process user input (debounced)
   - `updatePreview()` - Update preview pane
   - `updateURL()` - Encode content to URL
   - `loadFromURL()` - Restore from URL

4. **ThemeManager** - Theme management
   - `initialize()` - Load saved theme
   - `toggle()` - Switch themes
   - `applyTheme()` - Apply to document

5. **UIController** - UI interactions
   - `initialize()` - Set up event listeners
   - `copyURL()` - Copy URL to clipboard
   - `confirmClear()` - Clear with confirmation
   - `showToast()` - Show notifications

### Data Flow

```
User types → handleInput() → updatePreview() (immediate)
                          → updateURL() (debounced 500ms)
                          → URLCodec.encode()
                          → history.replaceState()
```

For detailed technical documentation, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Contributing

Contributions are welcome! We value privacy-first design, simplicity, and accessibility.

### How to Contribute

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/linknote.git
   cd linknote
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Edit files in `src/`
   - Run `npm run dev` for live preview
   - Follow existing code style
   - Test thoroughly

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Go to GitHub and create a PR
   - Describe your changes clearly
   - Link any related issues

### Code Style

- **JavaScript**: ES6+, 4-space indent, double quotes, semicolons
- **CSS**: CSS variables for theming, hyphenated class names
- **Comments**: JSDoc for functions, section comments for CSS
- **Keep it simple**: Maintain the minimalist philosophy

### Project Principles

✅ **Privacy First** - No servers, no tracking
✅ **Simplicity** - Keep codebase small and understandable
✅ **Minimal Dependencies** - Only essential external libs
✅ **Accessibility** - Work for everyone, all devices
✅ **Offline First** - Work without internet after load

### Ideas for Contributions

- [ ] Compression for longer documents
- [ ] Export/import Markdown files
- [ ] More theme options
- [ ] Keyboard shortcuts
- [ ] Syntax highlighting in editor
- [ ] Word count / read time
- [ ] Multiple notes management
- [ ] Search within note

---

## Additional Resources

### Documentation

- **[docs/QUICKSTART.md](docs/QUICKSTART.md)** - Quick start guide
  - 2-minute getting started
  - Tips and tricks
  - Troubleshooting
  - Platform-specific notes
  - Use cases

- **[docs/EXAMPLES.md](docs/EXAMPLES.md)** - Example documents
  - Meeting notes template
  - Technical documentation template
  - Project README template
  - Study notes template
  - Blog post template

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Technical documentation
  - System architecture
  - Module descriptions
  - Data flow diagrams
  - URL encoding scheme
  - Browser compatibility
  - Security considerations
  - Future enhancements

### Technology Details

**Core Technologies:**
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript ES6+** - Vanilla JS, no frameworks

**External Dependencies:**
- **marked.js** (v11.1.1) - Markdown parser (loaded from CDN)

**Browser APIs Used:**
- URL Fragment (`window.location.hash`)
- History API (`history.replaceState`)
- Clipboard API (`navigator.clipboard`)
- TextEncoder/TextDecoder (UTF-8)
- localStorage (theme only)
- Media Queries (responsive & theme)

---

## License

GNU General Public License v3.0 - see [LICENSE](LICENSE) file for details.

This is free software: you are free to change and redistribute it under the terms of the GPL-3.0 license.

---

## FAQ

### Why not use localStorage?

localStorage is device-specific. Using the URL makes your documents instantly portable and shareable.

### What if my URL is too long?

Consider:
- Using a URL shortener (though this adds a server dependency)
- Splitting your document into multiple notes
- Linking to external images instead of embedding them

### Can I self-host this?

Absolutely! Just serve the `src` folder from any web server. No special configuration needed.

### Does this work offline?

Yes, after the initial page load. The only external dependency is the marked.js library loaded from CDN.

### Can I use my own Markdown library?

Yes! Download marked.js (or another library) and update the script tag in `index.html`.

---

## Acknowledgments

- [marked.js](https://github.com/markedjs/marked) for Markdown parsing
- [DOMPurify](https://github.com/cure53/DOMPurify) for HTML sanitization
- Built with the assistance of [GitHub Copilot](https://github.com/features/copilot)
- Inspired by the desire for truly private, serverless note-taking

---

## Contact & Support

- **Issues**: [GitHub Issues](https://github.com/ngroegli/linknote/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ngroegli/linknote/discussions)

---

<p align="center">
  Made with ❤️ for privacy-conscious users
  <br>
  <strong>No servers. No tracking. Just you and your Markdown.</strong>
</p>
