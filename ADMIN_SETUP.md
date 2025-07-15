# Stratum Tech Admin Setup Guide

## 🚀 Quick Setup

### 1. Create Admin User in Supabase Dashboard

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your Stratum Tech project

2. **Navigate to Authentication**
   - Click on "Authentication" in the left sidebar
   - Go to "Users" tab

3. **Add New User**
   - Click "Add User" button
   - Enter admin email (e.g., `admin@stratumtech.com`)
   - Enter a strong password
   - Click "Create User"

### 2. Alternative: Enable Email Signup

1. **Go to Authentication Settings**
   - Click "Authentication" → "Settings"
   - Scroll to "Auth Providers"

2. **Enable Email Provider**
   - Make sure "Email" is enabled
   - Set "Confirm email" to "No" for easier testing
   - Save changes

3. **Create User via Login Form**
   - Visit `/admin/login`
   - Use the signup form (if enabled)
   - Or use the dashboard method above

### 3. Test Login

1. **Visit Admin Login**
   - Go to `http://localhost:3000/admin/login`
   - Enter your admin credentials
   - Click "Sign In"

2. **Verify Access**
   - You should be redirected to `/admin/dashboard`
   - Check that all admin pages are accessible

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid login credentials"**
   - Double-check email and password
   - Ensure user exists in Supabase dashboard
   - Check if email is confirmed (if required)

2. **Redirect loop**
   - Clear browser cookies and localStorage
   - Restart development server
   - Check middleware configuration

3. **Session not persisting**
   - Verify environment variables are set correctly
   - Check Supabase URL and anon key
   - Ensure cookies are enabled in browser

### Environment Variables Check:

Make sure your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔒 Security Best Practices

1. **Strong Passwords**
   - Use at least 12 characters
   - Include uppercase, lowercase, numbers, symbols

2. **Environment Variables**
   - Never commit `.env.local` to git
   - Use different keys for development/production

3. **Regular Updates**
   - Keep Supabase packages updated
   - Monitor for security updates

## 📱 Admin Features Available

Once logged in, you can:
- ✅ View dashboard with statistics
- ✅ Manage tours (CRUD operations)
- ✅ Manage cars (CRUD operations)
- ✅ Manage accommodations (CRUD operations)
- ✅ Manage events (CRUD operations)
- ✅ Upload images for items
- ✅ Bulk operations (coming soon)

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify Supabase project settings
3. Test with the debug page at `/admin/debug`
4. Check the terminal for middleware logs 