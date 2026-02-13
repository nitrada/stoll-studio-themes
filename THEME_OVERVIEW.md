# Theme Token Overview

Complete reference for all CSS custom properties across all themes.

## Theme Architecture

The theme system uses a **three-tier token hierarchy**:

1. **Base Colors** - Raw color values (hex/rgba) defined per theme
2. **Semantic Tokens** - Reference base colors for specific purposes (e.g., links, bullets, meta text)
3. **Component Tokens** - Reference base/semantic colors for specific UI components

This architecture means:
- ✅ **Changing a base color automatically updates** all semantic and component tokens that reference it
- ✅ **Adding a new theme only requires** defining base color values
- ✅ **No duplicate color values** across the system

---

## Theme Summary

| Theme | Background | Primary Text | Primary Font | Use Case |
|-------|-----------|--------------|--------------|----------|
| **light** | <span style="background:#ffffff;color:#313131;padding:2px 8px;border:1px solid #ccc">White</span> | <span style="background:#313131;color:#fff;padding:2px 8px">Dark gray</span> | Figtree | Personal portfolio, light reading |
| **dark** | <span style="background:#1a1a1a;color:#fff;padding:2px 8px">Near black</span> | <span style="background:#ffffff;color:#000;padding:2px 8px;border:1px solid #ccc">White</span> | Hanken Grotesk | Night mode, reduced eye strain |
| **vibrant** | <span style="background:#3D38F5;color:#fff;padding:2px 8px">Vibrant blue</span> | <span style="background:#ffffff;color:#000;padding:2px 8px;border:1px solid #ccc">White</span> | Hanken Grotesk | Educational content, high energy |
| **terminal** | <span style="background:#000;color:#00FF41;padding:2px 8px;border:1px solid #00FF41">Black</span> | <span style="background:#00FF41;color:#000;padding:2px 8px">Terminal green</span> | IBM Plex Mono | Developer tools, code focus, retro aesthetic |

---

## Base Color Tokens

**These are the ONLY tokens with actual color values.** All other color tokens reference these.

### Text Colors

| Token | Light | Dark | Vibrant | Terminal | Purpose |
|-------|---------|------|----------|----------|---------|
| `--color-primary` | <span style="background:#313131;color:#fff;padding:2px 8px">#313131</span> | <span style="background:#ffffff;color:#000;padding:2px 8px;border:1px solid #ccc">#ffffff</span> | <span style="background:#ffffff;color:#000;padding:2px 8px;border:1px solid #ccc">#ffffff</span> | <span style="background:#00FF41;color:#000;padding:2px 8px">#00FF41</span> | Main headings |
| `--color-secondary` | <span style="background:#515151;color:#fff;padding:2px 8px">#515151</span> | <span style="background:#e0e0e0;color:#000;padding:2px 8px">#e0e0e0</span> | <span style="background:rgba(255,255,255,0.75);color:#000;padding:2px 8px;border:1px solid #ccc">rgba(255,255,255,0.75)</span> | <span style="background:#00D936;color:#000;padding:2px 8px">#00D936</span> | Body text |
| `--color-tertiary` | <span style="background:#7a7a7a;color:#fff;padding:2px 8px">#7a7a7a</span> | <span style="background:#b0b0b0;color:#000;padding:2px 8px">#b0b0b0</span> | <span style="background:rgba(255,255,255,0.6);color:#000;padding:2px 8px;border:1px solid #ccc">rgba(255,255,255,0.6)</span> | <span style="background:#00B32D;color:#000;padding:2px 8px">#00B32D</span> | Muted text |
| `--color-quaternary` | <span style="background:#9a9a9a;color:#fff;padding:2px 8px">#9a9a9a</span> | <span style="background:#808080;color:#fff;padding:2px 8px">#808080</span> | <span style="background:rgba(255,255,255,0.45);color:#000;padding:2px 8px;border:1px solid #ccc">rgba(255,255,255,0.45)</span> | <span style="background:#009926;color:#fff;padding:2px 8px">#009926</span> | Very muted (dates, etc.) |
| `--color-light` | <span style="background:#c0c0c0;color:#000;padding:2px 8px">#c0c0c0</span> | <span style="background:#606060;color:#fff;padding:2px 8px">#606060</span> | <span style="background:rgba(255,255,255,0.3);color:#000;padding:2px 8px;border:1px solid #ccc">rgba(255,255,255,0.3)</span> | <span style="background:#007A1F;color:#fff;padding:2px 8px">#007A1F</span> | Very light text (taglines) |

