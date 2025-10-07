# EmailJS Setup Guide for Avexo

## 📧 Quick Setup (5 minutes)

### Step 1: Find Your Service ID
1. Go to EmailJS Dashboard: https://dashboard.emailjs.com/
2. Click **"Email Services"** in the left sidebar
3. You should see your connected email service (Gmail, Outlook, etc.)
4. Copy the **Service ID** (looks like: `service_xxxxxxx`)

### Step 2: Find Your Public Key (User ID)
1. Click **"Account"** in the left sidebar
2. Look for **"General"** tab
3. Find **"Public Key"** section
4. Copy the **Public Key** (looks like: `xxxxxxxxxxxxxxxxxx`)

### Step 3: Get Template IDs

#### User Confirmation Template (Already Created)
1. Click **"Email Templates"** in the left sidebar
2. Find your **"Welcome"** template
3. Click on it
4. Copy the **Template ID** from the top (looks like: `template_xxxxxxx`)

#### Admin Notification Template (Need to Create)
1. Click **"Create New Template"** button
2. **Template Name**: `Admin Notification`
3. **Subject**: `🎉 New Waitlist Signup - Avexo`
4. **Content**:
   ```
   Hi Jithesh,

   Great news! Someone just joined the Avexo waitlist.

   New Subscriber Details:
   - Email: {{user_email}}
   - Signed up at: {{timestamp}}
   - Source: Landing Page

   Check your MongoDB dashboard to see all waitlist entries.

   Keep building! 🚀
   Avexo Team
   ```
5. Click **Save**
6. Copy the **Template ID**

### Step 4: Update Environment Variables

Open `/app/backend/.env` and update these values:

```bash
# EmailJS Configuration
EMAILJS_SERVICE_ID="service_xxxxxxx"              # From Step 1
EMAILJS_USER_CONFIRMATION_TEMPLATE="template_xxx"  # From Step 3 (Welcome template)
EMAILJS_ADMIN_NOTIFICATION_TEMPLATE="template_xxx" # From Step 3 (Admin template)
EMAILJS_PUBLIC_KEY="xxxxxxxxxxxxxxxxxx"            # From Step 2
ADMIN_EMAIL="jitheshkhannaofficial@gmail.com"     # Already set
```

### Step 5: Restart Backend

After updating the `.env` file, restart the backend:

```bash
sudo supervisorctl restart backend
```

---

## ✅ Testing Email Integration

Once configured, test by submitting the waitlist form:

1. Go to http://localhost:3000
2. Enter a test email
3. Click "Join Waitlist"
4. You should receive:
   - ✉️ Confirmation email to the submitted address
   - ✉️ Notification email to jitheshkhannaofficial@gmail.com

---

## 📊 Export Waitlist to Google Sheets

### Option 1: CSV Export (Recommended)

1. **Download CSV**:
   ```bash
   curl -X GET http://localhost:8001/api/waitlist/export -o avexo_waitlist.csv
   ```

2. **Import to Google Sheets**:
   - Go to Google Sheets
   - File → Import → Upload → Select the CSV file
   - Done! Your waitlist is now in Google Sheets

### Option 2: API View (Quick Check)

View all waitlist entries in JSON format:
```bash
curl http://localhost:8001/api/waitlist
```

---

## 🔍 Monitoring Waitlist

### Get Statistics
```bash
curl http://localhost:8001/api/waitlist/stats
```

Response:
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "total": 150,
    "pending": 145,
    "confirmed": 5
  }
}
```

### View All Entries
```bash
curl http://localhost:8001/api/waitlist
```

---

## 🚨 Important Notes

1. **EmailJS Free Tier**: 200 emails/month
   - If you exceed this, you'll need to upgrade
   - Monitor usage at: https://dashboard.emailjs.com/

2. **Data Storage**: All emails are stored in MongoDB first
   - Even if EmailJS fails, you won't lose any signups
   - You can always export to CSV and manually email users

3. **Email Delivery**: Emails are sent asynchronously
   - Form submission won't fail if email fails
   - Check backend logs if emails aren't being sent

4. **Testing**: Use your own email first to verify templates are working correctly

---

## 📝 Troubleshooting

### Emails Not Sending?

1. Check backend logs:
   ```bash
   tail -f /var/log/supervisor/backend.err.log
   ```

2. Verify EmailJS credentials are correct in `.env`

3. Test EmailJS directly from their dashboard:
   - Go to Email Templates
   - Click "Test It" button on your template

### Invalid Email Address Error?

- Make sure the email format is correct
- Frontend validation should catch this, but backend validates too

### "You're already on the waitlist!" Error?

- This is expected for duplicate emails
- Check MongoDB to see existing entries:
  ```bash
  curl http://localhost:8001/api/waitlist
  ```

---

## 🎉 You're All Set!

Your Avexo waitlist landing page is now fully functional with:
- ✅ Email collection in MongoDB
- ✅ User confirmation emails (once EmailJS is configured)
- ✅ Admin notifications (once EmailJS is configured)
- ✅ CSV export for Google Sheets
- ✅ Beautiful dark-themed UI with 3D animations
- ✅ Mobile responsive design

Happy launching! 🚀
