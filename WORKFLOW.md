# Theme Management Workflow

## Quick Reference

### Editing Themes

```bash
# Navigate to themes repo
cd /Users/christophestoll/Documents/GitHub/stoll-studio-themes

# Make your changes to css/themes.css or js/theme-switcher.js
# Test locally by running Jekyll in a site that uses the themes

# Commit and push
git add .
git commit -m "Your commit message"
git push origin main
```

### Updating Sites with New Theme Changes

```bash
# Update christophe.stoll.studio
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update themes to latest version"
git push

# Update teaching.stoll.studio
cd /Users/christophestoll/Documents/GitHub/teaching.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update themes to latest version"
git push
```

### Common Tasks

#### Add a New Theme

1. Edit `css/themes.css` in stoll-studio-themes repo
2. Copy an existing theme block (e.g., `[data-theme="dark"]`)
3. Rename to `[data-theme="newtheme"]`
4. Update all color, typography, and spacing variables
5. Commit and push to stoll-studio-themes
6. Update submodules in all sites

#### Update Existing Theme Colors

1. Edit `css/themes.css` in stoll-studio-themes repo
2. Find the theme block: `[data-theme="themename"]`
3. Update the specific variables (e.g., `--color-accent-1: #FF0080;`)
4. Commit and push to stoll-studio-themes
5. Update submodules in all sites

#### Update Theme Switcher Logic

1. Edit `js/theme-switcher.js` in stoll-studio-themes repo
2. Make your changes
3. Test thoroughly (theme switching, link updates, FOUC prevention)
4. Commit and push to stoll-studio-themes
5. Update submodules in all sites

## Testing Workflow

### Local Testing Before Pushing

```bash
# 1. Edit themes in stoll-studio-themes
cd /Users/christophestoll/Documents/GitHub/stoll-studio-themes
# Make changes...

# 2. Test in a site WITHOUT committing
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
bundle exec jekyll serve
# Visit http://localhost:4000?theme=yourtheme

# 3. If changes look good, commit themes
cd /Users/christophestoll/Documents/GitHub/stoll-studio-themes
git add .
git commit -m "Update theme"
git push

# 4. Update submodule reference
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update themes"
git push
```

### Testing Checklist

When updating themes, test:

- [ ] All themes load correctly (`?theme=default`, `?theme=dark`, `?theme=teaching`)
- [ ] No FOUC (white flash) when navigating between pages
- [ ] Theme persists when clicking internal links
- [ ] Sticky bar uses correct colors for each theme
- [ ] Text contrast is readable
- [ ] Links are visible and clickable
- [ ] Navigation typography displays correctly
- [ ] Code blocks use correct monospace font

## Version Management

### Pinning to Specific Version

If you want a site to use a specific theme version:

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
cd _themes
git checkout <commit-hash>
cd ..
git add _themes
git commit -m "Pin themes to specific version"
```

### Updating to Latest

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update to latest themes"
```

## Troubleshooting

### Submodule Not Updating

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git submodule update --init --recursive --remote
```

### Changes Not Showing

1. Clear Jekyll cache: `bundle exec jekyll clean`
2. Hard refresh browser: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
3. Check submodule is on latest commit: `cd _themes && git log`

### Merge Conflicts in Submodule

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio/_themes
git fetch origin
git merge origin/main
# Resolve conflicts if any
cd ..
git add _themes
git commit -m "Resolve theme submodule conflicts"
```

## Benefits of This Workflow

✅ **Single source of truth** - Update once, use everywhere
✅ **Version control** - Track theme changes over time
✅ **Independent updates** - Each site can pin to specific version
✅ **No code duplication** - Themes only exist in one place
✅ **Easy rollback** - Revert to previous theme version if needed
✅ **Automatic deployment** - Vercel handles submodules automatically

---

**Pro Tip:** Create git aliases for common operations:

```bash
# Add to ~/.gitconfig
[alias]
  subup = submodule update --remote --merge
  subpush = !git submodule foreach 'git push origin main'
```

Then use:
```bash
git subup  # Update all submodules
```
