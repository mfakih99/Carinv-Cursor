# Complete Backend Setup Guide for Railway

This guide will help you fully integrate the frontend with the backend, set up database, authentication, and file storage on Railway.

## Prerequisites

- Railway account (https://railway.app)
- GitHub repository connected to Railway
- Node.js and npm installed locally

## Step 1: Database Setup on Railway

### 1.1 Create PostgreSQL Database

1. In your Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create a PostgreSQL instance with credentials

### 1.2 Get Database Connection String

1. Click on your PostgreSQL service
2. Go to "Variables" tab
3. Copy the `DATABASE_URL` value

### 1.3 Set Environment Variables

1. Click on your web service
2. Go to "Variables" tab
3. Add the following environment variables:

```env
DATABASE_URL="postgresql://..." # Your PostgreSQL URL from step 1.2
NEXTAUTH_SECRET="generate-a-random-string-here"
NEXTAUTH_URL="https://your-app.up.railway.app"
```

## Step 2: Run Database Migrations

### 2.1 Local Setup

1. Create a `.env` file locally (copy from `.env.example`):

```bash
cp .env.example .env
```

2. Add your Railway database URL to `.env`:

```env
DATABASE_URL="postgresql://..." # Your Railway PostgreSQL URL
```

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run migrations:

```bash
npx prisma migrate deploy
```

### 2.2 Seed Database (Optional)

Update `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('password', 10)
  
  const user = await prisma.user.create({
    data: {
      email: 'demo@carwholesaler.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      businessName: 'Demo Car Wholesale',
    }
  })
  
  console.log('Created demo user:', user.email)
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect())
```

Run seed:

```bash
npx prisma db seed
```

## Step 3: File Storage Setup

Railway doesn't provide built-in file storage. Choose one of these options:

### Option 1: Uploadthing (Recommended - Easiest)

1. Sign up at https://uploadthing.com
2. Create a new app
3. Get your API keys
4. Add to Railway environment variables:

```env
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"
```

5. Install Uploadthing:

```bash
npm install uploadthing @uploadthing/react
```

6. Create upload API route at `src/app/api/uploadthing/route.ts`:

```typescript
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  documentUploader: f({ 
    pdf: { maxFileSize: "4MB" },
    image: { maxFileSize: "4MB" },
  })
    .middleware(async ({ req }) => {
      // Auth check here
      return { userId: "user-id" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
```

### Option 2: Cloudinary

1. Sign up at https://cloudinary.com
2. Get your credentials
3. Add to Railway environment variables:

```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

4. Install Cloudinary:

```bash
npm install cloudinary
```

### Option 3: AWS S3

1. Create S3 bucket
2. Create IAM user with S3 access
3. Add to Railway environment variables:

```env
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"
```

4. Install AWS SDK:

```bash
npm install @aws-sdk/client-s3
```

## Step 4: Update API Routes with Authentication

### 4.1 Create Auth Middleware

Create `src/lib/auth.ts`:

```typescript
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface AuthUser {
  userId: string
  email: string
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) return null
  
  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || 'your-secret-key'
    ) as AuthUser
    
    return decoded
  } catch {
    return null
  }
}
```

### 4.2 Update API Routes

Update all API routes to use real user ID:

```typescript
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const authUser = getAuthUser(request)
  
  if (!authUser) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const userId = authUser.userId
  // ... rest of your code
}
```

## Step 5: Update Frontend API Calls

### 5.1 Create API Client

Create `src/lib/api.ts`:

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export class ApiClient {
  private token: string | null = null
  
  setToken(token: string) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }
  
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }
  
  async fetch(url: string, options: RequestInit = {}) {
    const token = this.getToken()
    
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      }
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    
    return response.json()
  }
}

export const api = new ApiClient()
```

### 5.2 Update Pages to Use Real API

Example for Expenses page:

```typescript
import { api } from '@/lib/api'

// In your component
useEffect(() => {
  async function loadExpenses() {
    try {
      const data = await api.fetch('/api/expenses')
      setExpenses(data)
    } catch (error) {
      console.error('Failed to load expenses:', error)
    }
  }
  
  loadExpenses()
}, [])

// Create expense
const handleCreateExpense = async (formData: any) => {
  try {
    const expense = await api.fetch('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    
    setExpenses([...expenses, expense])
  } catch (error) {
    console.error('Failed to create expense:', error)
  }
}
```

## Step 6: Deploy to Railway

### 6.1 Update package.json scripts:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

### 6.2 Update railway.json:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 6.3 Push to GitHub

```bash
git add .
git commit -m "Add complete backend integration"
git push
```

Railway will automatically deploy your changes.

## Step 7: Test Your Application

1. Visit your Railway app URL
2. Register a new account
3. Test all features:
   - Vehicle management
   - Expense tracking
   - Document upload
   - Customer management

## Troubleshooting

### Database Connection Issues

1. Check DATABASE_URL is correct
2. Ensure PostgreSQL service is running
3. Check logs in Railway dashboard

### File Upload Issues

1. Verify storage service credentials
2. Check CORS settings if using external service
3. Ensure file size limits are appropriate

### Authentication Issues

1. Verify NEXTAUTH_SECRET is set
2. Check token expiration
3. Ensure middleware is applied to all protected routes

## Next Steps

1. Set up monitoring (Sentry, LogRocket)
2. Configure backup strategy
3. Set up CI/CD pipeline
4. Add rate limiting
5. Implement caching (Redis)
6. Set up webhook endpoints
7. Add email notifications (SendGrid, Resend)

## Support

For Railway-specific issues:
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app

For app-specific issues:
- Check the GitHub issues
- Review the logs in Railway dashboard 