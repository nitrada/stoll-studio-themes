# Update Instructions for christophe.stoll.studio

After adding the submodule, you need to update file references to point to the `_themes` directory.

## Files to Update

### 1. `_layouts/default.html`

**Change line 43:**

```html
<!-- OLD -->
<link rel="stylesheet" href="{{ '/css/themes.css' | relative_url }}?v=1.0">

<!-- NEW -->
<link rel="stylesheet" href="{{ '/_themes/css/themes.css' | relative_url }}?v=1.0">
```

**Change line 161:**

```html
<!-- OLD -->
<script src="{{ '/assets/js/theme-switcher.js' | relative_url }}"></script>

<!-- NEW -->
<script src="{{ '/_themes/js/theme-switcher.js' | relative_url }}"></script>
```

## Optional: Remove Original Files

Once the submodule is working, you can optionally remove the original files:

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git rm css/themes.css
git rm assets/js/theme-switcher.js
git commit -m "Remove theme files (now using submodule)"
```

**Note:** Keep the files for now to ensure the submodule works correctly. Remove them after testing.

## Testing

1. Start Jekyll server:
   ```bash
   cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
   bundle exec jekyll serve
   ```

2. Test all themes:
   - http://localhost:4000 (default theme)
   - http://localhost:4000?theme=dark
   - http://localhost:4000?theme=teaching

3. Verify no flash on navigation (FOUC prevention)

4. Check that internal links maintain the theme parameter

## Vercel Deployment

Vercel automatically handles git submodules, so no special configuration is needed. Your themes will deploy correctly.

## Jekyll Configuration

Jekyll will automatically include files from the `_themes` directory in your build. No changes to `_config.yml` are needed.
