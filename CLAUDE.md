# Stoll Studio Themes — Shared Theming System

## What This Repo Is

This is the **single source of truth** for the stoll.studio theming system. It provides CSS custom properties and theme-switching logic used by all stoll.studio websites via git submodule (`_themes/`).

## Key Files

- `css/themes.css` — All theme definitions (light, dark, vibrant, rating) as CSS custom properties
- `js/theme-switcher.js` — URL-parameter-based theme switching logic
- `README.md` — Usage guide for consuming sites
- `THEME_OVERVIEW.md` — Comprehensive token reference and theme comparison

## Theme Names

Themes are named by **visual character**, not by which site uses them:

| Theme | Selector | Description |
|-------|----------|-------------|
| light | `:root` (default) | Light surface, yellow accent bar |
| dark | `[data-theme="dark"]` | Dark surface, blue accent bar |
| vibrant | `[data-theme="vibrant"]` | Vibrant blue, pink/lime accents |
| rating | `[data-theme="rating"]` | Clean minimal for assessment tools |

## Documentation Sync Rule

**Every change to this repo requires documentation updates in multiple places.** Before committing, verify ALL of these are updated:

### When changing themes, tokens, or switcher logic:

1. **`README.md`** (this repo) — canonical theme system reference
2. **`THEME_OVERVIEW.md`** (this repo) — comprehensive token reference
3. **`christophe.stoll.studio/_pages/designsystem.md`** — living design system docs (tokens, colors, changelog entry)
4. **`christophe.stoll.studio/README.md`** — developer reference (architecture, conventions)
5. **`teaching.stoll.studio/README.md`** — teaching site reference (available themes, variables)

### After pushing this repo:

Update the submodule reference in both consuming sites:

```bash
# christophe.stoll.studio
cd /path/to/christophe.stoll.studio
git submodule update --remote _themes
git add _themes && git commit -m "Update themes submodule"

# teaching.stoll.studio
cd /path/to/teaching.stoll.studio
git submodule update --remote _themes
git add _themes && git commit -m "Update themes submodule"
```

## Important Naming Notes

- `--space-gap-default` is a **spacing variable**, NOT a theme reference — do not rename
- `layout: default` in Jekyll is a **layout name**, NOT a theme reference — do not rename
- Liquid filters like `| default:` are **template filters**, NOT theme references — do not rename

## CSS Architecture

Three-tier token system — when creating or modifying themes, only override **base color** values. Semantic and component tokens inherit automatically:

```
Base Colors       → Actual hex/rgba values (--color-primary, --color-accent-1)
Semantic Tokens   → Reference base colors (--color-link: var(--color-info))
Component Tokens  → Reference base/semantic (--color-sticky-bar-bg: var(--color-accent-1))
```

## Sites Using This System

- [stoll.studio](https://stoll.studio) — Personal portfolio (defaults to light theme)
- [teaching.stoll.studio](https://teaching.stoll.studio) — Teaching resources (defaults to vibrant theme)
