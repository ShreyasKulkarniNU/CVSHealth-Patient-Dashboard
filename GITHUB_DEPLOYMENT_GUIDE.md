# GitHub Deployment Guide

## 📦 Pushing Your Code to GitHub

### Step 1: Check Git Status
```bash
git status
```

### Step 2: Add All Changes
```bash
git add .
# or
git add -A
```

### Step 3: Commit Changes
```bash
git commit -m "Enhanced dashboard UI with modern design, Chart.js integration, and responsive layout"
```

### Step 4: Pull Remote Changes (if needed)
```bash
git pull origin main --rebase
```
If there are conflicts, resolve them and continue:
```bash
git rebase --continue
```

### Step 5: Push to GitHub
```bash
git push origin main
```

---

## 🚀 Deploying to GitHub Pages

You have two options for deployment:

### Option 1: Deploy Angular App to GitHub Pages (Recommended)

#### Step 1: Install Angular CLI GitHub Pages Deploy Package
```bash
cd cvs-health-dashboard
npm install --save-dev angular-cli-ghpages
```

#### Step 2: Build the Application
```bash
ng build --configuration production --base-href /CVSHealth-Patient-Dashboard/
```

#### Step 3: Deploy to GitHub Pages
```bash
npx angular-cli-ghpages --dir=dist/cvs-health-dashboard/browser
```

#### Step 4: Enable GitHub Pages in Repository Settings
1. Go to: https://github.com/ShreyasKulkarniNU/CVSHealth-Patient-Dashboard/settings/pages
2. Under "Source", select `gh-pages` branch
3. Save

Your app will be available at:
```
https://shreyaskulkarninu.github.io/CVSHealth-Patient-Dashboard/
```

---

### Option 2: Manual Deployment (Alternative)

#### Step 1: Build for Production
```bash
cd cvs-health-dashboard
ng build --configuration production --base-href /CVSHealth-Patient-Dashboard/
```

#### Step 2: Create gh-pages Branch
```bash
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/cvs-health-dashboard/browser/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
git checkout main
```

#### Step 3: Enable GitHub Pages
1. Go to repository settings
2. Pages → Source: `gh-pages` branch
3. Save

---

## 🔧 Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: cvs-health-dashboard/package-lock.json
      
      - name: Install dependencies
        working-directory: ./cvs-health-dashboard
        run: npm ci
      
      - name: Build
        working-directory: ./cvs-health-dashboard
        run: npm run build -- --configuration production --base-href /CVSHealth-Patient-Dashboard/
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./cvs-health-dashboard/dist/cvs-health-dashboard/browser
          cname: # Optional: your custom domain
```

---

## 📝 Quick Commands Reference

### Push Current Changes
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Force Push (Use with caution)
```bash
git push origin main --force
```

### Create and Push Tags
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## 🔐 Authentication Issues

If you encounter authentication errors:

### Option 1: Use Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Generate new token with `repo` permissions
3. Use token as password when pushing

### Option 2: Use SSH
```bash
git remote set-url origin git@github.com:ShreyasKulkarniNU/CVSHealth-Patient-Dashboard.git
```

---

## ✅ Verification Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Build successful
- [ ] Application accessible via GitHub Pages URL
- [ ] All features working in production

---

## 🆘 Troubleshooting

### Issue: "Failed to connect to github.com"
**Solution**: Check internet connection, firewall settings, or use VPN

### Issue: Authentication failed
**Solution**: Use Personal Access Token or SSH key

### Issue: Build fails
**Solution**: Check Node.js version (should be 18+), ensure all dependencies are installed

### Issue: Pages not loading
**Solution**: Check base-href in build command matches repository name

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [Git Basics](https://git-scm.com/book)

---

**Repository**: https://github.com/ShreyasKulkarniNU/CVSHealth-Patient-Dashboard