### Accent Colors

| Token | Light | Dark | Vibrant | Terminal | Purpose |
|-------|---------|------|----------|----------|---------|
| `--color-accent-1` | <span style="background:#ffff00;color:#000;padding:2px 8px;border:1px solid #ccc">#ffff00</span> | <span style="background:#ffff00;color:#000;padding:2px 8px;border:1px solid #ccc">#ffff00</span> | <span style="background:#FF0080;color:#fff;padding:2px 8px">#FF0080</span> | <span style="background:#FFFF00;color:#000;padding:2px 8px;border:1px solid #ccc">#FFFF00</span> | Primary brand accent |
| `--color-accent-2` | <span style="background:#ff0000;color:#fff;padding:2px 8px">#ff0000</span> | <span style="background:#5dade2;color:#fff;padding:2px 8px">#5dade2</span> | <span style="background:#D4FF00;color:#000;padding:2px 8px">#D4FF00</span> | <span style="background:#00FFFF;color:#000;padding:2px 8px">#00FFFF</span> | Secondary accent |

### Surface Colors

| Token | Light | Dark | Vibrant | Terminal | Purpose |
|-------|---------|------|----------|----------|---------|
| `--color-surface` | <span style="background:#ffffff;color:#000;padding:2px 8px;border:1px solid #ccc">#ffffff</span> | <span style="background:#1a1a1a;color:#fff;padding:2px 8px">#1a1a1a</span> | <span style="background:#3D38F5;color:#fff;padding:2px 8px">#3D38F5</span> | <span style="background:#000000;color:#00FF41;padding:2px 8px;border:1px solid #00FF41">#000000</span> | Main background |
| `--color-surface-emphasized` | <span style="background:#f5f5f5;color:#000;padding:2px 8px;border:1px solid #ccc">#f5f5f5</span> | <span style="background:#2a2a2a;color:#fff;padding:2px 8px">#2a2a2a</span> | <span style="background:#312CDB;color:#fff;padding:2px 8px">#312CDB</span> | <span style="background:#0A0A0A;color:#00FF41;padding:2px 8px;border:1px solid #00FF41">#0A0A0A</span> | Table headers, cards |
| `--color-surface-secondary` | <span style="background:#f9f9f9;color:#000;padding:2px 8px;border:1px solid #ccc">#f9f9f9</span> | <span style="background:#242424;color:#fff;padding:2px 8px">#242424</span> | <span style="background:#4942F7;color:#fff;padding:2px 8px">#4942F7</span> | <span style="background:#050505;color:#00FF41;padding:2px 8px;border:1px solid #00FF41">#050505</span> | Code blocks, blockquotes |

### Border Colors

| Token | Light | Dark | Vibrant | Terminal | Purpose |
|-------|---------|------|----------|----------|---------|
| `--color-border` | <span style="background:#eee;color:#000;padding:2px 8px;border:1px solid #ccc">#eee</span> | <span style="background:#333;color:#fff;padding:2px 8px">#333</span> | <span style="background:rgba(255,255,255,0.15);color:#fff;padding:2px 8px;border:1px solid #ccc">rgba(255,255,255,0.15)</span> | <span style="background:rgba(0,255,65,0.15);color:#00FF41;padding:2px 8px;border:1px solid #00FF41">rgba(0,255,65,0.15)</span> | Primary borders |
| `--color-border-secondary` | <span style="background:#e5e5e5;color:#000;padding:2px 8px;border:1px solid #ccc">#e5e5e5</span> | <span style="background:#444;color:#fff;padding:2px 8px">#444</span> | <span style="background:rgba(255,255,255,0.2);color:#fff;padding:2px 8px;border:1px solid #ccc">rgba(255,255,255,0.2)</span> | <span style="background:rgba(0,255,65,0.2);color:#00FF41;padding:2px 8px;border:1px solid #00FF41">rgba(0,255,65,0.2)</span> | Secondary borders |

### Semantic Colors (Base)

