# GitHub Pages - Quick Start

Your construction platform frontend is configured for automatic deployment to GitHub Pages.

## 🚀 One-Time Setup

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/brianmoberley/andrewwebsite
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under "Source", select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 2: Done!

That's it! The workflow is already configured. Just push your code.

## 📱 View Your Website

After setup, your website will be live at:

```
https://brianmoberley.github.io/andrewwebsite/
```

The site automatically updates when you push to `main` or `claude/construction-platform-build-c9c7pe` branch.

## 📊 Monitor Deployments

1. Go to **Actions** tab in your GitHub repository
2. Look for "Deploy to GitHub Pages" workflow
3. You'll see each deployment with:
   - ✅ Green checkmark = Success
   - ❌ Red X = Failed
   - ⏳ Yellow circle = In progress

## 🔄 Automatic Updates

Every time you push code:

1. GitHub Actions automatically builds your website
2. Generates static HTML files
3. Uploads to GitHub Pages
4. Your site updates (usually within 1-2 minutes)

No manual steps needed!

## 📝 What's Deployed

The entire public website including:
- ✅ Home page with hero section
- ✅ Services pages
- ✅ Portfolio gallery
- ✅ Testimonials
- ✅ About page
- ✅ Contact page
- ✅ Free estimate form
- ✅ Responsive design

## ⚠️ Important Notes

**API Calls**: 
- The estimate form needs your backend API running
- For production use, update the API URL in GitHub Secrets
- Pages will still display even if API is offline

**Default API**: `http://localhost:3001` (local development)

**Production API**: Set via `NEXT_PUBLIC_API_URL` secret

## 🛠️ Troubleshooting

### Site not updating?
- Check **Actions** tab for workflow errors
- Wait 2-3 minutes for deployment to complete
- Try refreshing with Ctrl+Shift+R (hard refresh)

### Pages showing 404?
- This should not happen with static export
- Check workflow logs for build errors
- Verify `output: 'export'` is set in next.config.js

### Want to test locally?
```bash
cd apps/web
pnpm install
pnpm build
# Output is in apps/web/out/ directory
```

## 📚 More Information

- [GitHub Pages Setup Guide](./docs/GITHUB_PAGES_SETUP.md) - Detailed documentation
- [Getting Started](./docs/GETTING_STARTED.md) - Local development setup
- [README](./README.md) - Project overview

## 🎯 Summary

✅ GitHub Pages enabled  
✅ Workflow configured  
✅ Auto-deploy on push  
✅ Website at https://brianmoberley.github.io/andrewwebsite/  

**Status**: Ready to go! Your site will be live after the first deployment workflow completes.
