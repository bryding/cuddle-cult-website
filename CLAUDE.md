# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Development: Open index.html directly in a browser (no build needed)
- Server: To serve the site locally, use `python -m http.server` or `npx serve`
- Lint: While no formal linting tool, validate HTML using the W3C validator

## Code Style Guidelines
- HTML: Use semantic HTML5 elements, maintain proper indentation (4 spaces)
- CSS: Follow existing variable patterns in `:root`, group related styles
- JavaScript:
  - Function and variable names use camelCase
  - Modular design (components.js, calendar.js, main.js)
  - Use ES6+ syntax including arrow functions and template literals
  - Add JSDoc comments for functions
  - Error handling should show user-friendly messages

## File Organization
- Place all styles in public/css/styles.css
- JavaScript files belong in public/js/
- Images should be optimized and stored in public/images/
- Keep HTML files in the root directory
- Remember footer and nav and other common components are defined in the js