# 🖼️ Cloudinary Setup Guide

## **Step 1: Create Cloudinary Account**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up Free"
3. Fill in your details:
   - Email address
   - Password
   - First & Last name
4. Verify your email address

## **Step 2: Access Dashboard**
1. After verification, you'll be redirected to the dashboard
2. You'll see the "Dashboard" tab is already selected

## **Step 3: Get API Credentials**

On the dashboard, you'll see a section called **"Account Details"**:

### **Cloud Name:**
- Look for "Cloud name" field
- Example: `dpX2X3X3X` or `your-chosen-name`
- This is your `CLOUDINARY_CLOUD_NAME`

### **API Key:**
- Look for "API Key" field  
- Example: `123456789012345`
- This is your `CLOUDINARY_API_KEY`

### **API Secret:**
- Look for "API Secret" field
- Click the "👁️" (eye) icon to reveal it
- Example: `abcdefgh123456789`
- This is your `CLOUDINARY_API_SECRET`

## **Step 4: Copy Values**

You should have something like:
```
CLOUDINARY_CLOUD_NAME=dpX2X3X3X
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefgh123456789
```

## **⚠️ Security Note:**
- Never share your API Secret publicly
- Don't commit it to version control
- Only add it to secure environment variables

## **📸 Visual Guide:**
The dashboard looks like this:
```
┌─────────────────────────────────────┐
│ Product Environment: Production     │
├─────────────────────────────────────┤
│ Cloud name: dpX2X3X3X              │
│ API Key: 123456789012345           │
│ API Secret: **************** 👁️    │
│                                     │
│ [Copy Cloud Name] [Copy API Key]   │
└─────────────────────────────────────┘
```

## **🎯 What These Do:**
- **Cloud Name**: Identifies your Cloudinary account
- **API Key**: Public identifier for API requests
- **API Secret**: Secret key for authenticated operations (image uploads, deletions, etc.)

Your Cloudinary account includes:
- 25GB free storage
- 25GB free bandwidth
- Image/video transformations
- Automatic optimization
