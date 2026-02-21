# Figma Plugin API — Design System Sync Guide

This document captures how to use the Figma plugin API (via Chrome DevTools MCP) to keep three sources of truth in sync:

1. **`css/themes.css`** — CSS custom properties, the living implementation
2. **`_pages/designsystem.md`** — Human-readable documentation for the Figma plugin
3. **Figma Variables** — Design tokens consumed in the Figma design system file

---

## How to Access the Figma Plugin API

You interact with Figma by running JavaScript in the browser via the `evaluate_script` MCP tool (Chrome DevTools). The `figma` global object is available because Figma exposes the plugin API to browser scripts when a design file is open.

**Workflow:**

1. Use `navigate_page` to confirm the Figma design file is open
2. Use `evaluate_script` to confirm access: `return typeof figma` — should return `"object"`
3. Run API calls using `await`-based scripts in `evaluate_script`

**If `figma` is undefined:**

- The user must have edit access to the file
- Open any plugin in Figma and close it — this initialises the global
- Creating a branch on the file also works

**Critical: Never call `figma.closePlugin()`** — it terminates the plugin context for the entire session. If called accidentally, reload the Figma page via `navigate_page` and wait ~4 seconds before retrying.

---

## Three-Source Architecture

```text
css/themes.css           → the implementation (5-tier cascade)
designsystem.md          → human docs fed to the Figma plugin
Figma Variables          → design tokens in Figma, bound to components
```

Changes should flow in this direction: **CSS → Figma Variables → designsystem.md**

When a token value changes in `themes.css`, update the matching Figma variable value, then update the resolved value documented in `designsystem.md`.

---

## Token Architecture (5-Tier Cascade)

```text
Tier 1: Global Constants     e.g. --white: #ffffff
Tier 2: Base Colors          e.g. --color-border-strong: rgba(0,0,0,0.3)  [per theme]
Tier 3: Status Colors        e.g. --color-error, --color-success
Tier 4: Semantic Tokens      e.g. --color-divider: var(--color-border-strong)  [in :root]
Tier 5: Component Tokens     e.g. --color-btn-bg
```

**Key cascade principle:** Semantic tokens are defined once in `:root` referencing base tokens. Per-theme blocks (`.dark`, `.vibrant`, `.terminal`) only override *base* tokens. Semantic tokens then resolve correctly per theme without explicit overrides. Only add per-theme semantic overrides when the cascade logic genuinely differs (e.g. `--color-bullet` which needs custom opacity per theme).

---

## Figma Variable Collections

The design file uses local variable collections accessible via:

```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
// Returns array of collections with .name, .id, .modes
```

The main collection has 4 modes: **Light, Dark, Vibrant, Terminal**

To get mode IDs:

```js
const col = collections[0];
const modeMap = Object.fromEntries(col.modes.map(m => [m.name, m.modeId]));
// { Light: "123:0", Dark: "123:1", Vibrant: "123:2", Terminal: "123:3" }
```

---

## Reading Variables

```js
const vars = await figma.variables.getLocalVariablesAsync();
const token = vars.find(v => v.name === "semantic/color-divider");

// Get value for a specific mode
const modeId = "123:1"; // Dark
const val = token.valuesByMode[modeId];
// VARIABLE_ALIAS: { type: "VARIABLE_ALIAS", id: "VariableID:5:10" }
// or raw value: { r: 0.4, g: 0.4, b: 0.4, a: 1 }
```

---

## Updating Variable Values

### Set to a variable alias (reference another token)

```js
const targetVar = vars.find(v => v.name === "base/color-border-strong");
await token.setValueForMode(modeId, {
  type: "VARIABLE_ALIAS",
  id: targetVar.id
});
```

### Set to a raw colour

```js
await token.setValueForMode(modeId, { r: 0.4, g: 0.4, b: 0.4, a: 1 });
// Note: Figma uses 0–1 range, not 0–255
```

---

