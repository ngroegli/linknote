/* ============================================
   LinkNote - Privacy-First Markdown Editor

   Main application script that handles:
   - Markdown editing and live preview
   - URL fragment encoding/decoding
   - Theme management (light/dark mode)
   - User interactions (copy URL, clear, etc.)

   Architecture:
   - URLCodec: Handles encoding/decoding content to/from URL fragments
   - MarkdownEngine: Manages Markdown parsing and preview
   - EditorManager: Coordinates editor state and updates
   - UIController: Manages UI interactions and feedback
   ============================================ */

"use strict";

// ============================================
// URLCodec - Handles URL fragment encoding/decoding
// ============================================
const URLCodec = {
    /**
     * Encodes text content to a URL-safe Base64 string
     * Uses UTF-8 encoding to support international characters
     * @param {string} text - The text to encode
     * @returns {string} URL-safe Base64 encoded string
     */
    encode(text) {
        if (!text || text.trim() === "") {
            return "";
        }
        try {
            // Convert text to UTF-8 bytes, then to Base64, then make URL-safe
            const utf8Bytes = new TextEncoder().encode(text);
            const base64 = btoa(String.fromCharCode(...utf8Bytes));
            // Make Base64 URL-safe by replacing +/= with -_~ (RFC 4648)
            return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "~");
        } catch (error) {
            console.error("Encoding error:", error);
            return "";
        }
    },

    /**
     * Decodes a URL-safe Base64 string back to text
     * @param {string} encoded - The encoded string from URL fragment
     * @returns {string} Decoded text, or empty string if decoding fails
     */
    decode(encoded) {
        if (!encoded || encoded.trim() === "") {
            return "";
        }
        try {
            // Restore standard Base64 characters
            const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/~/g, "=");
            // Decode Base64 to bytes, then interpret as UTF-8
            const binaryString = atob(base64);
            const bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
            return new TextDecoder().decode(bytes);
        } catch (error) {
            console.error("Decoding error:", error);
            return "";
        }
    },

    /**
     * Gets the current content from the URL fragment
     * @returns {string} Decoded content from URL fragment
     */
    getFromURL() {
        const hash = window.location.hash.substring(1); // Remove the '#'
        return this.decode(hash);
    },

    /**
     * Updates the URL fragment with encoded content
     * Uses replaceState to avoid creating browser history entries
     * @param {string} content - The content to encode and set
     */
    setToURL(content) {
        const encoded = this.encode(content);
        const newURL = encoded ? `#${encoded}` : window.location.pathname;
        window.history.replaceState(null, "", newURL);
    }
};

// ============================================
// MarkdownEngine - Handles Markdown parsing
// ============================================
const MarkdownEngine = {
    /**
     * Configures the marked.js library for safe rendering
     */
    initialize() {
        // Configure marked.js options
        marked.setOptions({
            breaks: true,        // Convert \n to <br>
            gfm: true,          // GitHub Flavored Markdown
            headerIds: true,    // Add IDs to headers
            mangle: false,      // Don't mangle email addresses
            pedantic: false,    // Don't conform to obscure parts of markdown.pl
        });
    },

    /**
     * Converts Markdown text to HTML
     * @param {string} markdown - The Markdown text to parse
     * @returns {string} HTML string
     */
    parse(markdown) {
        if (!markdown || markdown.trim() === "") {
            return '<p class="preview-placeholder">Your Markdown preview will appear here...</p>';
        }
        try {
            return marked.parse(markdown);
        } catch (error) {
            console.error("Markdown parsing error:", error);
            return `<p style="color: var(--danger-color);">Error parsing Markdown: ${error.message}</p>`;
        }
    }
};

// ============================================
// EditorManager - Manages editor state
// ============================================
const EditorManager = {
    editor: null,
    preview: null,
    charCountEl: null,
    urlLengthEl: null,
    urlWarningEl: null,
    updateTimer: null,

    // Constants
    DEBOUNCE_DELAY: 500,        // 500ms delay before updating URL
    URL_WARNING_THRESHOLD: 2000, // Warn when URL exceeds 2000 chars

    /**
     * Initializes the editor and sets up event listeners
     */
    initialize() {
        this.editor = document.getElementById("markdownEditor");
        this.preview = document.getElementById("markdownPreview");
        this.charCountEl = document.getElementById("charCount");
        this.urlLengthEl = document.getElementById("urlLength");
        this.urlWarningEl = document.getElementById("urlWarning");

        // Load content from URL on page load
        this.loadFromURL();

        // Set up input listener with debouncing
        this.editor.addEventListener("input", () => this.handleInput());

        // Listen for hash changes (back/forward navigation)
        window.addEventListener("hashchange", () => this.loadFromURL());
    },

    /**
     * Handles editor input with debouncing
     * Updates preview immediately, but debounces URL updates
     */
    handleInput() {
        const content = this.editor.value;

        // Update preview immediately for responsive feel
        this.updatePreview(content);

        // Update character count
        this.updateCharCount(content);

        // Debounce URL updates to avoid excessive history changes
        clearTimeout(this.updateTimer);
        this.updateTimer = setTimeout(() => {
            this.updateURL(content);
        }, this.DEBOUNCE_DELAY);
    },

    /**
     * Updates the Markdown preview
     * @param {string} content - The Markdown content to preview
     */
    updatePreview(content) {
        const html = MarkdownEngine.parse(content);
        this.preview.innerHTML = html;
    },

    /**
     * Updates the character count display
     * @param {string} content - The current editor content
     */
    updateCharCount(content) {
        const count = content.length;
        this.charCountEl.textContent = `${count.toLocaleString()} character${count !== 1 ? "s" : ""}`;
    },

    /**
     * Updates the URL fragment with current content
     * @param {string} content - The content to encode in URL
     */
    updateURL(content) {
        URLCodec.setToURL(content);
        this.updateURLLength();
        this.checkURLLength();
    },

    /**
     * Updates the URL length display in footer
     */
    updateURLLength() {
        const urlLength = window.location.href.length;
        this.urlLengthEl.textContent = `URL: ${urlLength.toLocaleString()} chars`;
    },

    /**
     * Checks URL length and shows warning if too long
     */
    checkURLLength() {
        const urlLength = window.location.href.length;
        if (urlLength > this.URL_WARNING_THRESHOLD) {
            this.urlWarningEl.classList.remove("hidden");
        } else {
            this.urlWarningEl.classList.add("hidden");
        }
    },

    /**
     * Loads content from URL fragment on page load
     */
    loadFromURL() {
        const content = URLCodec.getFromURL();
        if (content) {
            this.editor.value = content;
            this.updatePreview(content);
            this.updateCharCount(content);
            this.updateURLLength();
            this.checkURLLength();
        }
    },

    /**
     * Gets the current editor content
     * @returns {string} Current editor content
     */
    getContent() {
        return this.editor.value;
    },

    /**
     * Sets the editor content
     * @param {string} content - Content to set
     */
    setContent(content) {
        this.editor.value = content;
        this.handleInput();
    },

    /**
     * Clears all editor content
     */
    clear() {
        this.setContent("");
        window.history.replaceState(null, "", window.location.pathname);
        this.updateURLLength();
        this.checkURLLength();
    }
};

