# Stoll Studio Themes

Shared theming system for all stoll.studio websites. One source of truth for colors, typography, and visual identity across multiple sites.

## Contents

- `css/themes.css` - Theme definitions with CSS custom properties
- `js/theme-switcher.js` - URL-based theme switching logic

## Available Themes

- **light** - Light theme with Figtree typography
- **dark** - Dark theme with Hanken Grotesk typography
- **vibrant** - Vibrant blue theme (#3D38F5) with pink (#FF0080) and lime (#D4FF00) accents
- **terminal** - Terminal theme with bright green (#00FF41) text on black, IBM Plex Mono throughout

## Sites Using This System

- [stoll.studio](https://stoll.studio) - Personal portfolio
- [vibrant.stoll.studio](https://vibrant.stoll.studio) - Teaching resources

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
    if (theme && theme !== 'light') {
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
https://your-site.com?theme=light
https://your-site.com?theme=dark
https://your-site.com?theme=vibrant
https://your-site.com?theme=terminal
```

## Creating New Themes

1. Edit `css/themes.css`
2. Copy an existing theme block (e.g., `[data-theme="dark"]`)
3. Rename to your new theme name: `[data-theme="yourtheme"]`
4. Update all CSS custom property values
5. Test with `?theme=yourtheme`
6. Update documentation in all consuming sites (see Documentation Rule below)

## Documentation Rule

**Always keep all documentation in sync.** When changing themes, tokens, or the switcher, update:

1. **This README** — the canonical theme system reference
2. **`stoll.studio/_pages/designsystem.md`** — living design system docs (tokens, colors, changelog)
3. **`stoll.studio/README.md`** — developer reference (architecture, conventions)
4. **`vibrant.stoll.studio/README.md`** — vibrant site reference (available themes, variables)

## Development Workflow

### Making Theme Changes

#### Step 1: Edit the shared themes repo

```bash
cd /path/to/stoll-studio-themes
# Make your changes to css/themes.css or js/theme-switcher.js
git add .
git commit -m "Add new theme / Update colors"
git push
```

#### Step 2: Update all consuming sites

```bash
# Update christophe.stoll.studio
cd /path/to/christophe.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update to latest themes"
git push

# Update vibrant.stoll.studio
cd /path/to/vibrant.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update to latest themes"
git push
```

### Quick Update (Single Site)

If you only need to pull latest themes into one site:

```bash
cd your-site-repo
git submodule update --remote _themes
git add _themes
git commit -m "Update themes to latest version"
git push
```

## Theme Variables

### Colors (30+ variables)

- Text: `--color-primary`, `--color-secondary`, `--color-tertiary`, etc.
- Accents: `--color-accent-1`, `--color-accent-2`
- Surfaces: `--color-surface`, `--color-surface-emphasized`
- Semantic: `--color-info`, `--color-success`, `--color-error`, `--color-warning`
- Dividers: `--color-divider` (structural dividers: hr, borders, table rows)
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

**Version:** 1.1.0
**Last Updated:** 2026-02-12
