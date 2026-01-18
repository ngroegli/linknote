# Branding Updates

**Date**: January 18, 2026

## Changes Made

### Color Scheme
- **Primary Brand Color**: `#001a70` (Deep Blue)
- **Secondary Colors**: 
  - Light: `#0d2d8f`
  - Lighter: `#1a3fa5`
  - Dark: `#00123d`
  - Accent (dark mode): `#4a7eff`

### Light Mode
- Background: White (`#ffffff`)
- Secondary bg: `#f8f9fb`
- Text: `#001a70` (brand blue)
- Borders: `#d1d5db`

### Dark Mode
- Background: `#0a0f1e` (very dark blue)
- Secondary bg: `#121827`
- Text: `#f8f9fb` (off-white)
- Accent: `#4a7eff` (lighter blue for readability)

### Typography
- **Font Family**: Montserrat (via Google Fonts)
- **Weights Used**: 300, 400, 500, 600, 700
- **Loaded from**: Google Fonts CDN with preconnect optimization

### Logo & Icons
- Created `logo.svg` - 32x32px logo for header
- Created `favicon.svg` - SVG favicon with link chain design
- Logo colors: `#001a70` with white elements
- Logo displays next to "LinkNote" title in header

### Assets Directory Structure
```
src/assets/
├── logo.svg              # Header logo (32x32)
├── favicon.svg           # SVG favicon
├── favicon-16x16.png     # (to be generated)
├── favicon-32x32.png     # (to be generated)
├── apple-touch-icon.png  # (to be generated)
├── icon_dark.png         # Existing dark mode icon
├── icon_light.png        # Existing light mode icon
└── README.md             # Asset documentation
```

### UI Updates
1. **Header**: 
   - Logo + title combination
   - Brand blue color for title
   - Cleaner spacing

2. **Buttons**:
   - Updated to use brand blue
   - Font weight: 600 (semi-bold)
   - Montserrat font family

3. **Theme Colors**:
   - Light mode uses white and brand blue
   - Dark mode uses dark blue tones with lighter blue accents
   - Smooth transitions between themes

## Browser Compatibility

All changes maintain compatibility with:
- Chrome 51+
- Firefox 48+
- Safari 10+
- Edge 79+

## Next Steps

To complete the branding:

1. **Generate PNG Favicons** (optional but recommended):
   ```bash
   # Using ImageMagick
   cd src/assets
   convert -background none favicon.svg -resize 16x16 favicon-16x16.png
   convert -background none favicon.svg -resize 32x32 favicon-32x32.png
   convert -background none favicon.svg -resize 180x180 apple-touch-icon.png
   ```

2. **Custom Logo** (if desired):
   - Edit `src/assets/logo.svg` in a vector editor
   - Maintain 32x32px size
   - Use brand colors

3. **Social Media Cards** (future):
   - Create Open Graph image
   - Twitter card image
   - Add meta tags to HTML

## Files Modified

- `src/styles.css` - Updated color variables and font family
- `src/index.html` - Added Google Fonts link, favicon links, and logo
- `src/assets/logo.svg` - Created
- `src/assets/favicon.svg` - Created
- `src/assets/README.md` - Created with instructions

## Testing

Test the following:
- [ ] Logo displays correctly in header
- [ ] Favicon shows in browser tab
- [ ] Colors work in light mode
- [ ] Colors work in dark mode
- [ ] Theme toggle maintains branding
- [ ] Montserrat font loads properly
- [ ] All buttons use brand colors
- [ ] Text is readable in both themes