## Token Inspector Frames

The Figma design system file contains **4 Token Inspector frames** — one per theme — that visually display resolved token values. They are NOT driven by Figma variables dynamically; they are manually constructed frames that must be kept in sync.

### Frame node IDs (stable)

| Theme    | Frame ID | Semantic `_swr` row container |
|----------|----------|-------------------------------|
| Light    | `5:1203` | `5:1275`                      |
| Dark     | `5:1546` | `5:1624`                      |
| Vibrant  | `5:1721` | `5:1799`                      |
| Terminal | `5:1896` | `5:1974`                      |

### Swatch row (`_sw`) structure

Each token row is a vertical auto-layout frame (72×98) containing:

- `_sq` — 72×72 rectangle with a fill bound to a Figma variable
- TEXT node — label string (the token name)

### Adding a token row

Copy an existing row and update the variable binding on `_sq`:

```js
const frame = await figma.getNodeByIdAsync("5:1275"); // Light _swr
const existingRow = frame.children[0]; // copy first row
const newRow = existingRow.clone();
frame.appendChild(newRow);

const sq = newRow.findOne(n => n.name === "_sq");
const targetVar = vars.find(v => v.name === "semantic/color-meta");
await figma.variables.setBoundVariableForPaint(sq.fills[0], "color", targetVar);
sq.fills = sq.fills; // trigger re-render
newRow.findOne(n => n.type === "TEXT").characters = "color-meta";
```

### Removing duplicate rows

If a row was accidentally added twice:

```js
const frame = await figma.getNodeByIdAsync("5:1275");
const dupes = frame.children.filter(n => n.name === "_sw-meta");
dupes.slice(1).forEach(n => n.remove()); // keep first, delete rest
```

---

## designsystem.md Sync

`designsystem.md` lives in `christophe.stoll.studio/_pages/` and is the human-readable source fed to the Figma plugin (`stoll-studio-themes`). It documents each token with its resolved value per theme.

### Semantic token table format

Each theme section has a table listing semantic tokens:

```markdown
| Token | Value | Via | Usage |
|-------|-------|-----|-------|
| color-divider | #666666 | Border Strong | Horizontal rules, separators |
| color-meta | #7a7a7a | Tertiary | Secondary metadata text |
| color-meta-secondary | #9a9a9a | Quaternary | Tertiary/dimmed text |
```

**"Via"** names the base token it resolves through. Use the base token name (not the CSS variable name), e.g. "Border Strong" not `--color-border-strong`.

### Resolved values per theme

| Token | Light | Dark | Vibrant | Terminal |
|-------|-------|------|---------|----------|
| `color-divider` | `#cccccc` via Border Strong | `#666666` via Border Strong | `rgba(255,255,255,0.3)` via Border Strong | `rgba(0,255,65,0.30)` via Border Strong |
| `color-meta` | `#7a7a7a` via Tertiary | `#b0b0b0` via Tertiary | `rgba(255,255,255,0.6)` via Tertiary | `rgba(0,255,65,0.70)` via Tertiary |
| `color-meta-secondary` | `#9a9a9a` via Quaternary | `#808080` via Quaternary | `rgba(255,255,255,0.45)` via Quaternary | `rgba(0,255,65,0.60)` via Quaternary |

---

## Sync Checklist

When changing a token value:

- [ ] Update `css/themes.css` — change the base token or semantic override
- [ ] Verify cascade resolves correctly in browser (check localhost preview)
- [ ] Update Figma variable — `setValueForMode()` for affected modes
- [ ] Update Token Inspector frame if the token has a swatch row
- [ ] Update resolved values in `designsystem.md` semantic token tables
- [ ] Add a changelog entry in `designsystem.md`
- [ ] Commit `stoll-studio-themes` first, then update submodule pointer in `christophe.stoll.studio`

---

## Full API Reference

[Figma Plugin API Documentation](https://developers.figma.com/docs/plugins/api/global-objects/)
