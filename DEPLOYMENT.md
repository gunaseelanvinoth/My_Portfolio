# 🚀 Deployment Guide for Vercel

## Quick Start - Deploy to Vercel

### Step 1: Install Dependencies Locally (Optional - for testing)

```bash
cd My_Portfolio
npm install
```

### Step 2: Test Locally

```bash
npm start
```

Visit `http://localhost:3000` to verify everything works.

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd My_Portfolio
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No** (first time)
   - Project name? **gunaseelan-portfolio** (or your choice)
   - Directory? **./** (current directory)
   - Override settings? **No**

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

#### Option B: Using GitHub Integration (Easier)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Node.js
   - Click "Deploy"

3. **Your site will be live in seconds!**

## 📁 File Structure for Vercel

Make sure your project has this structure:

```
My_Portfolio/
├── api/
│   └── index.js          ← Vercel serverless function
├── files/
│   ├── certificates/     ← Your certificate images
│   └── portfolio/        ← Your profile images
├── index.html           ← Main HTML file
├── package.json         ← Dependencies
├── vercel.json         ← Vercel config
└── .gitignore          ← Git ignore file
```

## ✅ Checklist Before Deploying

- [ ] All image paths use `/files/` prefix (✅ Done)
- [ ] `package.json` has correct dependencies
- [ ] `vercel.json` is configured
- [ ] `api/index.js` exists and exports Express app
- [ ] All certificate images are in `files/certificates/`
- [ ] Profile image is in `files/portfolio/`

## 🔗 After Deployment

Your portfolio will be available at:
- **Development**: `https://your-project.vercel.app`
- **Production**: `https://your-project.vercel.app` (or custom domain)

## 🛠️ Troubleshooting

### Images Not Loading?
- Check that image paths start with `/files/`
- Verify files are in the correct directories
- Check browser console for 404 errors

### API Not Working?
- Verify `api/index.js` exports the Express app
- Check `vercel.json` routes configuration
- Test endpoints: `/api/health` and `/api/portfolio`

### Build Errors?
- Ensure Node.js version is 18+ in `package.json`
- Check that all dependencies are listed
- Review Vercel build logs

## 📝 Environment Variables

No environment variables needed for basic setup. If you add features later:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your variables
3. Redeploy

## 🎉 Success!

Once deployed, share your portfolio URL:
```
https://your-project.vercel.app
```

---

Need help? Check Vercel docs: https://vercel.com/docs

