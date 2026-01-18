# LinkNote Architecture

## Overview

LinkNote is a client-side-only web application built with vanilla JavaScript, HTML, and CSS. This document describes the technical architecture and design decisions.

---

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                  Browser                         │
│  ┌───────────────────────────────────────────┐  │
│  │           LinkNote Application            │  │
│  │                                           │  │
│  │  ┌─────────────┐      ┌──────────────┐  │  │
│  │  │    HTML     │      │     CSS      │  │  │
│  │  │ (Structure) │      │   (Styles)   │  │  │
│  │  └─────────────┘      └──────────────┘  │  │
│  │                                           │  │
│  │  ┌────────────────────────────────────┐  │  │
│  │  │     JavaScript (app.js)            │  │  │
│  │  │  ┌──────────────────────────────┐  │  │  │
│  │  │  │      URLCodec                │  │  │  │
│  │  │  │  - encode()                  │  │  │  │
│  │  │  │  - decode()                  │  │  │  │
│  │  │  │  - getFromURL()              │  │  │  │
│  │  │  │  - setToURL()                │  │  │  │
│  │  │  └──────────────────────────────┘  │  │  │
│  │  │  ┌──────────────────────────────┐  │  │  │
│  │  │  │    MarkdownEngine            │  │  │  │
│  │  │  │  - initialize()              │  │  │  │
│  │  │  │  - parse()                   │  │  │  │
│  │  │  └──────────────────────────────┘  │  │  │
│  │  │  ┌──────────────────────────────┐  │  │  │
│  │  │  │    EditorManager             │  │  │  │
│  │  │  │  - initialize()              │  │  │  │
│  │  │  │  - handleInput()             │  │  │  │
│  │  │  │  - updatePreview()           │  │  │  │
│  │  │  │  - updateURL()               │  │  │  │
│  │  │  │  - loadFromURL()             │  │  │  │
│  │  │  └──────────────────────────────┘  │  │  │
│  │  │  ┌──────────────────────────────┐  │  │  │
│  │  │  │    ThemeManager              │  │  │  │
│  │  │  │  - initialize()              │  │  │  │
│  │  │  │  - toggle()                  │  │  │  │
│  │  │  │  - applyTheme()              │  │  │  │
│  │  │  └──────────────────────────────┘  │  │  │
│  │  │  ┌──────────────────────────────┐  │  │  │
│  │  │  │    UIController              │  │  │  │
│  │  │  │  - initialize()              │  │  │  │
│  │  │  │  - copyURL()                 │  │  │  │
│  │  │  │  - confirmClear()            │  │  │  │
│  │  │  │  - showToast()               │  │  │  │
│  │  │  └──────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │           Browser APIs Used               │  │
│  │  - URL Fragment (window.location.hash)   │  │
│  │  - History API (replaceState)            │  │
│  │  - Clipboard API (navigator.clipboard)   │  │
│  │  - TextEncoder/TextDecoder (UTF-8)       │  │
│  │  - localStorage (theme only)             │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │        External Dependencies              │  │
│  │  - marked.js (Markdown parser, CDN)      │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## Core Modules

### 1. URLCodec

**Purpose**: Handles encoding and decoding of content to/from URL fragments.

**Responsibilities**:
- Encode text to URL-safe Base64
- Decode URL-safe Base64 back to text
- Read content from URL fragment
- Write content to URL fragment

**Implementation Details**:
- Uses TextEncoder/TextDecoder for UTF-8 support
- Implements RFC 4648 URL-safe Base64 encoding
- Replaces `+` → `-`, `/` → `_`, `=` → `~` for URL safety
- Handles encoding/decoding errors gracefully

**Key Methods**:
```javascript
URLCodec.encode(text)      // text → URL-safe Base64
URLCodec.decode(encoded)   // Base64 → text
URLCodec.getFromURL()      // Read from window.location.hash
URLCodec.setToURL(content) // Write to window.location.hash
```

---

### 2. MarkdownEngine

**Purpose**: Parses Markdown and converts it to HTML.

**Responsibilities**:
- Initialize marked.js with proper configuration
- Parse Markdown text to HTML
- Handle parsing errors gracefully

**Implementation Details**:
- Uses marked.js library (v11.1.1)
- Configured for GitHub Flavored Markdown (GFM)
- Enables line breaks, header IDs
- Returns placeholder text for empty input
- Returns error message for invalid Markdown

**Key Methods**:
```javascript
MarkdownEngine.initialize() // Configure marked.js
MarkdownEngine.parse(md)    // Markdown → HTML
```

---

### 3. EditorManager

**Purpose**: Manages the editor state and coordinates updates between editor, preview, and URL.

**Responsibilities**:
- Handle user input in the editor
- Update the live preview
- Debounce URL updates
- Load content from URL on page load
- Track character count and URL length
- Show warnings for large URLs

