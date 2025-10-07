# Avexo Waitlist System

A complete waitlist management system for the Avexo landing page with backend storage and admin dashboard.

## Features

✅ **Email Collection** - Visitors can join the waitlist via the landing page  
✅ **Backend Storage** - All emails are saved in `waitlist.json` with timestamps  
✅ **Admin Dashboard** - View, search, and export all collected emails  
✅ **Duplicate Prevention** - Prevents the same email from being added twice  
✅ **CSV Export** - Download all emails as a CSV file  
✅ **Real-time Stats** - See total signups and today's signups  

## Setup Instructions

### 1. Install Node.js
If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

### 2. Install Dependencies
Open terminal in this folder and run:
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

### 4. Access the Pages

- **Landing Page**: http://localhost:3000/index.html
- **Admin Dashboard**: http://localhost:3000/admin.html

## File Structure

```
├── index.html          # Main landing page with waitlist form
├── admin.html          # Admin dashboard to view collected emails
├── server.js           # Backend server (Express.js)
├── package.json        # Dependencies
├── waitlist.json       # Email database (auto-created)
└── README.md           # This file
```

## How It Works

1. **User submits email** → Frontend sends POST request to `/api/waitlist`
2. **Server validates** → Checks if email is valid and not duplicate
3. **Email saved** → Stored in `waitlist.json` with timestamp and IP
4. **Admin views** → Dashboard fetches from `/api/admin/waitlist`

## Admin Dashboard Features

- **View All Emails** - See complete list with timestamps
- **Search** - Filter emails in real-time
- **Export CSV** - Download data for email marketing tools
- **Auto-refresh** - Dashboard updates every 30 seconds
- **Today's Stats** - See how many people joined today

## API Endpoints

### POST `/api/waitlist`
Add email to waitlist
```json
Request: { "email": "user@example.com" }
Response: { "success": true, "message": "Successfully joined the waitlist!" }
```

### GET `/api/admin/waitlist`
Get all waitlist emails (for admin)
```json
Response: {
  "success": true,
  "emails": [...],
  "count": 42
}
```

## Security Notes

⚠️ **Important**: This is a basic implementation. For production use, consider:
- Adding admin authentication/password protection
- Using a proper database (MongoDB, PostgreSQL, etc.)
- Adding rate limiting to prevent spam
- Implementing HTTPS
- Adding CAPTCHA to prevent bot submissions

## Development Mode

To enable auto-restart on file changes, use:
```bash
npm run dev
```

## Customization

- **Change Port**: Edit `PORT` in `server.js`
- **Styling**: Modify CSS in `index.html` or `admin.html`
- **Email Validation**: Update validation in `server.js`

## Support

For issues or questions, check the code comments or contact the developer.
