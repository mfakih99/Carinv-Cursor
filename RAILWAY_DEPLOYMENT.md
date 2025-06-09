# Railway Deployment Guide

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository connected to Railway

## Step 1: Set up PostgreSQL on Railway

1. In your Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically provision a PostgreSQL database
4. Click on the PostgreSQL service to view the connection details

## Step 2: Configure Environment Variables

In your Railway app service, go to "Variables" and add:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
NEXTAUTH_URL=https://your-app-name.railway.app
NEXTAUTH_SECRET=your-generated-secret-here
NODE_ENV=production
```

To generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Step 3: Database Setup

Railway will automatically run the `postinstall` script which generates the Prisma client.

To set up the database schema:

1. In Railway, go to your app service
2. Go to "Settings" → "Deploy" 
3. Add a deploy command: `npx prisma db push && npm run build`

Or manually from your local machine:
```bash
# Set the DATABASE_URL from Railway
export DATABASE_URL="your-railway-postgres-url"

# Push the schema
npx prisma db push

# Seed the database (optional)
npm run db:seed
```

## Step 4: Deploy

1. Push your code to GitHub
2. Railway will automatically deploy

## Step 5: Verify Deployment

1. Visit your Railway app URL
2. The default demo user credentials are:
   - Email: demo@example.com
   - Password: demo123

## Troubleshooting

### Database Connection Issues
- Ensure DATABASE_URL includes `?sslmode=require`
- Check that the PostgreSQL service is running in Railway

### Build Failures
- Check the build logs in Railway
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### Runtime Errors
- Check the deploy logs in Railway
- Ensure Prisma client is generated (`npx prisma generate`)
- Verify all required environment variables are set

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host/db?sslmode=require |
| NEXTAUTH_URL | Your app's URL | https://app.railway.app |
| NEXTAUTH_SECRET | Random secret for NextAuth | Generated with openssl |
| NODE_ENV | Environment | production |

## Useful Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database
npm run db:seed

# View database in Prisma Studio
npx prisma studio
``` 