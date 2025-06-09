# Quick Start Guide - Deploy to Railway in 5 Minutes

## Prerequisites
- Railway account (sign up at railway.app)
- GitHub account
- This repository pushed to GitHub

## Step 1: Deploy to Railway (2 min)

1. Go to [Railway](https://railway.app) and click "Start a New Project"
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account and select this repository
4. Railway will automatically start deploying

## Step 2: Add PostgreSQL Database (1 min)

1. In your Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway creates the database automatically

## Step 3: Configure Environment Variables (1 min)

1. Click on your web service in Railway
2. Go to "Variables" tab
3. Railway should auto-detect DATABASE_URL from PostgreSQL
4. Add these additional variables:

```
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=https://your-app.up.railway.app
```

To generate NEXTAUTH_SECRET, run:
```bash
openssl rand -base64 32
```

## Step 4: Set Up File Storage (1 min)

### Option A: Uploadthing (Easiest)
1. Go to [uploadthing.com](https://uploadthing.com)
2. Create free account and new app
3. Copy your keys and add to Railway:

```
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=your-app-id
```

### Option B: Use Base64 in Database
No additional setup needed (files stored as base64 in PostgreSQL)

## Step 5: Deploy and Test

1. Railway will automatically redeploy with new variables
2. Click on your app URL (shown in Railway dashboard)
3. Your app is live! 🎉

## First Time Setup

1. Visit your app URL
2. Click "Register" to create an account
3. Or use demo credentials:
   - Email: `demo@carwholesaler.com`
   - Password: `password`

## Troubleshooting

### Database not connecting?
- Check DATABASE_URL in Railway variables
- Make sure PostgreSQL service is running

### Can't login?
- Run database seed: Add this to Railway deploy command:
  ```
  npx prisma db seed && npm start
  ```

### File upload not working?
- Verify Uploadthing credentials
- Check browser console for errors

## Local Development

1. Copy environment variables from Railway:
```bash
cp env.example .env
# Add your Railway DATABASE_URL
```

2. Install and run:
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Support

- Railway Discord: https://discord.gg/railway
- Check logs in Railway dashboard
- Open an issue on GitHub

---

**That's it! Your app should be live in under 5 minutes! 🚀** 