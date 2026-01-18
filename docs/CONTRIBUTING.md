# Contributing to LinkNote

Thank you for your interest in contributing to LinkNote! This document provides guidelines and instructions for contributing.

---

## 🎯 Project Goals

Before contributing, please understand our core principles:

1. **Privacy First**: No servers, no tracking, no data collection
2. **Simplicity**: Keep the codebase small and understandable
3. **Zero Dependencies**: Minimize external dependencies (currently only marked.js)
4. **Accessibility**: Work for everyone, on all devices
5. **Offline First**: Should work without internet after initial load

---

## 🛠️ Development Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor or IDE
- Basic understanding of HTML, CSS, and JavaScript

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ngroegli/linknote.git
   cd linknote
   ```

2. **Open in browser**
   ```bash
   # Simple Python server
   cd src
   python3 -m http.server 8000

   # Or use any other local server
   # Then open http://localhost:8000
   ```

3. **Start coding**
   - Edit files in `src/` directory
   - Refresh browser to see changes
   - No build step required!

---

## 📝 Code Style

### JavaScript

- **ES6+**: Use modern JavaScript features
- **Modules**: Use the existing module pattern (object namespaces)
- **Comments**: Add JSDoc comments for functions
- **Naming**:
  - `camelCase` for variables and functions
  - `PascalCase` for module objects
  - `UPPER_CASE` for constants
- **Indentation**: 4 spaces
- **Semicolons**: Use them
- **Quotes**: Use double quotes for strings

**Example**:
```javascript
const MyModule = {
    /**
     * Does something useful
     * @param {string} input - The input parameter
     * @returns {string} The processed result
     */
    doSomething(input) {
        const result = input.trim();
        return result;
    }
};
```

### CSS

- **Organization**: Group related styles together
- **Comments**: Use section comments
- **Variables**: Use CSS custom properties for theming
- **Naming**:
  - Use hyphenated class names (`.app-header`)
  - Prefix JavaScript hooks with `js-` if needed
- **Indentation**: 4 spaces
- **Order**: Alphabetical within blocks

**Example**:
```css
/* ============================================
   Component Name
   ============================================ */
.component-name {
    background-color: var(--bg-primary);
    border-radius: 0.5rem;
    padding: 1rem;
}
```

### HTML

- **Semantics**: Use semantic HTML5 elements
- **Accessibility**: Include ARIA labels where appropriate
- **Indentation**: 4 spaces
- **Comments**: Only for major sections

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, please test:

- [ ] Basic editing and preview work
- [ ] URL encoding/decoding with special characters
- [ ] Copy URL functionality
- [ ] Clear functionality with confirmation
- [ ] Theme toggle persists across reloads
- [ ] URL warning appears at appropriate length
- [ ] Browser back/forward buttons work
- [ ] Works on mobile (responsive)
- [ ] Works offline (after initial load)
- [ ] No console errors

### Browser Testing

Test your changes in at least:
- Chrome (latest)
- Firefox (latest)
- Safari (if available)
- Mobile browser (Chrome or Safari)

### Test Cases to Consider

1. **Empty states**
   - Loading with no URL fragment
   - Clearing all content

2. **Edge cases**
   - Very long documents
   - Special characters (emoji, Unicode)
   - Malformed URL fragments

3. **User interactions**
   - Rapid typing (debouncing)
   - Copy/paste
   - Keyboard navigation

---

## 🐛 Bug Reports

### Before Submitting

1. Check if the issue already exists
2. Test in multiple browsers
3. Try to reproduce with minimal steps

### What to Include

- **Browser**: Name and version
- **OS**: Operating system
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **URL**: The full LinkNote URL if relevant (remove sensitive content)

**Example**:
```markdown
## Bug: Copy URL fails in Safari

**Browser**: Safari 15.0 on macOS 12.0

**Steps to reproduce**:
1. Write some text in the editor
2. Click "Copy URL" button

**Expected**: Success toast shows, URL is copied

**Actual**: Error in console, nothing copied

