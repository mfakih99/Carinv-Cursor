#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Car Wholesaler Inventory - Debug Report\n');

// Check environment variables
console.log('1. Environment Variables:');
const requiredEnvVars = ['DATABASE_URL', 'NEXTAUTH_URL', 'NEXTAUTH_SECRET'];
const missingEnvVars = [];

requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`   ✅ ${varName}: Set`);
  } else {
    console.log(`   ❌ ${varName}: Missing`);
    missingEnvVars.push(varName);
  }
});

// Check if .env file exists
console.log('\n2. Configuration Files:');
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (fs.existsSync(envPath)) {
  console.log('   ✅ .env file exists');
} else {
  console.log('   ❌ .env file missing');
}

if (fs.existsSync(envExamplePath)) {
  console.log('   ✅ .env.example file exists');
} else {
  console.log('   ⚠️  .env.example file missing');
}

// Check database connection
console.log('\n3. Database Connection:');
if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    console.log(`   ✅ Database type: ${url.protocol.replace(':', '')}`);
    console.log(`   ✅ Database host: ${url.hostname}`);
    console.log(`   ✅ SSL mode: ${url.searchParams.get('sslmode') || 'not specified'}`);
  } catch (error) {
    console.log(`   ❌ Invalid DATABASE_URL format`);
  }
} else {
  console.log('   ❌ DATABASE_URL not set');
}

// Check for common issues
console.log('\n4. Common Issues:');

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('   ✅ node_modules exists');
} else {
  console.log('   ❌ node_modules missing - run: npm install');
}

// Check if Prisma client is generated
const prismaClientPath = path.join(__dirname, '..', 'node_modules', '@prisma', 'client');
if (fs.existsSync(prismaClientPath)) {
  console.log('   ✅ Prisma client generated');
} else {
  console.log('   ❌ Prisma client not generated - run: npx prisma generate');
}

// Check for build output
const nextBuildPath = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextBuildPath)) {
  console.log('   ✅ Next.js build exists');
} else {
  console.log('   ⚠️  No build found - run: npm run build');
}

// Check API routes
console.log('\n5. API Routes:');
const apiRoutes = [
  'src/app/api/vehicles/route.ts',
  'src/app/api/vehicles/[id]/route.ts'
];

apiRoutes.forEach(route => {
  const routePath = path.join(__dirname, '..', route);
  if (fs.existsSync(routePath)) {
    console.log(`   ✅ ${route}`);
  } else {
    console.log(`   ❌ ${route} - missing`);
  }
});

// Check critical pages
console.log('\n6. Pages:');
const pages = [
  'src/app/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/vehicles/page.tsx',
  'src/app/vehicles/new/page.tsx',
  'src/app/vehicles/[id]/page.tsx'
];

pages.forEach(page => {
  const pagePath = path.join(__dirname, '..', page);
  if (fs.existsSync(pagePath)) {
    console.log(`   ✅ ${page}`);
  } else {
    console.log(`   ❌ ${page} - missing`);
  }
});

// Summary
console.log('\n📊 Summary:');
if (missingEnvVars.length === 0) {
  console.log('   ✅ All required environment variables are set');
} else {
  console.log(`   ❌ Missing environment variables: ${missingEnvVars.join(', ')}`);
}

console.log('\n💡 Next Steps:');
if (missingEnvVars.length > 0) {
  console.log('   1. Create a .env file and set the missing environment variables');
}
if (!fs.existsSync(prismaClientPath)) {
  console.log('   2. Run: npx prisma generate');
}
if (!fs.existsSync(nodeModulesPath)) {
  console.log('   3. Run: npm install');
}

console.log('\n✨ Done!'); 