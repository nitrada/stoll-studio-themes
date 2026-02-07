# Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `stoll-studio-themes`
3. Description: "Shared theming system for stoll.studio websites"
4. Visibility: **Public** (or Private if you prefer)
5. **Do NOT initialize** with README, .gitignore, or license (we already have files)
6. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, run these commands:

```bash
cd /Users/christophestoll/Documents/GitHub/stoll-studio-themes
git remote add origin https://github.com/YOUR_USERNAME/stoll-studio-themes.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 3: Add as Submodule to christophe.stoll.studio

```bash
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git submodule add https://github.com/YOUR_USERNAME/stoll-studio-themes.git _themes
git add .gitmodules _themes
git commit -m "Add stoll-studio-themes as submodule"
```

## Step 4: Update christophe.stoll.studio to Use Submodule

The file references need to be updated from:
- `css/themes.css` → `_themes/css/themes.css`
- `assets/js/theme-switcher.js` → `_themes/js/theme-switcher.js`

See UPDATE_INSTRUCTIONS.md for detailed file changes.

## Step 5: Add as Submodule to teaching.stoll.studio

```bash
cd /Users/christophestoll/Documents/GitHub/teaching.stoll.studio
git submodule add https://github.com/YOUR_USERNAME/stoll-studio-themes.git _themes
git add .gitmodules _themes
git commit -m "Add stoll-studio-themes as submodule"
```

Then update the layout files to reference `_themes/css/themes.css` and `_themes/js/theme-switcher.js`.

## Future Updates

When you update themes:

```bash
# 1. Update in shared repo
cd /Users/christophestoll/Documents/GitHub/stoll-studio-themes
# Make changes...
git add .
git commit -m "Update teaching theme colors"
git push

# 2. Pull updates in each site
cd /Users/christophestoll/Documents/GitHub/christophe.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update themes"
git push

cd /Users/christophestoll/Documents/GitHub/teaching.stoll.studio
git submodule update --remote _themes
git add _themes
git commit -m "Update themes"
git push
```

## Cloning Sites on New Machine

When cloning a site that uses the submodule:

```bash
git clone https://github.com/YOUR_USERNAME/christophe.stoll.studio.git
cd christophe.stoll.studio
git submodule init
git submodule update
```

Or in one command:

```bash
git clone --recursive https://github.com/YOUR_USERNAME/christophe.stoll.studio.git
```
