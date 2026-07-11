# GitHub Pages Setup Guide

This guide explains how the Construction Platform's frontend is deployed to GitHub Pages.

## Overview

The frontend website (Next.js app) is automatically built and deployed to GitHub Pages when you push to the `main` or `claude/construction-platform-build-c9c7pe` branch.

## Automatic Deployment

The deployment is handled by GitHub Actions workflow: `.github/workflows/deploy-pages.yml`

### What It Does

1. Installs dependencies
2. Builds the Next.js app with static export
3. Uploads the built files to GitHub Pages
4. Makes the site live at `https://brianmoberley.github.io/andrewwebsite/`

## Manual Setup (One-time)

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 2: Wait for First Deployment

After enabling GitHub Pages:
1. Push your code to the `main` branch
2. Go to **Actions** tab to see the workflow running
3. Once completed, your site will be live at `https://brianmoberley.github.io/andrewwebsite/`

## Viewing Your Site

After deployment, you can view your website at:

```
https://brianmoberley.github.io/andrewwebsite/
```

The website will be updated automatically every time you push to `main` or the build branch.

## Monitoring Deployments

### View Build Status
1. Go to **Actions** tab in GitHub
2. Click on "Deploy to GitHub Pages" workflow
3. View the latest run status

### View Deployment Details
1. Click on a completed workflow
2. Expand the "deploy" job to see deployment details
3. Click the environment link to view your live site

## Troubleshooting

### Workflow Fails to Build

**Error: Cannot find module '@construction/types'**

The workflow uses `pnpm install --frozen-lockfile`. Make sure:
1. You've committed `pnpm-lock.yaml`
2. All workspace packages are properly linked
3. You ran `pnpm install` locally before pushing

**Solution:**
```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: update lock file"
git push
```

### Site Not Updating

1. Check **Actions** tab - is the workflow running?
2. Click the latest run to see if there are errors
3. Check **Deployments** tab to see deployment history

### 404 on Subpages

If you get 404 on routes like `/portfolio` or `/estimate`:

1. This is normal with GitHub Pages + Next.js static export
2. The workflow should handle this automatically
3. If still having issues, verify `out/` folder has all HTML files

## Configuration Files

### next.config.js

The web app is configured for static export:

```javascript
const nextConfig = {
  output: 'export',  // Enable static export
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,  // GitHub Pages doesn't support image optimization
  },
};
```

### .github/workflows/deploy-pages.yml

The automated deployment workflow:
- Runs on push to `main` or `claude/construction-platform-build-c9c7pe`
- Builds the Next.js app
- Deploys to `gh-pages` branch
- Updates your live site

## Environment Variables

If your app needs environment variables during build:

```yaml
- name: Build web app
  run: pnpm --filter=@construction/web build
  env:
    NEXT_PUBLIC_API_URL: ${{ secrets.API_URL || 'http://localhost:3001' }}
```

You can set secrets in GitHub:
1. Settings → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `API_URL`, Value: your API URL

## Custom Domain (Optional)

To use a custom domain instead of `https://brianmoberley.github.io/andrewwebsite/`:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `construction.example.com`)
3. Add DNS records as shown by GitHub
4. GitHub will automatically create a `CNAME` file

## Accessing the Live Site

Once deployed, you can view your website at:

- **GitHub Pages URL**: https://brianmoberley.github.io/andrewwebsite/
- **Navigation**: All pages work (Home, Portfolio, Services, About, Contact)
- **Forms**: Free estimate form submits to your API (if API is running)

## Important Notes

⚠️ **API Calls**: 
- The website connects to your API at `http://localhost:3001` (by default)
- For production, update `NEXT_PUBLIC_API_URL` in GitHub secrets
- If API is not running, forms won't work but pages will display

✅ **What Works**:
- All pages load correctly
- Navigation between pages
- Responsive design
- CSS and styling
- Client-side interactions

❌ **Limitations**:
- API calls need your backend running
- Can't use dynamic server-side rendering
- No real-time data updates

## Disabling GitHub Pages

To disable GitHub Pages:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **None**
3. Click **Save**

The `gh-pages` branch will remain but won't be published.

## Re-enabling After Disabling

1. Go to **Settings** → **Pages**
2. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **Save**

## Continuous Deployment

Every time you push to `main`:

1. GitHub Actions automatically runs the workflow
2. Next.js app is built
3. Static files are uploaded
4. Site is updated (usually within 1-2 minutes)

No manual steps needed!

## Next Steps

1. ✅ Enable GitHub Pages in repository settings
2. ✅ Workflow is already configured (`.github/workflows/deploy-pages.yml`)
3. Push your code to trigger the workflow
4. Visit your live site at `https://brianmoberley.github.io/andrewwebsite/`

---

For questions about the build process, see [GETTING_STARTED.md](./GETTING_STARTED.md).