| Token | Light | Dark | Vibrant | Terminal | Purpose |
|-------|---------|------|----------|----------|---------|
| `--color-info` | <span style="background:#268bd2;color:#fff;padding:2px 8px">#268bd2</span> | <span style="background:#5dade2;color:#fff;padding:2px 8px">#5dade2</span> | <span style="background:#69A0FF;color:#fff;padding:2px 8px">#69A0FF</span> | <span style="background:#00BFFF;color:#000;padding:2px 8px">#00BFFF</span> | Informational (blue) |
| `--color-success` | <span style="background:#27ae60;color:#fff;padding:2px 8px">#27ae60</span> | <span style="background:#2ecc71;color:#fff;padding:2px 8px">#2ecc71</span> | <span style="background:#00FF33;color:#000;padding:2px 8px">#00FF33</span> | <span style="background:#00FF41;color:#000;padding:2px 8px">#00FF41</span> | Success states (green) |
| `--color-error` | <span style="background:#e74c3c;color:#fff;padding:2px 8px">#e74c3c</span> | <span style="background:#e74c3c;color:#fff;padding:2px 8px">#e74c3c</span> | <span style="background:#FF3366;color:#fff;padding:2px 8px">#FF3366</span> | <span style="background:#FF0000;color:#fff;padding:2px 8px">#FF0000</span> | Error states (red) |
| `--color-warning` | <span style="background:#f39c12;color:#fff;padding:2px 8px">#f39c12</span> | <span style="background:#f39c12;color:#fff;padding:2px 8px">#f39c12</span> | <span style="background:#FFB800;color:#000;padding:2px 8px">#FFB800</span> | <span style="background:#FFFF00;color:#000;padding:2px 8px">#FFFF00</span> | Warning states (orange) |

### Pure Black & White

| Token | All Themes | Purpose |
|-------|-----------|---------|
| `--color-black` | <span style="background:#000;color:#fff;padding:2px 8px">#000</span> | Pure black for high contrast |
| `--color-white` | <span style="background:#fff;color:#000;padding:2px 8px;border:1px solid #ccc">#fff</span> | Pure white for high contrast |

---

## Semantic Tokens (References)

**These tokens reference base colors** and can be overridden per theme if needed.

### Interactive

| Token | Light | Dark | Vibrant | Terminal | References |
|-------|---------|------|----------|----------|-----------|
| `--color-link` | `var(--color-info)` | `var(--color-info)` | `var(--color-accent-2)` | `var(--color-accent-2)` | Link text |
| `--color-link-hover` | `var(--color-info)` | `#7fc4ed` (custom) | `#E5FF33` (custom) | `#66FFFF` (custom) | Link hover state |

### Decorative

| Token | Light | Dark | Vibrant | Terminal | References |
|-------|---------|------|----------|----------|-----------|
| `--color-bullet` | `var(--color-tertiary)` | Inherits | `rgba(255,255,255,0.4)` (custom) | `rgba(0,255,65,0.4)` (custom) | List bullets |
| `--color-code` | `var(--color-accent-2)` | Inherits | `var(--color-accent-1)` | `var(--color-accent-1)` | Inline code text |

### Meta Text

| Token | Light | Dark | Vibrant | Terminal | References |
|-------|---------|------|----------|----------|-----------|
| `--color-meta` | `var(--color-tertiary)` | Inherits | `rgba(255,255,255,0.5)` (custom) | `rgba(0,255,65,0.5)` (custom) | Metadata, captions |
| `--color-meta-secondary` | `var(--color-quaternary)` | Inherits | `rgba(255,255,255,0.6)` (custom) | `rgba(0,255,65,0.6)` (custom) | Secondary metadata |

---

## Component Tokens (References)

**These tokens reference base/semantic colors** for specific UI components.

### Sticky Bar

| Token | Light | Dark | Vibrant | Terminal | References |
|-------|---------|------|----------|----------|-----------|
| `--color-sticky-bar-bg` | `var(--color-accent-1)` | Inherits | `var(--color-accent-1)` | `var(--color-primary)` | Background |
| `--color-sticky-bar-text` | `var(--color-black)` | Inherits | `var(--color-white)` | `var(--color-black)` | Text color |

### Blockquote

| Token | Light | Dark | Vibrant | Terminal | References |
|-------|---------|------|----------|----------|-----------|
| `--color-blockquote-bg` | `var(--color-surface-secondary)` | Inherits | Inherits | Inherits | Background |
| `--color-blockquote-border` | `var(--color-accent-1)` | Inherits | `var(--color-accent-1)` | `var(--color-accent-1)` | Left border |

### Skip Link (Accessibility)

| Token | Light | Dark | Vibrant | Terminal | References |
|-------|---------|------|----------|----------|-----------|
| `--color-skip-link-bg` | `var(--color-black)` | Inherits | `var(--color-accent-1)` | `var(--color-accent-1)` | Background |
| `--color-skip-link-text` | `var(--color-white)` | Inherits | `var(--color-white)` | `var(--color-black)` | Text color |