**Implementation Details**:
- **Debouncing**: 500ms delay before updating URL (prevents excessive history changes)
- **Immediate Preview**: Preview updates on every keystroke for responsiveness
- **URL Warning**: Shows warning when URL > 2000 characters
- **History Management**: Uses `history.replaceState()` to avoid cluttering browser history

**Key Methods**:
```javascript
EditorManager.initialize()       // Set up editor
EditorManager.handleInput()      // Process user input
EditorManager.updatePreview(md)  // Update preview pane
EditorManager.updateURL(content) // Write to URL (debounced)
EditorManager.loadFromURL()      // Read from URL
```

**Event Flow**:
```
User types in editor
    ↓
handleInput() called
    ↓
    ├→ updatePreview() (immediate)
    ├→ updateCharCount() (immediate)
    └→ updateURL() (debounced 500ms)
        ↓
        ├→ URLCodec.setToURL()
        ├→ updateURLLength()
        └→ checkURLLength()
```

---

### 4. ThemeManager

**Purpose**: Manages light/dark theme switching.

**Responsibilities**:
- Initialize theme from localStorage or system preference
- Toggle between light and dark themes
- Apply theme to document
- Listen for system theme changes

**Implementation Details**:
- Uses CSS custom properties (CSS variables) for theming
- Stores preference in localStorage (only thing stored locally)
- Respects system preference (`prefers-color-scheme`)
- Updates `data-theme` attribute on `<html>` element

**Key Methods**:
```javascript
ThemeManager.initialize()  // Load theme
ThemeManager.toggle()      // Switch themes
ThemeManager.applyTheme()  // Apply to DOM
```

---

### 5. UIController

**Purpose**: Manages user interactions with UI controls.

**Responsibilities**:
- Handle button clicks (Copy, Clear, Theme)
- Copy URL to clipboard
- Show confirmation dialogs
- Display toast notifications

**Implementation Details**:
- Uses modern Clipboard API with fallback for older browsers
- Shows user-friendly toast messages
- Confirms destructive actions (clear)

**Key Methods**:
```javascript
UIController.initialize()    // Set up event listeners
UIController.copyURL()       // Copy to clipboard
UIController.confirmClear()  // Clear with confirmation
UIController.showToast(msg)  // Show notification
```

---

## Data Flow

### On Page Load

```
1. Browser loads HTML
   ↓
2. Browser loads CSS (styling applied)
   ↓
3. Browser loads marked.js from CDN
   ↓
4. Browser loads app.js
   ↓
5. DOMContentLoaded event fires
   ↓
6. Initialize modules:
   ├→ MarkdownEngine.initialize()
   ├→ ThemeManager.initialize()
   ├→ EditorManager.initialize()
   └→ UIController.initialize()
   ↓
7. EditorManager.loadFromURL()
   ├→ URLCodec.getFromURL()
   ├→ Decode content
   ├→ Set editor value
   ├→ Update preview
   └→ Update UI stats
```

### On User Input

```
1. User types in editor
   ↓
2. Input event fires
   ↓
3. EditorManager.handleInput()
   ↓
4. Update preview (immediate)
   ├→ Get editor content
   ├→ MarkdownEngine.parse()
   └→ Set preview innerHTML
   ↓
5. Update character count (immediate)
   ↓
6. Set debounce timer (500ms)
   ↓
7. Timer expires
   ↓
8. Update URL
   ├→ URLCodec.encode()
   ├→ history.replaceState()
   ├→ Update URL length display
   └→ Check if warning needed
```

### On Copy URL

```
1. User clicks "Copy URL" button
   ↓
2. UIController.copyURL()
   ↓
3. Try modern Clipboard API
   ├→ Success: Show success toast
   └→ Fail: Try fallback method
       ├→ Create hidden textarea
       ├→ Select and copy
       └→ Show appropriate toast
```

---

## URL Encoding Scheme

### Why Base64?

- **Binary Safety**: Handles all Unicode characters
- **Compact**: More efficient than URI encoding for long text
- **Standard**: Well-understood algorithm
- **Reversible**: Lossless encoding/decoding

### URL-Safe Modifications

Standard Base64 uses characters that need escaping in URLs:
- `+` → `-` (plus to minus)
- `/` → `_` (slash to underscore)
- `=` → `~` (equals to tilde)

This makes the fragment truly URL-safe without further encoding.

### Example

```
Input:  "# Hello World"
UTF-8:  [35, 32, 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
Base64: "IyBIZWxsbyBXb3JsZA=="
URL-Safe: "IyBIZWxsbyBXb3JsZA~~"
Final URL: "https://example.com/#IyBIZWxsbyBXb3JsZA~~"
```

---

## Browser Compatibility

### Required Features

