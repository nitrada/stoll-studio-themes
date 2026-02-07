# Stoll Studio Themes

Shared theming system for all stoll.studio websites.

## Contents

- `css/themes.css` - Theme definitions with CSS custom properties
- `js/theme-switcher.js` - URL-based theme switching logic

## Available Themes

- **default** - Light theme with Figtree typography
- **dark** - Dark theme with Hanken Grotesk typography
- **teaching** - Vibrant blue theme (#3D38F5) with pink (#FF0080) and lime (#D4FF00) accents, Hanken Grotesk typography
- **rating** - Clean minimal theme for assessment/rating tools (white background, black text, red accent)

## Usage

### As a Git Submodule

Add to your Jekyll site:

```bash
cd your-site-repo
git submodule add https://github.com/yourusername/stoll-studio-themes.git _themes
```

### In Your Layout

#### 1. Include the CSS

```html
<link rel="stylesheet" href="{{ '/_themes/css/themes.css' | relative_url }}">
```

#### 2. Add Critical Inline Script (Prevents FOUC)

```html
<script>
  (function() {
    const params = new URLSearchParams(window.location.search);
    const theme = params.get('theme');
    if (theme && theme !== 'default') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  })();
</script>
```

#### 3. Include Theme Switcher JS

```html
<script src="{{ '/_themes/js/theme-switcher.js' | relative_url }}"></script>
```

#### 4. Use Theme Variables in Inline Styles

Replace hardcoded colors with CSS variables:

```html
<style>
  .bar {
    background-color: var(--color-sticky-bar-bg);
    color: var(--color-sticky-bar-text);
  }
</style>
```

## Viewing Themes

Access any theme via URL parameter:

```plaintext
https://your-site.com?theme=default
https://your-site.com?theme=dark
https://your-site.com?theme=teaching
https://your-site.com?theme=rating
```

## Creating New Themes

1. Edit `css/themes.css`
2. Copy an existing theme block (e.g., `[data-theme="dark"]`)
3. Rename to your new theme name: `[data-theme="yourtheme"]`
4. Update all CSS custom property values
5. Test with `?theme=yourtheme`

## Updating Themes in Your Site

```bash
cd your-site-repo
git submodule update --remote _themes
git add _themes
git commit -m "Update themes to latest version"
```

## Development Workflow

### Making Theme Changes

```bash
# 1. Edit themes in the shared repo
cd stoll-studio-themes
# Make your changes to css/themes.css or js/theme-switcher.js

# 2. Commit and push
git add .
git commit -m "Add new theme / Update colors"
git push

# 3. Update in each site
cd ../christophe.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update to latest themes"
git push

cd ../teaching.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update to latest themes"
git push
```

## Theme Variables

### Colors (30+ variables)

- Text: `--color-primary`, `--color-secondary`, `--color-tertiary`, etc.
- Accents: `--color-accent-1`, `--color-accent-2`
- Surfaces: `--color-surface`, `--color-surface-emphasized`
- Semantic: `--color-info`, `--color-success`, `--color-error`, `--color-warning`
- Interactive: `--color-link`, `--color-link-hover`

### Typography (12+ variables)

- Font families: `--font-primary`, `--font-monospace`, `--font-navigation`
- Font sizes: `--font-size-h1` through `--font-size-small`
- Font weights: `--font-weight-light` through `--font-weight-bold`
- Line heights: `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

### Spacing (10+ variables)

- Base scale: `--space-xs` through `--space-3xl`
- Component spacing: `--space-gap-small`, `--space-container-padding`, etc.

## License

MIT License - Use freely across all stoll.studio sites.

---

**Version:** 1.0.0
**Last Updated:** 2026-02-07