---

## Typography Tokens

### Font Families

| Token | Light | Dark | Vibrant | Terminal |
|-------|---------|------|----------|----------|
| `--font-primary` | Figtree | Hanken Grotesk | Hanken Grotesk | IBM Plex Mono |
| `--font-monospace` | IBM Plex Mono | IBM Plex Mono | IBM Plex Mono | IBM Plex Mono |
| `--font-navigation` | IBM Plex Mono | IBM Plex Mono | IBM Plex Mono | IBM Plex Mono |

### Font Sizes (identical across all themes)

| Token | Value | Pixel Equivalent |
|-------|-------|------------------|
| `--font-size-base` | 1rem | 20px |
| `--font-size-small` | 0.8rem | 16px |
| `--font-size-medium` | 0.85rem | 17px |
| `--font-size-body` | 1rem | 20px |
| `--font-size-nav` | 1rem | 20px |
| `--font-size-h6` | 1rem | 20px |
| `--font-size-h5` | 1rem | 20px |
| `--font-size-h4` | 1rem | 20px |
| `--font-size-h3` | 1.25rem | 25px |
| `--font-size-h2` | 1.3rem | 26px |
| `--font-size-h1` | 2rem | 40px |
| `--font-size-masthead` | 1.5rem | 30px |

### Font Weights (identical across all themes)

| Token | Value |
|-------|-------|
| `--font-weight-light` | 300 |
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 600 |

### Line Heights (identical across all themes)

| Token | Value |
|-------|-------|
| `--line-height-tight` | 1.25 |
| `--line-height-normal` | 1.5 |
| `--line-height-relaxed` | 1.6 |

---

## Spacing Tokens (identical across all themes)

### Base Spacing Scale

| Token | Value | Pixel Equivalent | Use Case |
|-------|-------|------------------|----------|
| `--space-xs` | 0.25rem | 5px | Tight spacing |
| `--space-sm` | 0.5rem | 10px | Small gaps |
| `--space-md` | 1rem | 20px | Standard spacing |
| `--space-lg` | 1.5rem | 30px | Section spacing |
| `--space-xl` | 2rem | 40px | Large spacing |
| `--space-2xl` | 2.5rem | 50px | Section dividers |
| `--space-3xl` | 3rem | 60px | Masthead margin |

### Component-Specific Spacing

| Token | Value | Pixel Equivalent |
|-------|-------|------------------|
| `--space-gap-small` | 0.5rem | 10px |
| `--space-gap-default` | 1rem | 20px |
| `--space-gap-large` | 2rem | 40px |
| `--space-container-padding` | 1rem | 20px |
| `--space-sticky-bar-padding` | 1.2em | ~24px |

### Container

| Token | Value | Pixel Equivalent |
|-------|-------|------------------|
| `--container-max-width` | 50rem | 1000px |

---

## Theme Characteristics

### Light Theme
- **Personality**: Clean, professional, approachable
- **Key Colors**: Yellow accent (#ffff00), subtle grays
- **Typography**: Figtree (warm, friendly serif alternative)
- **Best For**: Personal portfolio, blog posts, general content

### Dark Theme
- **Personality**: Modern, sleek, easy on eyes
- **Key Colors**: Yellow accent maintained, sky blue accents
- **Typography**: Hanken Grotesk (geometric sans-serif)
- **Best For**: Night reading, extended sessions, developer-focused content

### Vibrant Theme
- **Personality**: High energy, attention-grabbing, vibrant
- **Key Colors**: Vibrant blue background, hot pink + lime accents
- **Typography**: Hanken Grotesk (clean, modern)
- **Best For**: Educational materials, workshops, teaching resources, calls-to-action

### Terminal Theme
- **Personality**: Retro, technical, high-contrast
- **Key Colors**: Terminal green (#00FF41), cyan links (#00FFFF), yellow accents
- **Typography**: IBM Plex Mono (monospace everywhere)
- **Best For**: Developer portfolios, technical documentation, code-focused content, retro/cyberpunk aesthetic

---

## Adding a New Theme

To add a new theme, **only define base color values**:

```css
[data-theme="mytheme"] {
  /* Define ONLY base colors */
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... etc */

  /* Semantic and component tokens inherit and auto-update */
  /* Override only if you need custom behavior */
  --color-link: var(--color-accent-2); /* Custom override example */
}
```

**All semantic and component tokens will automatically inherit** and reference the new base colors!

---

**Last Updated:** 2026-02-13
