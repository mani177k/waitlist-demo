# Avexo Waitlist Landing Page - Implementation Contracts

## Frontend Status
✅ **COMPLETED** - Frontend with mock data implementation done

### Components Created:
1. **Hero.jsx** - Main hero section with 3D floating elements and waitlist form
2. **WaitlistForm.jsx** - Email capture form with validation
3. **Problems.jsx** - Problem cards section
4. **Solution.jsx** - Solution showcase with features
5. **HowItWorks.jsx** - Step-by-step process
6. **Testimonials.jsx** - Social proof section
7. **FinalCTA.jsx** - Final call-to-action with waitlist form
8. **Footer.jsx** - Footer with links and contact info

### Current Mock Data (in `/app/frontend/src/mock.js`):
- `mockWaitlistSubmit(email)` - Simulates email submission with 1.5s delay

---

## Backend Implementation Plan

### 1. Database Schema (MongoDB)

#### Waitlist Model (`/app/backend/models/waitlist.py`)
```python
{
    "id": str (UUID),
    "email": str (unique, required),
    "source": str (default: "landing_page"),
    "user_agent": str,
    "ip_address": str,
    "timestamp": datetime,
    "email_sent": bool (default: False),
    "status": str (default: "pending")  # pending, confirmed, unsubscribed
}
```

### 2. API Endpoints

#### POST `/api/waitlist`
- **Purpose**: Add email to waitlist
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "source": "landing_page",
    "user_agent": "Mozilla/5.0..."
  }
  ```
- **Response (Success - 201)**:
  ```json
  {
    "success": true,
    "message": "Successfully joined waitlist!",
    "data": {
      "id": "uuid",
      "email": "user@example.com"
    }
  }
  ```
- **Response (Error - 400)**:
  ```json
  {
    "success": false,
    "message": "Email already registered"
  }
  ```

#### GET `/api/waitlist` (Admin endpoint for future)
- **Purpose**: Retrieve all waitlist emails
- **Response**:
  ```json
  {
    "success": true,
    "count": 150,
    "data": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "timestamp": "2025-01-06T12:00:00Z",
        "status": "pending"
      }
    ]
  }
  ```

#### GET `/api/waitlist/export` (Admin endpoint)
- **Purpose**: Export waitlist to CSV format for Google Sheets import
- **Response**: CSV file download

### 3. Email Integration (EmailJS)

#### Configuration Required:
1. EmailJS Service ID
2. Two Email Templates:
   - **User Confirmation Template** (ID: user_confirmation)
   - **Admin Notification Template** (ID: admin_notification)

#### Email Flow:
1. User submits email → Store in MongoDB
2. Send confirmation email to user
3. Send notification email to admin (jitheshkhannaofficial@gmail.com)

#### Template Variables:
**User Confirmation Email**:
- `{{to_email}}`: User's email
- `{{from_name}}`: "Avexo Team"
- `{{message}}`: Welcome message

**Admin Notification Email**:
- `{{to_email}}`: jitheshkhannaofficial@gmail.com
- `{{subject}}`: "New Waitlist Signup!"
- `{{user_email}}`: New subscriber's email
- `{{timestamp}}`: Signup timestamp

### 4. Frontend Integration Changes

#### Update `/app/frontend/src/components/WaitlistForm.jsx`:
1. Replace `mockWaitlistSubmit(email)` with actual API call:
   ```javascript
   const response = await axios.post(`${API}/waitlist`, {
     email: email,
     source: 'landing_page',
     user_agent: navigator.userAgent
   });
   ```

2. Handle response states:
   - Success: Show success message + confetti
   - Error (duplicate): "You're already on the waitlist!"
   - Error (server): "Something went wrong. Please try again."

### 5. Backend Files to Create/Modify:

#### New Files:
1. `/app/backend/models/waitlist.py` - Pydantic model
2. `/app/backend/routers/waitlist.py` - API routes
3. `/app/backend/services/email_service.py` - EmailJS integration
4. `/app/backend/utils/validators.py` - Email validation

#### Modified Files:
1. `/app/backend/server.py` - Add waitlist router

### 6. Environment Variables (.env)

Add to `/app/backend/.env`:
```
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_USER_CONFIRMATION_TEMPLATE=user_confirmation
EMAILJS_ADMIN_NOTIFICATION_TEMPLATE=admin_notification
EMAILJS_PUBLIC_KEY=your_public_key
ADMIN_EMAIL=jitheshkhannaofficial@gmail.com
```

### 7. Dependencies to Add:

**Backend** (requirements.txt):
- `requests` (already installed)
- No additional dependencies needed for EmailJS (uses REST API)

**Frontend** (package.json):
- No additional dependencies (axios already installed)

---

## Testing Checklist

### Frontend Testing:
- ✅ Valid email submission
- ✅ Invalid email validation
- ✅ Duplicate email handling
- ✅ Loading states
- ✅ Success animation
- ✅ Error messages
- ✅ Mobile responsiveness

### Backend Testing:
- [ ] POST /api/waitlist - successful submission
- [ ] POST /api/waitlist - duplicate email
- [ ] POST /api/waitlist - invalid email format
- [ ] GET /api/waitlist - retrieve all emails
- [ ] Email delivery - user confirmation
- [ ] Email delivery - admin notification
- [ ] Database storage verification

### Integration Testing:
- [ ] End-to-end flow from form submission to email delivery
- [ ] Error handling across all states
- [ ] Rate limiting (prevent spam)

---

## Export to Google Sheets (Future Feature)

### Option 1: Manual Export
1. Backend provides CSV export endpoint
2. Admin downloads CSV
3. Import to Google Sheets manually

### Option 2: Automated Export (Later)
1. Use Google Sheets API
2. Requires OAuth setup
3. Auto-sync new signups to sheet

**Recommendation**: Start with Option 1 (CSV export) for MVP

---

## Notes:
- Mock data will be removed during backend integration
- EmailJS setup required before backend testing
- All email submissions will be stored in MongoDB first, then sent via email
- Admin can access all waitlist data via GET endpoint
