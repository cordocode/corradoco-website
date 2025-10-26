Corrado co project brief · MD
Copy

# Corrado & Co. Website - Technical Brief

## Project Overview
Building a minimal, Fontshare-inspired website for Corrado & Co. (automation consulting business) using React.

## Critical Technical Details

### Project Location
- **Project Directory:** `/users/cordo/documents/corradoco_web`
- **Framework:** React (Create React App)
- **Development Server:** http://localhost:3000

### File Structure
```
corradoco_web/
├── public/
│   └── index.html (contains Fontshare font link in <head>)
├── src/
│   ├── assets/ (all logo and image files)
│   ├── components/
│   │   ├── Header.js
│   │   └── Header.css
│   ├── App.js
│   └── App.css
```

### Assets
- **Location:** `src/assets/`
- **Primary Logo:** `LOGO_BLACK_TRANSPARENT_CORRADO_CO.svg`
- **Also Available:** Icon versions, white versions, PNG fallbacks

### Global Styles (App.css)
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Array', sans-serif;
  color: #4a4a4a;
}

.App {
  min-height: 100vh;
  background-color: #ffffe2;
}
```

### Fonts
- **Khand (400):** Headlines and display text
- **Array (400):** Body text and UI elements
- **CDN Link:** Added to `public/index.html`

### Color Palette
- Primary Background: `#ffffe2` (warm beige)
- Secondary Background: `#fafaf9` (soft cream)
- Primary Text: `#1a1a1a` (deep charcoal)
- Body Text: `#4a4a4a` (medium gray)
- Subtle Text: `#8a8a8a` (light gray)
- Accent 1: `#d4a574` (soft terracotta - CTAs)
- Accent 2: `#b5c4a1` (muted sage - success states)

## Completed Components

### Header
- ✅ Three equal columns with vertical divider lines
- ✅ Logo (left), Home (center), Blog (right)
- ✅ Fontshare-style minimal aesthetic
- ✅ Responsive design
- ✅ Logo positioned with margin-left for fine-tuning

## What's Next (In Order)

1. **Hero Section**
   - Headline: "Your Partner in Custom Automation."
   - Subheadline with centered text
   
2. **Interactive Calculator + AI Chat Section**
   - Three sliders (hours saved, employees, salary)
   - Dynamic value calculation
   - Chat interface that replaces calculator after interaction
   - Form collection for leads

3. **About Us Section**
   - Paragraph content (to be written)
   - Accompanying image

4. **Who We Serve Section**
   - Logo carousel with infinite scroll

5. **Footer**
   - Three-column mirror of header
   - Contact information

## Key Design Decisions
- **Max-width container:** 1400px centered
- **Section separation:** Thin horizontal lines
- **Mobile breakpoint:** 768px
- **Animation style:** Smooth, subtle (no flashy effects)
- **Typography:** Strong hierarchy, generous whitespace

## Working Method
- Build one section at a time
- Get confirmation before moving to next section
- Always provide complete file contents (not partial updates)
- All development done locally in VSCode and terminal

## Reference Documents
- `STYLE_GUIDE.pdf` - Complete style specifications
- `CONTENT_SPEC.pdf` - Detailed content and interaction requirements