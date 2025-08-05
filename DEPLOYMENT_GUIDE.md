# 🚀 KaramSaathi Deployment Guide

*Complete deployment documentation for KaramSaathi - India's Job Portal*

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Local Development](#local-development)
6. [Production Deployment](#production-deployment)
7. [Platform-Specific Deployments](#platform-specific-deployments)
8. [CI/CD Pipeline](#cicd-pipeline)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)
11. [Security Considerations](#security-considerations)

---

## 🎯 Overview

### **Application Architecture**
- **Framework**: Next.js 14.2.31 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Authentication**: NextAuth.js v4
- **Internationalization**: next-intl
- **Testing**: Playwright (E2E) + Jest (Unit)
- **Image Storage**: Cloudinary
- **SMS/OTP**: Twilio

### **Project Structure**
```
karamsathi/
├── src/
│   ├── app/[locale]/              # App Router pages
│   ├── components/                # Reusable components
│   ├── lib/                      # Utilities and configurations
│   └── i18n.ts                   # Internationalization config
├── prisma/                       # Database schema and migrations
├── tests/                        # E2E and unit tests
├── .github/workflows/            # CI/CD pipeline
└── docs/                         # Documentation
```

---

## ⚡ Prerequisites

### **System Requirements**
- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Latest version
- **Database**: PostgreSQL 14+ (production) or SQLite (development)

### **Development Tools**
- **VS Code**: Recommended IDE
- **Docker**: For containerized deployment (optional)
- **Vercel CLI**: For Vercel deployments
- **GitHub Account**: For version control and CI/CD

### **External Services**
- **Cloudinary**: Image upload and management
- **Twilio**: SMS and OTP services
- **Database Provider**: PostgreSQL (Railway, Supabase, PlanetScale, etc.)

---

## 🔧 Environment Configuration

### **Required Environment Variables**

Create `.env.local` file in the root directory:

```bash
# ================================
# DATABASE CONFIGURATION
# ================================
DATABASE_URL="sqlite:./dev.db"                    # Development
# DATABASE_URL="postgresql://user:pass@host:port/db"  # Production

# ================================
# NEXTAUTH CONFIGURATION
# ================================
NEXTAUTH_URL="http://localhost:3000"              # Development
# NEXTAUTH_URL="https://your-domain.com"          # Production
NEXTAUTH_SECRET="your-super-secret-key-here"     # Generate: openssl rand -base64 32

# ================================
# CLOUDINARY CONFIGURATION
# ================================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# ================================
# TWILIO CONFIGURATION
# ================================
TWILIO_ACCOUNT_SID="your-account-sid"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"

# ================================
# APPLICATION CONFIGURATION
# ================================
NODE_ENV="development"                            # development | production
NEXT_PUBLIC_APP_URL="http://localhost:3000"      # Development
# NEXT_PUBLIC_APP_URL="https://your-domain.com"  # Production

# ================================
# OPTIONAL: ANALYTICS & MONITORING
# ================================
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
SENTRY_DSN="your-sentry-dsn"
```

### **Environment Variable Generation**

#### **Generate NEXTAUTH_SECRET**
```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### **Database URL Examples**
```bash
# PostgreSQL (Production)
DATABASE_URL="postgresql://username:password@hostname:5432/database_name"

# Railway
DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"

# Supabase
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"

# PlanetScale
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/database_name?sslaccept=strict"
```

---

## 🗄️ Database Setup

### **Development Database (SQLite)**

1. **Initialize Database**
```bash
# Generate Prisma client
npm run db:generate

# Apply schema to database
npm run db:push

# Seed database with sample data (optional)
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

### **Production Database Setup**

#### **Option 1: Railway (Recommended)**
1. **Create Account**: [railway.app](https://railway.app)
2. **Create Project**: New Project → Provision PostgreSQL
3. **Get Connection String**: Copy DATABASE_URL from variables
4. **Update Environment**: Add to production environment variables

#### **Option 2: Supabase**
1. **Create Account**: [supabase.com](https://supabase.com)
2. **Create Project**: New Project → Create database
3. **Get Connection String**: Settings → Database → Connection string
4. **Update Environment**: Replace password in connection string

#### **Option 3: PlanetScale**
1. **Create Account**: [planetscale.com](https://planetscale.com)
2. **Create Database**: New Database → Select region
3. **Create Branch**: Production branch
4. **Get Connection String**: Connect → Prisma → Copy string

### **Database Migration for Production**

```bash
# 1. Update DATABASE_URL in environment
export DATABASE_URL="your-production-database-url"

# 2. Generate Prisma client
npx prisma generate

# 3. Deploy schema to production database
npx prisma db push

# 4. Verify deployment
npx prisma studio --browser none
```

---

## 💻 Local Development

### **Initial Setup**

```bash
# 1. Clone repository
git clone https://github.com/AjayBendale99/karamsathi.git
cd karamsathi

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Set up database
npm run db:generate
npm run db:push
npm run db:seed

# 5. Start development server
npm run dev
```

### **Development Commands**

```bash
# Start development server
npm run dev                    # http://localhost:3000

# Database operations
npm run db:generate           # Generate Prisma client
npm run db:push              # Apply schema changes
npm run db:seed              # Seed database
npm run db:studio            # Open database GUI

# Code quality
npm run lint                 # ESLint check
npm run type-check           # TypeScript check

# Testing
npm run test                 # Unit tests
npm run test:watch          # Unit tests (watch mode)
npm run test:e2e            # E2E tests
npm run test:all            # All tests

# Build for production
npm run build               # Build application
npm run start               # Start production server
```

### **Development Workflow**

1. **Feature Development**
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
npm run dev
npm run test

# Commit changes
git add .
git commit -m "feat: add your feature description"

# Push and create PR
git push origin feature/your-feature-name
```

2. **Code Quality Checks**
```bash
# Before committing
npm run lint                 # Fix linting issues
npm run type-check          # Fix TypeScript errors
npm run test               # Ensure tests pass
npm run build              # Ensure builds successfully
```

---

## 🌐 Production Deployment

### **Pre-deployment Checklist**

- [ ] Environment variables configured
- [ ] Database setup completed
- [ ] External services (Cloudinary, Twilio) configured
- [ ] Tests passing
- [ ] Build successful
- [ ] Domain/SSL configured (if custom domain)

### **Build Optimization**

```bash
# 1. Install dependencies (production only)
npm ci --production

# 2. Build application
npm run build

# 3. Test production build
npm run start

# 4. Verify build output
ls -la .next/
```

### **Performance Optimization**

#### **Next.js Configuration** (`next.config.mjs`)
```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  
  // Environment variables
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
}

export default withNextIntl(nextConfig);
```

---

## 🎯 Platform-Specific Deployments

### **Vercel Deployment (Recommended)**

#### **Automatic Deployment**
1. **Connect Repository**
   - Visit [vercel.com](https://vercel.com)
   - Import Git Repository
   - Select `karamsathi` repository

2. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Set for Production, Preview, and Development

4. **Database Configuration**
   ```bash
   # Add to Vercel environment variables
   DATABASE_URL=your-production-database-url
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-generated-secret
   ```

5. **Deploy**
   ```bash
   # Deploy from CLI (optional)
   npx vercel --prod
   ```

#### **Manual Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### **Netlify Deployment**

1. **Build Configuration** (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Environment Variables**
   - Site Settings → Environment Variables
   - Add all production environment variables

### **Railway Deployment**

1. **railway.json Configuration**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

2. **Deploy**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

### **AWS Amplify Deployment**

1. **amplify.yml Configuration**
```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - npm ci
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### **Docker Deployment**

1. **Dockerfile**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

2. **docker-compose.yml**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db
      
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: karamsathi
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

3. **Deploy with Docker**
```bash
# Build and run
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔄 CI/CD Pipeline

### **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linting
        run: npm run lint
        
      - name: Run type checking
        run: npm run type-check
        
      - name: Generate Prisma client
        run: npx prisma generate
        
      - name: Run unit tests
        run: npm run test:coverage
        
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
        
      - name: Run E2E tests
        run: npm run test:e2e
        
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: test-results/
          
  build:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate Prisma client
        run: npx prisma generate
        
      - name: Build application
        run: npm run build
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-files
          path: .next/
          
  deploy:
    runs-on: ubuntu-latest
    needs: [test, build]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### **Environment Secrets Setup**

1. **GitHub Repository Secrets**
   - Go to Repository Settings → Secrets and variables → Actions
   - Add the following secrets:

```bash
# Vercel Deployment
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id

# Database
DATABASE_URL=your-production-database-url

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret

# External Services
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
```

### **Deployment Strategies**

#### **Blue-Green Deployment**
```yaml
# Deploy to staging first
- name: Deploy to Staging
  run: vercel --target staging

# Run tests against staging
- name: Test Staging
  run: npm run test:e2e:staging

# Promote to production
- name: Promote to Production
  run: vercel --prod --promote
```

#### **Canary Deployment**
```yaml
# Deploy to 10% of traffic
- name: Canary Deployment
  run: |
    vercel --prod
    vercel alias set deployment-url --scope=team --limit=10%
```

---

## 📊 Monitoring & Maintenance

### **Application Monitoring**

#### **Health Check Endpoint** (`src/app/api/health/route.ts`)
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version,
      database: 'connected'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed'
    }, { status: 503 });
  }
}
```

#### **Monitoring Setup**

1. **Uptime Monitoring**
   - Use services like UptimeRobot, Pingdom, or StatusPage
   - Monitor `/api/health` endpoint
   - Set up alerts for downtime

2. **Performance Monitoring**
   - **Vercel Analytics**: Built-in performance monitoring
   - **Google PageSpeed Insights**: Regular performance audits
   - **Web Vitals**: Core Web Vitals monitoring

3. **Error Monitoring**
   - **Sentry**: Error tracking and performance monitoring
   - **LogRocket**: Session replay and debugging
   - **Vercel Functions**: Built-in function logs

#### **Sentry Integration**
```typescript
// src/instrumentation.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### **Database Maintenance**

#### **Regular Maintenance Tasks**
```bash
# 1. Database backup (daily)
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# 2. Optimize database (weekly)
npx prisma db execute --sql="VACUUM ANALYZE;"

# 3. Check database size (monthly)
npx prisma db execute --sql="SELECT pg_size_pretty(pg_database_size(current_database()));"
```

#### **Migration Strategy**
```bash
# 1. Create migration
npx prisma migrate dev --name migration_name

# 2. Test migration
npx prisma migrate deploy --preview-feature

# 3. Deploy to production
npx prisma migrate deploy
```

### **Security Updates**

#### **Dependency Updates**
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

#### **Security Monitoring**
```bash
# GitHub Dependabot alerts
# Snyk security monitoring
# npm audit in CI/CD pipeline
```

### **Performance Optimization**

#### **Database Query Optimization**
```typescript
// Use Prisma query optimization
const users = await prisma.user.findMany({
  select: { id: true, name: true }, // Only select needed fields
  where: { active: true },
  orderBy: { createdAt: 'desc' },
  take: 10, // Limit results
});
```

#### **Image Optimization**
```typescript
// Next.js Image component with Cloudinary
import { CldImage } from 'next-cloudinary';

<CldImage
  src="sample"
  width="400"
  height="300"
  sizes="(max-width: 768px) 100vw, 50vw"
  format="auto"
  quality="auto"
/>
```

#### **Caching Strategy**
```typescript
// ISR (Incremental Static Regeneration)
export const revalidate = 3600; // 1 hour

// API Route caching
export async function GET() {
  const data = await fetchData();
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
```

---

## 🚨 Troubleshooting

### **Common Issues & Solutions**

#### **Build Failures**

1. **TypeScript Errors**
```bash
# Problem: Type errors during build
# Solution: Fix type errors or skip type checking (not recommended)
npm run type-check
# or add to next.config.mjs:
typescript: { ignoreBuildErrors: true }
```

2. **Memory Issues**
```bash
# Problem: JavaScript heap out of memory
# Solution: Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

3. **Missing Environment Variables**
```bash
# Problem: Environment variables not found
# Solution: Verify environment variables are set
echo $DATABASE_URL
# Check deployment platform environment settings
```

#### **Database Issues**

1. **Connection Errors**
```bash
# Problem: Can't connect to database
# Solutions:
# 1. Check DATABASE_URL format
# 2. Verify database is running
# 3. Check firewall settings
# 4. Regenerate Prisma client
npx prisma generate
npx prisma db push
```

2. **Migration Failures**
```bash
# Problem: Migration fails
# Solutions:
# 1. Reset database (development only)
npx prisma migrate reset

# 2. Force migration (dangerous)
npx prisma db push --force-reset

# 3. Manual migration fix
npx prisma studio
```

#### **Authentication Issues**

1. **NextAuth Errors**
```bash
# Problem: NextAuth configuration errors
# Solutions:
# 1. Check NEXTAUTH_URL matches deployment URL
# 2. Verify NEXTAUTH_SECRET is set
# 3. Check provider configuration
```

2. **CORS Issues**
```typescript
// Add to next.config.mjs
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
      ],
    },
  ];
}
```

#### **Performance Issues**

1. **Slow Page Load**
```bash
# Solutions:
# 1. Enable compression
# 2. Optimize images
# 3. Use dynamic imports
# 4. Implement caching
# 5. Check bundle size
npx @next/bundle-analyzer
```

2. **Memory Leaks**
```bash
# Check memory usage
node --inspect npm start
# Use Chrome DevTools Memory tab
```

### **Debugging Tools**

#### **Development Debugging**
```bash
# Enable debug mode
DEBUG=* npm run dev

# Prisma debugging
DEBUG="prisma:*" npm run dev

# Next.js debugging
NODE_OPTIONS='--inspect' npm run dev
```

#### **Production Debugging**
```bash
# Check logs
vercel logs
railway logs
netlify logs

# Database connection test
npx prisma studio --browser none

# Health check
curl https://your-domain.com/api/health
```

### **Recovery Procedures**

#### **Database Recovery**
```bash
# 1. Stop application
# 2. Restore from backup
psql $DATABASE_URL < backup_file.sql
# 3. Verify data integrity
# 4. Restart application
```

#### **Rollback Deployment**
```bash
# Vercel
vercel rollback

# Railway
railway rollback

# Manual rollback
git revert HEAD
git push origin main
```

---

## 🔒 Security Considerations

### **Environment Security**

#### **Secure Environment Variables**
```bash
# Use strong secrets
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Database connection with SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# API keys rotation schedule
# Rotate keys monthly for production
```

#### **HTTPS Configuration**
```typescript
// Force HTTPS in production
if (process.env.NODE_ENV === 'production' && !req.url.startsWith('https://')) {
  return NextResponse.redirect(`https://${req.headers.host}${req.url}`);
}
```

### **Application Security**

#### **Security Headers** (`next.config.mjs`)
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

#### **Input Validation**
```typescript
// Use Zod for validation
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
});

// Validate in API routes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validData = userSchema.parse(body);
    // Process validated data
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}
```

#### **Rate Limiting**
```typescript
// Implement rate limiting
import { RateLimiter } from '@/lib/rate-limiter';

const limiter = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique tokens per interval
});

export async function POST(request: Request) {
  try {
    await limiter.check(request.ip, 10); // 10 requests per minute
    // Process request
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
}
```

### **Database Security**

#### **Connection Security**
```bash
# Use connection pooling
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"

# Enable row-level security
CREATE POLICY user_policy ON users USING (user_id = current_user_id());
```

#### **Data Encryption**
```typescript
// Encrypt sensitive data
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash(password, 12);
const isValid = await bcrypt.compare(password, hashedPassword);
```

### **Monitoring & Alerts**

#### **Security Monitoring**
```yaml
# GitHub Actions security scan
- name: Security Audit
  run: |
    npm audit --audit-level=high
    npx snyk test
    
- name: OWASP ZAP Scan
  uses: zaproxy/action-baseline@v0.7.0
  with:
    target: 'https://your-domain.com'
```

#### **Log Monitoring**
```typescript
// Security event logging
import { logger } from '@/lib/logger';

// Log security events
logger.warn('Failed login attempt', {
  ip: request.ip,
  userAgent: request.headers['user-agent'],
  timestamp: new Date().toISOString(),
});
```

---

## 📞 Support & Maintenance

### **Contact Information**
- **Repository**: [github.com/AjayBendale99/karamsathi](https://github.com/AjayBendale99/karamsathi)
- **Documentation**: See `/docs` folder
- **Issues**: GitHub Issues tab

### **Maintenance Schedule**
- **Daily**: Monitor uptime and performance
- **Weekly**: Review logs and security alerts
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Performance optimization and cost review

### **Backup Strategy**
- **Database**: Daily automated backups
- **Code**: Version control with Git
- **Environment**: Document all configurations
- **Recovery**: Tested recovery procedures

---

*Last updated: August 6, 2025*  
*Version: 1.0.0*  
*Deployment Guide for KaramSaathi v0.1.0*