// ============================================
// ThemeManager - Manages light/dark mode
// ============================================
const ThemeManager = {
    STORAGE_KEY: "linknote-theme",
    currentTheme: "light",

    /**
     * Initializes theme from localStorage or system preference
     */
    initialize() {
        // Check if theme was previously saved (localStorage is OK for theme preference)
        // Note: We only use localStorage for theme, not document content
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);

        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Detect system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            this.currentTheme = prefersDark ? "dark" : "light";
        }

        this.applyTheme();

        // Listen for system theme changes
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.currentTheme = e.matches ? "dark" : "light";
                this.applyTheme();
            }
        });
    },

    /**
     * Applies the current theme to the document
     */
    applyTheme() {
        document.documentElement.setAttribute("data-theme", this.currentTheme);
    },

    /**
     * Toggles between light and dark themes
     */
    toggle() {
        this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
        this.applyTheme();
        localStorage.setItem(this.STORAGE_KEY, this.currentTheme);
    }
};

// ============================================
// UIController - Manages UI interactions
// ============================================
const UIController = {
    copyBtn: null,
    clearBtn: null,
    themeToggleBtn: null,
    toastEl: null,

    /**
     * Initializes UI controls and event listeners
     */
    initialize() {
        this.copyBtn = document.getElementById("copyUrlBtn");
        this.clearBtn = document.getElementById("clearBtn");
        this.themeToggleBtn = document.getElementById("themeToggle");
        this.toastEl = document.getElementById("toast");

        // Set up button click handlers
        this.copyBtn.addEventListener("click", () => this.copyURL());
        this.clearBtn.addEventListener("click", () => this.confirmClear());
        this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    },

    /**
     * Copies the current URL to clipboard
     */
    async copyURL() {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            this.showToast("✓ URL copied to clipboard!");
        } catch (error) {
            console.error("Copy failed:", error);
            // Fallback for older browsers
            this.fallbackCopyURL(url);
        }
    },

    /**
     * Fallback method for copying URL (for older browsers)
     * @param {string} text - Text to copy
     */
    fallbackCopyURL(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand("copy");
            this.showToast("✓ URL copied to clipboard!");
        } catch (error) {
            this.showToast("✗ Failed to copy URL");
        }
        document.body.removeChild(textArea);
    },

    /**
     * Confirms before clearing content
     */
    confirmClear() {
        const content = EditorManager.getContent();
        if (content.trim() === "") {
            this.showToast("Editor is already empty");
            return;
        }

        const confirmed = confirm(
            "Are you sure you want to clear all content?\n\n" +
            "This will erase your current document. Make sure you've saved the URL if you want to keep it."
        );

        if (confirmed) {
            EditorManager.clear();
            this.showToast("✓ Content cleared");
        }
    },

    /**
     * Toggles the theme
     */
    toggleTheme() {
        ThemeManager.toggle();
        const theme = ThemeManager.currentTheme;
        this.showToast(`${theme === "dark" ? "🌙" : "☀️"} ${theme.charAt(0).toUpperCase() + theme.slice(1)} mode`);
    },

    /**
     * Shows a toast notification
     * @param {string} message - Message to display
     * @param {number} duration - How long to show toast (ms)
     */
    showToast(message, duration = 2000) {
        this.toastEl.textContent = message;
        this.toastEl.classList.remove("hidden");

        setTimeout(() => {
            this.toastEl.classList.add("hidden");
        }, duration);
    }
};

// ============================================
// Application initialization
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all modules
    MarkdownEngine.initialize();
    ThemeManager.initialize();
    EditorManager.initialize();
    UIController.initialize();

    console.log("LinkNote initialized successfully");
    console.log("Privacy mode: ON - No data sent to servers");
});

// ============================================
// Error handling
// ============================================
window.addEventListener("error", (event) => {
    console.error("Application error:", event.error);
    // Don't expose errors to user in production, but log for debugging
});

// Prevent data loss on accidental navigation
window.addEventListener("beforeunload", (event) => {
    const content = EditorManager.getContent();
    if (content.trim() !== "" && !window.location.hash) {
        // Warn user if they have content but haven't saved it to URL
        event.preventDefault();
        event.returnValue = "You have unsaved content. Make sure you've copied the URL before leaving.";
    }
});
