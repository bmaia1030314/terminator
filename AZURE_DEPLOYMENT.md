# Azure Deployment Guide

## ✅ Build Complete!

Your app has been successfully built and is ready for deployment. The production files are in the `dist/` folder.

---

## Option 1: Azure Static Web Apps (Recommended - FREE)

### Benefits:
- ✅ **Free tier available**
- ✅ Automatic CI/CD from GitHub
- ✅ Global CDN
- ✅ Custom domains & SSL included
- ✅ Perfect for React apps

### Steps:

#### 1. Push to GitHub (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/terminator.git
git push -u origin main
```

#### 2. Create Azure Static Web App

**Via Azure Portal:**
1. Go to https://portal.azure.com
2. Click "+ Create a resource"
3. Search for "Static Web Apps" → Click "Create"
4. Fill in:
   - **Resource Group**: Create new or use existing
   - **Name**: terminator-calculator (or your choice)
   - **Region**: Select closest to Portugal (e.g., West Europe)
   - **Source**: GitHub
   - **Sign in** to GitHub and authorize
   - Select your **repository** and **branch** (main)
   - **Build Details**:
     - Build Presets: **Custom**
     - App location: `/` (root)
     - API location: leave empty
     - Output location: `dist`
5. Click "Review + Create" → "Create"

#### 3. Wait for Deployment
- Azure will create a GitHub Action automatically
- Check progress in your GitHub repo → Actions tab
- Deployment takes ~2-5 minutes

#### 4. Access Your App
- Your URL will be: `https://YOUR-APP-NAME.azurestaticapps.net`
- Find it in Azure Portal → Your Static Web App → "URL"

---

## Option 2: Azure App Service (More Control)

### Benefits:
- More customization
- Can add backend APIs later
- Paid service (but has free tier)

### Steps:

#### 1. Install Azure CLI
```bash
# Windows (run in PowerShell as Administrator)
winget install Microsoft.AzureCLI
```

#### 2. Login to Azure
```bash
az login
```

#### 3. Create App Service
```bash
# Create resource group
az group create --name terminator-rg --location westeurope

# Create app service plan (Free tier)
az appservice plan create --name terminator-plan --resource-group terminator-rg --sku FREE --is-linux

# Create web app
az webapp create --name terminator-calculator-app --resource-group terminator-rg --plan terminator-plan --runtime "NODE:20-lts"
```

#### 4. Deploy
```bash
# Zip the dist folder
Compress-Archive -Path dist\* -DestinationPath deploy.zip -Force

# Deploy to Azure
az webapp deploy --resource-group terminator-rg --name terminator-calculator-app --src-path deploy.zip --type zip
```

#### 5. Configure for SPA
```bash
az webapp config set --resource-group terminator-rg --name terminator-calculator-app --startup-file "pm2 serve /home/site/wwwroot/dist --spa --no-daemon"
```

---

## Option 3: Azure Blob Storage + CDN (Ultra Cheap)

### Benefits:
- **Cheapest option** (~$1-5/month for small traffic)
- Fast static hosting
- Requires manual uploads

### Steps:

#### 1. Create Storage Account
```bash
az storage account create --name terminatorstorage --resource-group terminator-rg --location westeurope --sku Standard_LRS

# Enable static website hosting
az storage blob service-properties update --account-name terminatorstorage --static-website --index-document index.html --404-document index.html
```

#### 2. Upload Files
```bash
# Get connection string
az storage account show-connection-string --name terminatorstorage --resource-group terminator-rg

# Upload dist folder
az storage blob upload-batch --source dist --destination '$web' --account-name terminatorstorage
```

#### 3. Get Website URL
```bash
az storage account show --name terminatorstorage --resource-group terminator-rg --query "primaryEndpoints.web" --output tsv
```

---

## Quick Deploy Script (Static Web Apps)

Create a file `deploy-azure.ps1`:

```powershell
# Build the app
npm run build

# Optional: Preview locally first
# npm run preview

Write-Host "Build complete! Files are in dist/ folder" -ForegroundColor Green
Write-Host ""
Write-Host "To deploy to Azure Static Web Apps:" -ForegroundColor Cyan
Write-Host "1. Push to GitHub" -ForegroundColor Yellow
Write-Host "2. Create Static Web App in Azure Portal" -ForegroundColor Yellow
Write-Host "3. Connect to your GitHub repo" -ForegroundColor Yellow
Write-Host "4. Azure will auto-deploy on every push!" -ForegroundColor Yellow
```

---

## Recommended: Azure Static Web Apps

For your calculator app, I **strongly recommend Option 1 (Azure Static Web Apps)** because:

1. ✅ **Free tier** is generous (100 GB bandwidth/month)
2. ✅ **Zero configuration** - just connect GitHub
3. ✅ **Auto-deploys** on every git push
4. ✅ **Custom domain** support (free)
5. ✅ **SSL certificate** automatically managed
6. ✅ **Perfect for React** single-page apps

---

## Next Steps

1. Choose your deployment method (I recommend Static Web Apps)
2. Follow the steps above
3. Your app will be live with a public URL!
4. Optional: Add custom domain (e.g., terminator.yourdomain.com)

---

## Custom Domain Setup (After Deployment)

### For Static Web Apps:
1. Go to your Static Web App in Azure Portal
2. Click "Custom domains" in left menu
3. Click "+ Add"
4. Enter your domain name
5. Add the provided CNAME record to your DNS provider
6. Click "Validate" → "Add"
7. SSL certificate is automatically provisioned!

---

## Troubleshooting

### Issue: 404 on page refresh
**Solution**: Azure Static Web Apps handles this automatically. For App Service, ensure the startup script includes `--spa` flag.

### Issue: Build fails
**Check**:
- `package.json` scripts are correct
- `dist` folder is specified as output location
- Node version is 18+ in Azure

---

## Cost Estimate

- **Static Web Apps**: FREE (up to 100 GB bandwidth)
- **App Service**: FREE tier or ~€10-15/month for Basic
- **Blob Storage + CDN**: ~€1-5/month for small traffic

---

## Support

For issues:
1. Check Azure Portal → Resource → "Deployment Center" for logs
2. Check GitHub Actions tab for build errors
3. Azure Support: https://portal.azure.com (Support + troubleshooting)
