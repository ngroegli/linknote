# LinkNote Quick Start Guide

Get up and running with LinkNote in 2 minutes!

---

## 🚀 For Users

### Step 1: Open LinkNote

**Option A**: Visit the hosted version
- Go to your LinkNote URL (e.g., `https://yourdomain.com/linknote`)

**Option B**: Run locally
```bash
# Clone the repo
git clone https://github.com/ngroegli/linknote.git
cd linknote/src

# Open index.html in your browser
# Or run a local server:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Step 2: Start Writing

1. Type or paste your Markdown in the left panel
2. See the live preview on the right
3. Your content is automatically saved in the URL

### Step 3: Save Your Work

- Click **"📋 Copy URL"** button
- The URL now contains your entire document
- Bookmark it, share it, or paste it anywhere

### Step 4: Access Your Work Later

- Simply open the URL you copied
- Your document will be restored exactly as you left it
- No login, no account, no server needed!

---

## 💡 Tips & Tricks

### Markdown Basics

```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

- Bullet list
- Another item

1. Numbered list
2. Another item

[Link text](https://example.com)

> Blockquote

`inline code`

```
code block
```
```

### Keyboard Tips

- **Tab**: Indent (in editor)
- **Ctrl/Cmd + A**: Select all
- **Ctrl/Cmd + C/V**: Copy/paste
- **F11**: Fullscreen (browser)

### URL Management

✅ **DO**:
- Copy the URL after making significant changes
- Bookmark important documents
- Share URLs with collaborators
- Keep URLs under 2000 characters when possible

❌ **DON'T**:
- Rely on browser history alone
- Put sensitive data in documents
- Expect URLs to work if you clear the fragment

### Privacy Tips

🔒 **Your content is private**, but remember:
- URLs might appear in browser history
- Anyone with the URL can read the content
- Don't put passwords, API keys, or secrets in documents

---

## 🎨 Customization

### Theme Toggle

Click the **🌓** button to switch between:
- ☀️ Light mode (default)
- 🌙 Dark mode

Your preference is saved locally.

### Mobile Usage

LinkNote works great on mobile:
- Responsive layout stacks editor/preview
- Touch-friendly controls
- Works offline after initial load

---

## 🔧 Advanced Usage

### Sharing Documents

**Method 1: Direct URL**
```
Just copy and send the full URL:
https://example.com/#IyBIZWxsbyBXb3JsZA~~
```

**Method 2: URL Shortener (optional)**
```
Use a URL shortener if needed:
https://bit.ly/your-short-url
```
⚠️ Note: Using a shortener adds a server dependency

### Embedding Images

Images must be linked, not embedded:
```markdown
![Alt text](https://example.com/image.jpg)
```

### Long Documents

If your URL gets too long:
- Split into multiple notes
- Link between them
- Consider compression (future feature)

### Backup Strategy

**Option 1**: Bookmark Collection
- Save important URLs as bookmarks
- Organize in folders

**Option 2**: Text File
- Keep a text file with your URLs
- Add titles/descriptions

**Option 3**: Spreadsheet
- Track URLs with metadata
- Easy to search and organize

---

## 🐛 Troubleshooting

### Preview Not Showing

**Problem**: Preview is blank
**Solution**:
1. Check if you typed any Markdown
2. Try refreshing the page
3. Check browser console for errors

### URL Not Working

**Problem**: URL doesn't restore content
**Solution**:
1. Make sure the full URL (including #fragment) was copied
2. Check if the URL was truncated
3. Try pasting in an incognito window

### Copy Button Not Working

**Problem**: "Copy URL" button fails
**Solution**:
1. Manually copy the URL from address bar
2. Check browser permissions for clipboard
3. Try a different browser

### Content Disappeared

**Problem**: Lost your work
**Solution**:
1. Check browser history for the URL
2. Use browser's "Recently Closed Tabs"
3. Prevention: Always copy URL before closing

---

## 📱 Platform-Specific Notes

### iOS Safari

- Works great, but clipboard API may require permission
- Add to Home Screen for app-like experience
- Use Share button to send URLs

### Android Chrome

- Full support for all features
- "Add to Home Screen" supported
- Background tabs may reload (save URL first)

### Desktop Browsers

All major browsers fully supported:
- Chrome/Chromium
- Firefox
- Safari
- Edge

---

## 🎯 Use Cases

### 1. Quick Notes

Perfect for:
- Meeting notes
- Brainstorming
- To-do lists
- Scratch pads

### 2. Documentation

Great for:
- README drafts
- API documentation
- How-to guides
- Technical specs

### 3. Content Drafting

Ideal for:
- Blog posts
- Email drafts
- Social media content
- Article outlines

### 4. Code Snippets

Share:
- Code examples
- Configuration files
- Scripts
- Commands

### 5. Education

Use for:
- Class notes
- Study guides
- Assignment drafts
- Collaborative learning

---

## 🔗 Resources

### Learn Markdown

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [CommonMark](https://commonmark.org/)

### LinkNote Docs

- [README](../README.md) - Full documentation
- [ARCHITECTURE](ARCHITECTURE.md) - Technical details

---

## 👨‍💻 For Developers

Want to contribute or run LinkNote locally? Here's how to set up the development environment.

### Prerequisites

You need Node.js installed on your system. Node.js includes npm (Node Package Manager).

#### Installing Node.js

**Option 1: Using nvm (Recommended)**

Linux/macOS:
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart terminal or run:
source ~/.zshrc  # or ~/.bashrc if using bash

# Install latest LTS version
nvm install --lts

# Verify
node --version && npm --version
```

Windows:
- Download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
- Run: `nvm install lts` and `nvm use lts`

**Option 2: Direct Install**
- Download from [nodejs.org](https://nodejs.org/) (LTS version)
- Verify: `node --version` (should show v18.x.x or higher)

### Development Setup

1. **Clone and Install**
```bash
git clone https://github.com/ngroegli/linknote.git
cd linknote
npm install
```

2. **Start Dev Server**
```bash
npm run dev
```
Opens at http://localhost:3000 with hot-reload

3. **Build for Production**
```bash
npm run build
```
Creates optimized bundle in `dist/` folder

4. **Preview Production Build**
```bash
npm run preview
```
Tests the production build locally

### Project Structure
```
linknote/
├── src/                  # Source files
│   ├── index.html       # Main HTML (uses ES modules)
│   ├── app.js           # Application logic
│   ├── styles.css       # Styles
│   └── assets/          # Images, logos, icons
├── dist/                # Production build output
│   ├── index.html       # Built HTML
│   ├── assets/          # Built JS/CSS/images
│   ├── ai.txt           # AI crawler policy
│   ├── llms.txt         # LLM crawler policy
│   ├── robots.txt       # Search engine crawler policy
│   └── .well-known/     # Security and metadata
│       └── security.txt # Security contact info
├── docs/                # Documentation
├── node_modules/        # Dependencies (not in git)
├── package.json         # Dependencies and scripts
├── vite.config.js       # Build configuration
├── ai.txt               # AI/LLM crawler policy (copied to dist)
├── llms.txt             # LLM crawler policy (copied to dist)
├── robots.txt           # Search crawler policy (copied to dist)
└── .well-known/         # Security metadata (copied to dist)
    └── security.txt
```

### Development Workflow

1. Make changes in `src/`
2. Save (Vite auto-reloads)
3. Test in dev server
4. Build with `npm run build` (auto-copies txt files and .well-known/)
5. Commit changes (node_modules/ excluded)
6. Deploy `dist/` folder

### Deployment

After `npm run build`, deploy the `dist/` folder to:
- **GitHub Pages** - Free static hosting
- **Netlify** - Drag & drop or git integration
- **Vercel** - Auto-deploy from git
- **Cloudflare Pages** - Fast global CDN
- **Any web server** - Just static files

The build is self-contained with all dependencies bundled - no external CDN needed!

### Why This Setup?

✅ Clean repo - dependencies not committed to git
✅ Modern tooling - Vite for fast dev & builds
✅ Offline-first - production build works without internet
✅ Easy updates - `npm update` to update packages

### Troubleshooting

**"npm: command not found"**
→ Node.js not installed. See Prerequisites section.

**Port 3000 already in use**
→ Change port in `vite.config.js`: `server: { port: 3001 }`

**Module not found errors**
→ Run `npm install` again

**Build errors**
→ `rm -rf node_modules package-lock.json && npm install && npm run build`

---

## ❓ FAQ

**Q: Is my data safe?**
A: Yes! It never leaves your browser. But URLs aren't encrypted, so don't put secrets in them.

**Q: Can I use this offline?**
A: Yes, after the initial load. The Markdown library is cached by your browser.

**Q: How long can my document be?**
A: Limited by URL length (~2000 chars safe, ~65000 max in some browsers).

**Q: Can I export my notes?**
A: Currently, copy/paste the content. Export feature may come in future.

**Q: Can others edit my shared URLs?**
A: They can edit their copy, creating a new URL. Your original is unchanged.

**Q: Does this work on my phone?**
A: Yes! Fully responsive and mobile-friendly.

---

<p align="center">
  <strong>Happy note-taking! 📝</strong>
  <br>
  Remember: Your data, your control, your privacy.
</p>
