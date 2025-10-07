import os
import smtplib
import logging
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.sender_email = os.environ.get('SENDER_EMAIL', '')
        self.sender_password = os.environ.get('SENDER_PASSWORD', '')
        self.admin_email = os.environ.get('ADMIN_EMAIL', 'jitheshkhannaofficial@gmail.com')
        
        logger.info(f"SMTP Email Service initialized - Server: {self.smtp_server}, Sender: {self.sender_email}")

    def _send_email(self, to_email: str, subject: str, html_content: str) -> bool:
        """Internal method to send email via SMTP"""
        try:
            # Create message
            message = MIMEMultipart('alternative')
            message['From'] = f"Avexo <{self.sender_email}>"
            message['To'] = to_email
            message['Subject'] = subject
            
            # Add HTML content
            html_part = MIMEText(html_content, 'html')
            message.attach(html_part)
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(message)
            
            logger.info(f"Email sent successfully to: {to_email}")
            return True
                
        except Exception as e:
            logger.error(f"Email sending error to {to_email}: {str(e)}")
            return False

    def send_user_confirmation(self, user_email: str) -> bool:
        """Send confirmation email to user who joined waitlist"""
        if not all([self.sender_email, self.sender_password]):
            logger.warning("SMTP not configured. Skipping user confirmation email.")
            return False

        subject = "Welcome to Avexo Waitlist! 🎉"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #00FFD1, #00b894); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }}
                .header h1 {{ color: white; margin: 0; font-size: 32px; }}
                .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }}
                .button {{ display: inline-block; padding: 12px 30px; background: #00FFD1; color: #000; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }}
                .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to Avexo! ✨</h1>
                </div>
                <div class="content">
                    <h2>Thank you for joining our waitlist!</h2>
                    <p>Hi there! 👋</p>
                    <p>We're thrilled to have you on board. You're now part of an exclusive group that will get early access to <strong>Avexo</strong> - the AI-powered bank statement analyzer that converts statements to Excel in just 90 seconds.</p>
                    
                    <h3>What happens next?</h3>
                    <ul>
                        <li>📧 We'll keep you updated on our launch progress</li>
                        <li>🎁 Early access when we launch</li>
                        <li>💰 Special pricing for waitlist members</li>
                        <li>🚀 Be the first to experience 10x faster bank statement processing</li>
                    </ul>
                    
                    <p>Stay tuned for more updates!</p>
                    
                    <a href="https://avexoai.com" class="button">Visit Our Website</a>
                    
                    <p><strong>Questions?</strong> Just reply to this email - we'd love to hear from you!</p>
                </div>
                <div class="footer">
                    <p>Best regards,<br>The Avexo Team</p>
                    <p>© 2025 Avexo. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return self._send_email(user_email, subject, html_content)

    def send_admin_notification(self, user_email: str) -> bool:
        """Send notification to admin about new waitlist signup"""
        if not all([self.sender_email, self.sender_password]):
            logger.warning("SMTP not configured. Skipping admin notification email.")
            return False

        subject = f"🎉 New Waitlist Signup - Avexo"
        timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; border-radius: 8px; }}
                .header {{ background: #00FFD1; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .header h1 {{ color: #000; margin: 0; }}
                .content {{ background: white; padding: 20px; border-radius: 0 0 8px 8px; }}
                .info-box {{ background: #e8f5e9; padding: 15px; border-left: 4px solid #00FFD1; margin: 15px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 New Waitlist Signup!</h1>
                </div>
                <div class="content">
                    <h2>Great news, Jithesh!</h2>
                    <p>Someone just joined the Avexo waitlist.</p>
                    
                    <div class="info-box">
                        <h3>New Subscriber Details:</h3>
                        <ul>
                            <li><strong>Email:</strong> {user_email}</li>
                            <li><strong>Signed up at:</strong> {timestamp}</li>
                            <li><strong>Source:</strong> Landing Page</li>
                        </ul>
                    </div>
                    
                    <p>Check your MongoDB dashboard to see all waitlist entries, or export them using:</p>
                    <code style="background: #f1f1f1; padding: 10px; display: block; border-radius: 4px;">
                        curl -X GET http://localhost:8001/api/waitlist/export -o waitlist.csv
                    </code>
                    
                    <p style="margin-top: 20px;">Keep building! 🚀</p>
                    <p><strong>The Avexo Team</strong></p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return self._send_email(self.admin_email, subject, html_content)

    def is_configured(self) -> bool:
        """Check if SMTP is properly configured"""
        return all([self.sender_email, self.sender_password])