- **ES6 JavaScript**: Arrow functions, const/let, classes
- **URL API**: window.location.hash
- **History API**: history.replaceState()
- **TextEncoder/TextDecoder**: UTF-8 encoding
- **CSS Variables**: For theming
- **CSS Grid/Flexbox**: For layout

### Supported Browsers

- ✅ Chrome 51+
- ✅ Firefox 48+
- ✅ Safari 10+
- ✅ Edge 79+
- ✅ Opera 38+

### Optional Features

- **Clipboard API**: Falls back to document.execCommand()
- **CSS prefers-color-scheme**: Falls back to light theme

---

## Performance Considerations

### Debouncing

URL updates are debounced by 500ms to prevent:
- Excessive history entries
- Performance degradation during rapid typing
- Unnecessary encoding operations

Preview updates are NOT debounced for immediate feedback.

### Memory Management

- No memory leaks: Event listeners properly managed
- Timers cleared before setting new ones
- No circular references

### Rendering Performance

- CSS transitions limited to properties that don't trigger layout
- Preview updates use innerHTML (fast for small/medium content)
- Minimal DOM manipulations

---

## Security Considerations

### XSS Protection

- marked.js sanitizes HTML by default
- No `eval()` or `innerHTML` with user-generated code
- No dynamic script loading

### Privacy

- No external analytics
- No server-side logging
- No cookies (except localStorage for theme)
- Content never transmitted over network

### Limitations

⚠️ **URLs are NOT private**:
- Visible in browser history
- May appear in server logs (if proxied)
- May leak via Referer header
- Shared URLs expose content to recipients

**Recommendation**: Do not store sensitive information.

---

## Future Enhancements

### Potential Improvements

1. **Compression**
   - Use LZ-string or similar for compression
   - Could support 2-3x longer documents
   - Trade-off: More processing time

2. **Progressive Loading**
   - Load marked.js locally instead of CDN
   - Enable true offline support
   - Service Worker for caching

3. **Export/Import**
   - Export to .md file
   - Import from .md file
   - Drag-and-drop support

4. **Editor Enhancements**
   - Syntax highlighting (CodeMirror/Monaco)
   - Vim/Emacs keybindings
   - Auto-complete
   - Keyboard shortcuts

5. **Preview Enhancements**
   - Syntax highlighting for code blocks
   - Mermaid diagram support
   - LaTeX math rendering
   - Table of contents generation

6. **URL Management**
   - Built-in URL shortener integration
   - QR code generation
   - Multiple document tabs

---

## Testing Strategy

### Manual Testing Checklist

- [ ] Basic editing and preview
- [ ] URL encoding/decoding with various characters
- [ ] Theme switching
- [ ] Copy URL functionality
- [ ] Clear functionality
- [ ] URL length warning
- [ ] Browser back/forward with hash changes
- [ ] Offline functionality
- [ ] Mobile responsiveness
- [ ] Empty state handling
- [ ] Error handling (corrupted URLs)

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Deployment

### Static Hosting

LinkNote requires only static file hosting:

1. **GitHub Pages**
   ```bash
   # Push to gh-pages branch
   git subtree push --prefix src origin gh-pages
   ```

2. **Netlify**
   - Drag and drop `src` folder
   - Or connect Git repo

3. **Vercel**
   - Import Git repo
   - Set build command: none
   - Set publish directory: `src`

4. **Any Web Server**
   ```bash
   # Nginx, Apache, etc.
   cp -r src /var/www/html/linknote
   ```

### No Build Required

- No compilation step
- No dependency installation
- No environment variables
- No server configuration

Just serve the files!

---

## Troubleshooting

### Common Issues

**Issue**: Markdown not rendering
- **Cause**: marked.js failed to load from CDN
- **Solution**: Check internet connection, or download marked.js locally

**Issue**: URL too long
- **Cause**: Document exceeds browser URL length limit
- **Solution**: Shorten document or split into multiple notes

**Issue**: Content lost on page refresh
- **Cause**: URL fragment not copied before navigating away
- **Solution**: Always copy URL before closing tab

**Issue**: Theme not saving
- **Cause**: localStorage disabled or in private browsing mode
- **Solution**: Enable localStorage or manually toggle theme each session

---

## Code Style Guide

### JavaScript

- **Style**: ES6+ modern JavaScript
- **Formatting**: 4-space indentation
- **Naming**: camelCase for variables/functions, PascalCase for modules
- **Comments**: JSDoc-style for functions, inline for complex logic
- **Error Handling**: Try-catch with console.error for logging

### CSS

- **Methodology**: BEM-inspired naming
- **Variables**: CSS custom properties for theming
- **Units**: rem/em for typography, px for borders
- **Layout**: Flexbox and Grid for responsive design
- **Comments**: Section headers for organization

### HTML

- **Semantics**: Use semantic HTML5 elements
- **Accessibility**: Include ARIA labels and roles
- **Comments**: Minimal, only for major sections

---

## License

MIT License - See LICENSE file for details.