**Error**: `navigator.clipboard is undefined`
```

---

## 💡 Feature Requests

### Before Requesting

- Check existing issues and discussions
- Consider if the feature aligns with project goals
- Think about implementation complexity

### What to Include

- **Use case**: Why is this feature needed?
- **Proposal**: How should it work?
- **Alternatives**: Other ways to achieve the same goal
- **Privacy impact**: Does it affect privacy guarantees?
- **Dependency impact**: Does it require new libraries?

**Example**:
```markdown
## Feature: Export to Markdown file

**Use case**: Users want to save their work as a local .md file

**Proposal**: Add an "Export" button that downloads the current content as a .md file

**Implementation**: Use Blob and download link
- No external dependencies needed
- Client-side only
- No privacy impact

**Alternative**: Users can copy/paste content manually (current workaround)
```

---

## 🔄 Pull Request Process

### Before Submitting

1. **Fork** the repository
2. **Create a branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly** (see testing checklist above)
5. **Commit with clear messages**
   ```bash
   git commit -m "Add export to Markdown feature"
   ```

### PR Guidelines

- **One feature per PR**: Keep PRs focused
- **Clear title**: Describe what the PR does
- **Description**: Explain why and how
- **Screenshots**: Include before/after if UI changes
- **Testing**: Describe what you tested
- **Breaking changes**: Highlight if applicable

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new dependencies added (or justified)
```

---

## 🎨 Design Guidelines

### UI/UX Principles

- **Simplicity**: Less is more
- **Clarity**: Make actions obvious
- **Feedback**: Show user what happened
- **Consistency**: Follow existing patterns
- **Accessibility**: Support keyboard navigation, screen readers

### Adding New UI Elements

When adding buttons, controls, or sections:

1. **Match existing style**: Use CSS variables
2. **Be responsive**: Test on mobile
3. **Add tooltips**: Use `title` attributes
4. **Consider themes**: Test in light and dark modes
5. **Think about placement**: Where does it fit naturally?

---

## 📚 Documentation

### When to Update Docs

- Adding new features
- Changing behavior
- Fixing bugs that affect usage
- Adding configuration options

### Where to Document

- **README.md**: User-facing documentation
- **DOCS/ARCHITECTURE.md**: Technical details
- **DOCS/CONTRIBUTING.md**: This file
- **Code comments**: Complex logic

### Documentation Style

- **Clear and concise**: Get to the point
- **Examples**: Show, don't just tell
- **Structure**: Use headings and lists
- **Links**: Reference related sections

---

## ❓ Questions?

### Ways to Get Help

1. **GitHub Issues**: For bug reports and feature requests
2. **GitHub Discussions**: For questions and ideas
3. **Code Comments**: Read inline documentation
4. **Architecture Docs**: See `DOCS/ARCHITECTURE.md`

### Good Question Format

❌ Bad: "How do I make it do the thing?"
✅ Good: "How can I add syntax highlighting to the editor? I've looked at the EditorManager module but I'm not sure where to integrate CodeMirror."

---

## 🚀 Release Process

(For maintainers)

1. **Test thoroughly** on all supported browsers
2. **Update version** in any relevant files
3. **Update CHANGELOG** (if we add one)
4. **Tag release** with semantic versioning
   ```bash
   git tag -a v1.1.0 -m "Add export feature"
   git push origin v1.1.0
   ```
5. **Create GitHub release** with notes
6. **Deploy** to GitHub Pages or hosting

---

## 🏆 Recognition

Contributors will be:
- Listed in a CONTRIBUTORS file (if we create one)
- Credited in release notes
- Thanked in the community

---

## 📜 Code of Conduct

### Our Standards

- **Be respectful**: Treat everyone with respect
- **Be collaborative**: Help each other
- **Be constructive**: Provide helpful feedback
- **Be patient**: Remember everyone is learning

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Spam or off-topic posts
- Publishing others' private information

### Enforcement

Report issues to the maintainers. Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

---

## 📄 License

By contributing to LinkNote, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Every contribution, no matter how small, helps make LinkNote better. Thank you for being part of this project!

**Ways to contribute beyond code**:
- Report bugs
- Suggest features
- Improve documentation
- Help others in discussions
- Share LinkNote with others
- Give feedback on UX

**Remember**: The best contribution is one that aligns with the project's goals and helps users maintain their privacy while taking notes.

---

<p align="center">
  <strong>Happy Contributing! 🎉</strong>
</p>
