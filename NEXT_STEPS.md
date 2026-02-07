# Next Steps: Setting Up Shared Themes

## What We've Done ✅

1. **Created shared repository** at `/Users/christophestoll/Documents/GitHub/stoll-studio-themes`
   - Contains `css/themes.css` (default, dark, teaching themes)
   - Contains `js/theme-switcher.js` (URL-based switching)
   - Includes comprehensive documentation

2. **Committed initial version** with all theme files

3. **Created documentation**:
   - `README.md` - Overview and usage
   - `SETUP.md` - Step-by-step setup instructions
   - `UPDATE_INSTRUCTIONS.md` - How to update christophe.stoll.studio
   - `WORKFLOW.md` - Day-to-day workflow guide

## What You Need to Do 🚀

### Step 1: Create GitHub Repository (5 minutes)

1. Go to https://github.com/new
2. Name: `stoll-studio-themes`
3. Description: "Shared theming system for stoll.studio websites"
4. Visibility: Public (or Private)
5. **DO NOT initialize** with README (we already have files)
6. Click "Create repository"

### Step 2: Push to GitHub (2 minutes)

```bash
cd /Users/christophestoll/Documents/GitHub/stoll-studio-themes
git remote add origin https://github.com/YOUR_USERNAME/stoll-studio-themes.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Add Submodule to christophe.stoll.studio (5 minutes)

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git submodule add https://github.com/YOUR_USERNAME/stoll-studio-themes.git _themes
```

### Step 4: Update File References (5 minutes)

Edit `_layouts/default.html` in christophe.stoll.studio:

**Line 43 - Change CSS reference:**
```html
<!-- FROM: -->
<link rel="stylesheet" href="{{ '/css/themes.css' | relative_url }}?v=1.0">

<!-- TO: -->
<link rel="stylesheet" href="{{ '/_themes/css/themes.css' | relative_url }}?v=1.0">
```

**Line 161 - Change JS reference:**
```html
<!-- FROM: -->
<script src="{{ '/assets/js/theme-switcher.js' | relative_url }}"></script>

<!-- TO: -->
<script src="{{ '/_themes/js/theme-switcher.js' | relative_url }}"></script>
```

### Step 5: Test Locally (2 minutes)

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
bundle exec jekyll serve
```

Visit:
- http://localhost:4000 (default)
- http://localhost:4000?theme=dark
- http://localhost:4000?theme=teaching

Verify:
- ✅ All themes load correctly
- ✅ No white flash when navigating
- ✅ Theme persists across page navigation

### Step 6: Commit Changes (2 minutes)

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git add .gitmodules _themes _layouts/default.html
git commit -m "Add stoll-studio-themes submodule and update references"
git push
```

### Step 7: Set Up teaching.stoll.studio (10 minutes)

Repeat steps 3-6 for your teaching.stoll.studio repository.

## Total Time: ~30 minutes

## Future Workflow

When you want to update themes:

```bash
# 1. Edit themes
cd /Users/christophestoll/Documents/GitHub/stoll-studio-themes
# Edit css/themes.css or js/theme-switcher.js
git add .
git commit -m "Update teaching theme colors"
git push

# 2. Update christophe.stoll.studio
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update themes"
git push

# 3. Update teaching.stoll.studio
cd /Users/christophestoll/Documents/GitHub/teaching.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update themes"
git push
```

## Benefits

✅ **One source of truth** - Edit themes once, use everywhere
✅ **Version controlled** - Full git history of theme changes
✅ **No disconnection** - Submodules keep repos in sync
✅ **Easy updates** - One command pulls latest themes
✅ **Vercel compatible** - Deploys automatically with submodules
✅ **Rollback friendly** - Pin to specific theme versions if needed

## Questions?

- **Setup issues?** See `SETUP.md`
- **Update questions?** See `UPDATE_INSTRUCTIONS.md`
- **Daily workflow?** See `WORKFLOW.md`
- **Usage reference?** See `README.md`

---

**Ready to go!** 🎨

All the files are prepared. Just follow the steps above to connect everything together.
