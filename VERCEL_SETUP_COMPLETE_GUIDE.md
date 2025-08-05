# 🚀 Complete Vercel Environment Variables Setup

## **Step-by-Step Instructions**

### **1. Access Vercel Environment Variables**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your `karamsathi` project
3. Click **"Settings"** tab at the top
4. Click **"Environment Variables"** in the left sidebar

### **2. Add Each Variable One by One**

For each variable below, follow this process:
1. Click **"Add New"** button
2. Enter the **Name** (exactly as shown)
3. Enter the **Value** (get from guides below)
4. Select **"Production, Preview, and Development"**
5. Click **"Save"**

---

## **Required Variables (Add These First):**

### **Variable 1: DATABASE_URL**
```
Name: DATABASE_URL
Value: [Get from Database Setup Guide]
Environment: Production, Preview, and Development
```

**Where to get value:**
- **Railway**: Copy from Variables tab in your PostgreSQL service
- **Supabase**: Copy from Settings → Database → Connection string
- **PlanetScale**: Copy from Connect → Prisma

---

### **Variable 2: NEXTAUTH_SECRET**
```
Name: NEXTAUTH_SECRET
Value: j1+PNfylnfUq7cbsR1X4/2jKscjs4/tWxLj/7+Hnm3k=
Environment: Production, Preview, and Development
```

**Where to get value:**
- Use the generated value above: `j1+PNfylnfUq7cbsR1X4/2jKscjs4/tWxLj/7+Hnm3k=`
- Or generate a new one with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

---

### **Variable 3: NEXTAUTH_URL**
```
Name: NEXTAUTH_URL
Value: https://your-app-name.vercel.app
Environment: Production, Preview, and Development
```

**Where to get value:**
1. In your Vercel project dashboard
2. Look for "Domains" section
3. Copy the `.vercel.app` URL
4. Example: `https://karamsathi-git-main-yourusername.vercel.app`

---

### **Variable 4: CLOUDINARY_CLOUD_NAME**
```
Name: CLOUDINARY_CLOUD_NAME
Value: [Get from Cloudinary Dashboard]
Environment: Production, Preview, and Development
```

**Where to get value:**
1. Go to [cloudinary.com/console](https://cloudinary.com/console)
2. Sign in to your account
3. On dashboard, find "Cloud name" field
4. Copy the value (e.g., `dpX2X3X3X`)

---

### **Variable 5: CLOUDINARY_API_KEY**
```
Name: CLOUDINARY_API_KEY
Value: [Get from Cloudinary Dashboard]
Environment: Production, Preview, and Development
```

**Where to get value:**
1. Same Cloudinary dashboard
2. Find "API Key" field
3. Copy the numeric value (e.g., `123456789012345`)

---

### **Variable 6: CLOUDINARY_API_SECRET**
```
Name: CLOUDINARY_API_SECRET
Value: [Get from Cloudinary Dashboard]
Environment: Production, Preview, and Development
```

**Where to get value:**
1. Same Cloudinary dashboard
2. Find "API Secret" field
3. Click the eye icon (👁️) to reveal
4. Copy the secret value (e.g., `abcdefgh123456789`)

---

### **Variable 7: SKIP_ENV_VALIDATION**
```
Name: SKIP_ENV_VALIDATION
Value: true
Environment: Production, Preview, and Development
```

**Value:** Simply type `true` (this helps with the build process)

---

## **Optional Variables (Add Later):**

### **For SMS/OTP (Twilio) - Optional**
```
Name: TWILIO_ACCOUNT_SID
Value: [Get from Twilio Console]

Name: TWILIO_AUTH_TOKEN
Value: [Get from Twilio Console]

Name: TWILIO_PHONE_NUMBER
Value: [Get from Twilio Console]
```

**Where to get Twilio values:**
1. Go to [twilio.com/console](https://twilio.com/console)
2. Account SID and Auth Token are on the main dashboard
3. Phone Number: Go to Phone Numbers → Manage → Active numbers

---

## **Final Checklist:**

After adding all variables, you should see:
- ✅ DATABASE_URL
- ✅ NEXTAUTH_SECRET  
- ✅ NEXTAUTH_URL
- ✅ CLOUDINARY_CLOUD_NAME
- ✅ CLOUDINARY_API_KEY
- ✅ CLOUDINARY_API_SECRET
- ✅ SKIP_ENV_VALIDATION

## **Next Steps:**

1. **Redeploy Your App:**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Select "Redeploy"
   - Wait for build to complete

2. **Test Your Deployment:**
   - Visit your Vercel URL
   - Check if the app loads correctly
   - Test navigation between pages

---

## **🆘 Troubleshooting:**

### **If Build Still Fails:**
1. Double-check all variable names (case-sensitive)
2. Ensure no extra spaces in values
3. Verify DATABASE_URL is accessible
4. Check Vercel build logs for specific errors

### **If Database Connection Fails:**
1. Test DATABASE_URL connection
2. Ensure database service is running
3. Check if IP restrictions are set (allow all for Vercel)

### **If Images Don't Load:**
1. Verify Cloudinary credentials
2. Check if cloud name is correct
3. Test API key/secret validity
