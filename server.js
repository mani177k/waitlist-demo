const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'waitlist.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Initialize waitlist file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ emails: [] }, null, 2));
}

// Endpoint to add email to waitlist
app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;
  
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    // Check if email already exists
    if (data.emails.some(entry => entry.email === email)) {
      return res.status(200).json({ success: true, message: 'You are already on the waitlist!' });
    }

    // Add new email with timestamp
    data.emails.push({
      email,
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    res.status(200).json({ success: true, message: 'Successfully joined the waitlist!' });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// Endpoint to get all emails (for admin)
app.get('/api/admin/waitlist', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.status(200).json({ success: true, emails: data.emails, count: data.emails.length });
  } catch (error) {
    console.error('Error reading emails:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin.html`);
});
