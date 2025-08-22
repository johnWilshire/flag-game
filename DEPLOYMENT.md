# Deploying to GitHub Pages

This guide explains how to deploy the Flag Guessing Game to GitHub Pages.

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git Repository**: The project should be in a GitHub repository
3. **Node.js**: Ensure Node.js and npm are installed

## Setup Steps

### 1. Update Homepage URL
Update the `homepage` field in `package.json` to match your GitHub username and repository:

```json
"homepage": "https://YOUR_USERNAME.github.io/flag-guessing-game"
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 2. Install Dependencies
The `gh-pages` package is already installed, but if needed:

```bash
npm install --save-dev gh-pages
```

### 3. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 4. Add GitHub Remote
```bash
git remote add origin https://github.com/YOUR_USERNAME/flag-guessing-game.git
git branch -M main
git push -u origin main
```

### 5. Deploy to GitHub Pages
Run the deployment script:

```bash
npm run deploy
```

This command will:
- Build the production version (`npm run build`)
- Deploy the `build` folder to the `gh-pages` branch
- GitHub Pages will automatically serve your app

### 6. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose the **gh-pages** branch
5. Click **Save**

## Deployment Commands

- **Deploy**: `npm run deploy`
- **Build only**: `npm run build`
- **Local development**: `npm start`

## Notes

- The app will be available at: `https://YOUR_USERNAME.github.io/flag-guessing-game`
- Each deployment creates a new commit on the `gh-pages` branch
- Changes may take a few minutes to appear on the live site
- Make sure your repository is public for GitHub Pages to work (unless you have GitHub Pro)

## Troubleshooting

- **404 Error**: Check that the homepage URL in package.json matches your repository
- **Assets not loading**: Ensure all paths are relative and the homepage is correctly set
- **Build fails**: Run `npm run build` locally first to check for errors
