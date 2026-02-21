// stoll.studio Design Token Creator + Binder
//
// Run once (or again — it's idempotent) in the Figma file with the captured design.
//
// PHASE 1 — Creates/updates 3 Variable collections:
//   · Colors  (4 modes: Light / Dark / Vibrant / Terminal)
//   · Spacing (1 mode)
//   · Typography (2 modes: Standard / Terminal)
//
//   Semantic + component tokens correctly REFERENCE base variables,
//   mirroring the CSS var() relationships from themes.css.
//
// PHASE 2 — Walks every node on the current page and replaces hardcoded
//   fill/stroke colors with Variable references (Light theme values used for matching).
//
// AFTER RUNNING:
//   Select the top-level frame → right panel → "stoll.studio Colors" → switch mode
//   → the entire design updates to Dark / Vibrant / Terminal.

(async function () {

  // ─── HELPERS ───────────────────────────────────────────────────────────────

  function hex(h) {
    if (h.length === 4) h = "#" + h[1]+h[1] + h[2]+h[2] + h[3]+h[3];
    return {
      r: parseInt(h.slice(1, 3), 16) / 255,
      g: parseInt(h.slice(3, 5), 16) / 255,
      b: parseInt(h.slice(5, 7), 16) / 255,
      a: 1
    };
  }

  function rgba(r, g, b, a) {
    return { r: r/255, g: g/255, b: b/255, a: a !== undefined ? a : 1 };
  }

  // Shorthand for creating a variable alias (Figma's equivalent of CSS var())
  function ref(variable) {
    return figma.variables.createVariableAlias(variable);
  }

  const BLACK = { r: 0, g: 0, b: 0, a: 1 };
  const WHITE = { r: 1, g: 1, b: 1, a: 1 };

  // ─── GET OR CREATE COLLECTION + MODES ──────────────────────────────────────
  // Idempotent: if the collection already exists, find it and its mode IDs.
  // If it's new, create it with the correct mode names.

  function getOrCreateCollection(name, modeNames) {
    let coll = figma.variables.getLocalVariableCollections()
      .find(c => c.name === name);

    let modeIds = {};

    if (coll) {
      // Find mode IDs by name
      for (const modeName of modeNames) {
        const mode = coll.modes.find(m => m.name === modeName);
        if (mode) {
          modeIds[modeName] = mode.modeId;
        } else {
          // Mode missing — add it (e.g. if plugin was partially run before)
          modeIds[modeName] = coll.addMode(modeName);
        }
      }
    } else {
      coll = figma.variables.createVariableCollection(name);
      // First mode is created automatically — rename it to the first mode name
      modeIds[modeNames[0]] = coll.modes[0].modeId;
      coll.renameMode(modeIds[modeNames[0]], modeNames[0]);
      // Add remaining modes
      for (let i = 1; i < modeNames.length; i++) {
        modeIds[modeNames[i]] = coll.addMode(modeNames[i]);
      }
    }

    return { coll, modeIds };
  }

  // Idempotent variable creator: updates an existing variable's values or creates it fresh.
  function setVar(coll, name, type, valuesByMode, description) {
    let variable = coll.variableIds
      .map(id => figma.variables.getVariableById(id))
      .find(v => v && v.name === name);

    if (!variable) {
      variable = figma.variables.createVariable(name, coll, type);
    }

    for (const [modeId, value] of Object.entries(valuesByMode)) {
      variable.setValueForMode(modeId, value);
    }
    if (description) variable.description = description;
    return variable;
  }

  // ─── PHASE 1A: COLORS COLLECTION ───────────────────────────────────────────

  const { coll: cc, modeIds: cm } = getOrCreateCollection(
    "stoll.studio Colors",
    ["Light", "Dark", "Vibrant", "Terminal"]
  );
  const [lId, dId, vId, tId] = [cm.Light, cm.Dark, cm.Vibrant, cm.Terminal];

  // Shorthand for color variable (full explicit values per mode)
  function cvar(name, l, d, v, t, description) {
    return setVar(cc, name, "COLOR", {
      [lId]: l, [dId]: d, [vId]: v, [tId]: t
    }, description);
  }

  // ── Global constants (same in every mode) ────────────────────────────────

  const gBlack = cvar("global/black", BLACK, BLACK, BLACK, BLACK,
    "Pure black — never overridden. Form message text, most sticky bar text.");
  const gWhite = cvar("global/white", WHITE, WHITE, WHITE, WHITE,
    "Pure white — never overridden.");

  // ── Base — Text ───────────────────────────────────────────────────────────

  const bPrimary = cvar("base/color-primary",
    hex("#313131"), hex("#ffffff"), hex("#ffffff"), hex("#00FF41"),
    "Main headings, strong text");

  cvar("base/color-secondary",
    hex("#515151"), hex("#e0e0e0"), rgba(255,255,255,0.75), hex("#00D936"),
    "Body text, paragraphs");

  const bTertiary = cvar("base/color-tertiary",
    hex("#7a7a7a"), hex("#b0b0b0"), rgba(255,255,255,0.6), hex("#00B32D"),
    "Muted text, bullets");

  const bQuaternary = cvar("base/color-quaternary",
    hex("#9a9a9a"), hex("#808080"), rgba(255,255,255,0.45), hex("#009926"),
    "Dates, very muted elements");

  cvar("base/color-light",
    hex("#c0c0c0"), hex("#606060"), rgba(255,255,255,0.3), hex("#007A1F"),
    "Taglines, very light text");

  // ── Base — Accents ────────────────────────────────────────────────────────

  const bAccent1 = cvar("base/color-accent-1",
    hex("#ffff00"), hex("#ffff00"), hex("#FF0080"), hex("#FFFF00"),
    "Primary accent: Yellow (light/dark/terminal) | Pink (vibrant).");

  const bAccent2 = cvar("base/color-accent-2",
    hex("#ff0000"), hex("#5dade2"), hex("#D4FF00"), hex("#00FFFF"),
    "Secondary accent: Red (light) | Blue (dark) | Lime (vibrant) | Cyan (terminal, reserved).");

  // ── Base — Surfaces ───────────────────────────────────────────────────────

  cvar("base/color-surface",
    hex("#ffffff"), hex("#1a1a1a"), hex("#3D38F5"), hex("#000000"),
    "Main background");

  cvar("base/color-surface-emphasized",
    hex("#f5f5f5"), hex("#2a2a2a"), hex("#312CDB"), hex("#0A0A0A"),
    "Table headers, cards");

  const bSurfaceSecondary = cvar("base/color-surface-secondary",
    hex("#f9f9f9"), hex("#242424"), hex("#4942F7"), hex("#050505"),
    "Code blocks, blockquotes");

  // ── Base — Borders ────────────────────────────────────────────────────────

  cvar("base/color-border",
    hex("#eeeeee"), hex("#333333"), rgba(255,255,255,0.15), rgba(0,255,65,0.15),
    "Primary borders");

  const bBorderSecondary = cvar("base/color-border-secondary",
    hex("#e5e5e5"), hex("#444444"), rgba(255,255,255,0.2), rgba(0,255,65,0.2),
    "Secondary borders");

  // ── Base — State ──────────────────────────────────────────────────────────

  const bInfo = cvar("base/color-info",
    hex("#268bd2"), hex("#5dade2"), hex("#69A0FF"), hex("#00BFFF"),
    "Informational blue");

  cvar("base/color-success",
    hex("#27ae60"), hex("#2ecc71"), hex("#00FF33"), hex("#00FF41"),
    "Success states. NOTE: In terminal this equals color-primary — form messages must use global/black text, not color-primary.");

  cvar("base/color-error",
    hex("#e74c3c"), hex("#e74c3c"), hex("#FF3366"), hex("#FF0000"),
    "Error states");

  cvar("base/color-warning",
    hex("#f39c12"), hex("#f39c12"), hex("#FFB800"), hex("#FFFF00"),
    "Warning states");

  // ── Semantic — reference base variables via aliases ───────────────────────
  //
  // Mirrors the CSS cascade from themes.css:
  //   :root defines semantic tokens with var() references to base tokens.
  //   Individual themes override semantic tokens for specific cases.
  //
  // Where CSS uses a hardcoded value (e.g. #cccccc or color-mix() result),
  // we store a hardcoded Figma color. Where CSS uses var(--base-token),
  // we store a Figma variable alias — ref(baseVar).

  // color-divider
  // :root  → #ccc (intentionally hardcoded, not a base token reference)
  // dark/vibrant/terminal → var(--color-border-secondary)
  cvar("semantic/color-divider",
    hex("#cccccc"),
    ref(bBorderSecondary),
    ref(bBorderSecondary),
    ref(bBorderSecondary),
    "Structural dividers: hr, two-col borders, table rows. Light: intentionally hardcoded #ccc (darker than border-secondary #e5e5e5 for structural weight).");

  // color-link
  // :root        → var(--color-info)
  // vibrant      → var(--color-accent-2) [overrides :root]
  // terminal     → var(--color-primary)  [overrides :root]
  cvar("semantic/color-link",
    ref(bInfo),
    ref(bInfo),
    ref(bAccent2),
    ref(bPrimary),
    "Links and interactive elements.");

  // color-link-hover
  // All themes: hardcoded values.
  // :root uses color-mix(in srgb, var(--color-info) 80%, black) ≈ #1f6fa8.
  // Figma has no color-mix() — pre-computed values used.
  cvar("semantic/color-link-hover",
    hex("#1f6fa8"),
    hex("#7fc4ed"),
    hex("#E5FF33"),
    hex("#66FF99"),
    "Link hover state. Pre-computed from CSS color-mix()/hardcoded values — Figma has no color-mix().");

  // color-bullet
  // :root        → var(--color-tertiary)
  // vibrant/terminal → hardcoded rgba (no matching base token at those opacities)
  cvar("semantic/color-bullet",
    ref(bTertiary),
    ref(bTertiary),
    rgba(255,255,255,0.4),
    rgba(0,255,65,0.4),
    "Custom list bullet ⚬ character.");

  // color-code
  // :root        → var(--color-accent-2)
  // vibrant      → var(--color-accent-1) [overrides :root]
  // terminal     → var(--color-accent-1) [overrides :root]
  cvar("semantic/color-code",
    ref(bAccent2),
    ref(bAccent2),
    ref(bAccent1),
    ref(bAccent1),
    "Inline code text color (not code block background).");

  // color-meta
  // :root        → var(--color-tertiary)
  // vibrant/terminal → hardcoded rgba
  cvar("semantic/color-meta",
    ref(bTertiary),
    ref(bTertiary),
    rgba(255,255,255,0.5),
    rgba(0,255,65,0.5),
    "Meta text: figure captions, project meta labels.");

  // color-meta-secondary
  // :root        → var(--color-quaternary)
  // vibrant/terminal → hardcoded rgba
  cvar("semantic/color-meta-secondary",
    ref(bQuaternary),
    ref(bQuaternary),
    rgba(255,255,255,0.6),
    rgba(0,255,65,0.6),
    "Secondary meta: project subtitles, credits.");

  // ── Component — reference base/semantic variables via aliases ─────────────

  // color-sticky-bar-bg
  // :root     → var(--color-accent-1)  [yellow]
  // dark      → var(--color-accent-2)  [blue — the key visual difference]
  // vibrant   → var(--color-accent-1)  [pink]
  // terminal  → var(--color-primary)   [green — uses primary, NOT accent-1]
  cvar("component/color-sticky-bar-bg",
    ref(bAccent1),
    ref(bAccent2),
    ref(bAccent1),
    ref(bPrimary),
    "Sticky bar background. Dark uses accent-2 (blue), not accent-1. Terminal uses color-primary (green), not accent-1.");

  // color-sticky-bar-text
  // :root/dark/terminal → var(--color-black)
  // vibrant             → var(--color-white)  [only theme with white bar text]
  cvar("component/color-sticky-bar-text",
    ref(gBlack),
    ref(gBlack),
    ref(gWhite),
    ref(gBlack),
    "Sticky bar text. Vibrant is the only theme with white text on the bar.");

  // color-blockquote-bg
  // All themes → var(--color-surface-secondary)
  cvar("component/color-blockquote-bg",
    ref(bSurfaceSecondary),
    ref(bSurfaceSecondary),
    ref(bSurfaceSecondary),
    ref(bSurfaceSecondary),
    "Blockquote background — always surface-secondary.");

  // color-blockquote-border
  // All themes → var(--color-accent-1)
  // Resolves to: yellow (light/dark/terminal), pink (vibrant)
  cvar("component/color-blockquote-border",
    ref(bAccent1),
    ref(bAccent1),
    ref(bAccent1),
    ref(bAccent1),
    "Blockquote 4px left border — always accent-1 (yellow in light/dark/terminal, pink in vibrant).");

  // color-skip-link-bg
  // :root/dark → var(--color-black)
  // vibrant/terminal → var(--color-accent-1)
  cvar("component/color-skip-link-bg",
    ref(gBlack),
    ref(gBlack),
    ref(bAccent1),
    ref(bAccent1),
    "Skip link background.");

  // color-skip-link-text
  // :root/dark/vibrant → var(--color-white)
  // terminal           → var(--color-black)
  cvar("component/color-skip-link-text",
    ref(gWhite),
    ref(gWhite),
    ref(gWhite),
    ref(gBlack),
    "Skip link text.");

  // ─── PHASE 1B: SPACING COLLECTION ──────────────────────────────────────────

  const { coll: sc, modeIds: sm } = getOrCreateCollection(
    "stoll.studio Spacing", ["Default"]
  );
  const sModeId = sm.Default;

  function svar(name, value, description) {
    return setVar(sc, name, "FLOAT", { [sModeId]: value }, description);
  }

  svar("xs",   5,  "0.25rem — tight spacing, table cells");
  svar("sm",  10,  "0.5rem — small gaps, heading margins");
  svar("md",  20,  "1rem — standard spacing, paragraphs");
  svar("lg",  30,  "1.5rem — section spacing, figures");
  svar("xl",  40,  "2rem — large spacing");
  svar("2xl", 50,  "2.5rem — section dividers (two-col margin-bottom)");
  svar("3xl", 60,  "3rem — masthead margin");

  // ─── PHASE 1C: TYPOGRAPHY COLLECTION ───────────────────────────────────────

  const { coll: tc, modeIds: tm } = getOrCreateCollection(
    "stoll.studio Typography", ["Standard", "Terminal"]
  );
  const [stdId, termTypoId] = [tm.Standard, tm.Terminal];

  function tFloat(name, std, term, description) {
    return setVar(tc, name, "FLOAT", { [stdId]: std, [termTypoId]: term }, description);
  }
  function tString(name, std, term, description) {
    return setVar(tc, name, "STRING", { [stdId]: std, [termTypoId]: term }, description);
  }

  tString("font/family/primary",   "Hanken Grotesk", "IBM Plex Mono",
    "Primary typeface. Terminal overrides to IBM Plex Mono everywhere.");
  tString("font/family/monospace", "IBM Plex Mono",  "IBM Plex Mono",
    "Monospace — code blocks, navigation links.");

  tFloat("font/size/h1",        40, 40);
  tFloat("font/size/h2",        26, 26, "1.3rem");
  tFloat("font/size/h3",        25, 25, "1.25rem");
  tFloat("font/size/body",      20, 20);
  tFloat("font/size/masthead",  30, 30, "1.5rem");
  tFloat("font/size/small",     16, 16, "0.8rem — meta, captions");
  tFloat("font/size/nav",       20, 20);

  tFloat("font/weight/light",    300, 400,
    "Terminal normalizes all weights to 400 for authentic terminal aesthetic.");
  tFloat("font/weight/regular",  400, 400);
  tFloat("font/weight/medium",   500, 400, "Navigation links. Terminal: 400.");
  tFloat("font/weight/semibold", 600, 400,
    "Headings, bold text. Terminal: 400 — no weight hierarchy.");

  tFloat("font/line-height/tight",  1.25, 1.25, "Headings");
  tFloat("font/line-height/normal", 1.5,  1.5,  "Body text");

  // ─── PHASE 2: BIND VARIABLES TO NODES ──────────────────────────────────────
  //
  // Walks all nodes on the current page.
  // For each SOLID fill/stroke, checks if the color matches a Light-theme token value.
  // If yes, replaces the hardcoded hex with a variable reference.
  //
  // Map is built with semantic/component variables written last, so their names
  // win over base variable names for shared color values (e.g. #268bd2 binds to
  // semantic/color-link rather than base/color-info).
  //
  // Note: the matching resolves aliases to their actual Light-theme values,
  // so semantic/component variables that reference base variables are correctly
  // included in the map.

  const colorMap = new Map(); // "R,G,B,A" → variableId

  function makeKey(r01, g01, b01, a01) {
    return [
      Math.round(r01 * 255),
      Math.round(g01 * 255),
      Math.round(b01 * 255),
      parseFloat((a01 !== undefined ? a01 : 1).toFixed(3))
    ].join(",");
  }

  // Resolve a variable's Light-mode value, following aliases if needed
  function resolveLightValue(variable, depth) {
    if (depth > 5) return null; // guard against circular refs
    const val = variable.valuesByMode[lId];
    if (!val) return null;
    if (val.type === "VARIABLE_ALIAS") {
      const target = figma.variables.getVariableById(val.id);
      return target ? resolveLightValue(target, depth + 1) : null;
    }
    return val; // { r, g, b, a }
  }

  const allColorVars = cc.variableIds
    .map(id => figma.variables.getVariableById(id))
    .filter(v => v && v.resolvedType === "COLOR");

  for (const variable of allColorVars) {
    const resolved = resolveLightValue(variable, 0);
    if (!resolved) continue;
    const key = makeKey(resolved.r, resolved.g, resolved.b, resolved.a);
    colorMap.set(key, variable.id); // last write wins — semantic/component override base
  }

  let boundCount  = 0;
  let alreadyBound = 0;

  function bindPaints(paints) {
    if (!paints || paints === figma.mixed || !Array.isArray(paints)) return paints;
    return paints.map(paint => {
      if (paint.type !== "SOLID") return paint;
      if (paint.boundVariables && paint.boundVariables.color) {
        alreadyBound++;
        return paint;
      }
      const alpha = paint.opacity !== undefined ? paint.opacity : 1;
      const key   = makeKey(paint.color.r, paint.color.g, paint.color.b, alpha);
      const varId = colorMap.get(key);
      if (varId) {
        const variable = figma.variables.getVariableById(varId);
        if (variable) {
          boundCount++;
          return figma.variables.setBoundVariableForPaint(paint, "color", variable);
        }
      }
      return paint;
    });
  }

  function walkNode(node) {
    try {
      if ("fills" in node)   node.fills   = bindPaints(node.fills);
      if ("strokes" in node) node.strokes  = bindPaints(node.strokes);
    } catch (_) { /* skip locked/un-editable nodes */ }
    if ("children" in node) {
      for (const child of node.children) walkNode(child);
    }
  }

  for (const topNode of figma.currentPage.children) {
    walkNode(topNode);
  }

  figma.notify(
    `✓ ${boundCount} fills bound to variables. ` +
    `Select the frame → right panel → stoll.studio Colors → switch mode to theme-switch.`,
    { timeout: 10000 }
  );
  figma.closePlugin();

})().catch(function (err) {
  figma.notify("Plugin error: " + err.message, { error: true, timeout: 8000 });
  figma.closePlugin();
});
