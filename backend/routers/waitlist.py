from fastapi import APIRouter, HTTPException, Request
from typing import List
import logging
from datetime import datetime
import csv
import io
from fastapi.responses import StreamingResponse

from models.waitlist import Waitlist, WaitlistCreate, WaitlistResponse
from services.email_service import EmailService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/waitlist", tags=["waitlist"])

def get_email_service():
    """Get EmailService instance - lazy loading to ensure env vars are loaded"""
    return EmailService()


def get_client_ip(request: Request) -> str:
    """Extract client IP address from request"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@router.post("", response_model=WaitlistResponse, status_code=201)
async def join_waitlist(waitlist_data: WaitlistCreate, request: Request):
    """
    Add email to waitlist and send confirmation emails
    
    - Stores email in MongoDB
    - Sends confirmation to user
    - Sends notification to admin
    """
    db = request.state.db
    
    try:
        # Check if email already exists
        existing = await db.waitlist.find_one({"email": waitlist_data.email})
        if existing:
            logger.info(f"Duplicate waitlist signup attempt: {waitlist_data.email}")
            raise HTTPException(
                status_code=400,
                detail="You're already on the waitlist!"
            )
        
        # Create waitlist entry
        data = waitlist_data.dict()
        data['ip_address'] = get_client_ip(request)
        waitlist_entry = Waitlist(**data)
        
        # Store in database
        await db.waitlist.insert_one(waitlist_entry.dict())
        
        # Send emails (non-blocking - don't fail if email fails)
        try:
            email_service = get_email_service()
            user_email_sent = email_service.send_user_confirmation(waitlist_data.email)
            email_service.send_admin_notification(waitlist_data.email)
            
            # Update email_sent status
            if user_email_sent:
                await db.waitlist.update_one(
                    {"id": waitlist_entry.id},
                    {"$set": {"email_sent": True}}
                )
            
            if not email_service.is_configured():
                logger.warning("EmailJS not configured. Emails not sent.")
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            # Don't fail the request if email fails
        
        logger.info(f"New waitlist signup: {waitlist_data.email}")
        
        return WaitlistResponse(
            success=True,
            message="Successfully joined waitlist!",
            data={
                "id": waitlist_entry.id,
                "email": waitlist_entry.email
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Waitlist signup error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Something went wrong. Please try again."
        )


@router.get("", response_model=WaitlistResponse)
async def get_waitlist(request: Request, skip: int = 0, limit: int = 1000):
    """
    Retrieve all waitlist entries (admin endpoint)
    """
    db = request.state.db
    
    try:
        cursor = db.waitlist.find().skip(skip).limit(limit).sort("timestamp", -1)
        waitlist_entries = await cursor.to_list(length=limit)
        
        # Convert ObjectId to string
        for entry in waitlist_entries:
            if '_id' in entry:
                entry['_id'] = str(entry['_id'])
        
        return WaitlistResponse(
            success=True,
            message="Waitlist retrieved successfully",
            data={
                "count": len(waitlist_entries),
                "entries": waitlist_entries
            }
        )
    except Exception as e:
        logger.error(f"Error retrieving waitlist: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve waitlist"
        )


@router.get("/export")
async def export_waitlist(request: Request):
    """
    Export waitlist to CSV format for Google Sheets import
    """
    db = request.state.db
    
    try:
        cursor = db.waitlist.find().sort("timestamp", -1)
        waitlist_entries = await cursor.to_list(length=10000)
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write headers
        writer.writerow(['Email', 'Source', 'Timestamp', 'Status', 'Email Sent', 'IP Address', 'User Agent'])
        
        # Write data
        for entry in waitlist_entries:
            writer.writerow([
                entry.get('email', ''),
                entry.get('source', ''),
                entry.get('timestamp', ''),
                entry.get('status', ''),
                entry.get('email_sent', False),
                entry.get('ip_address', ''),
                entry.get('user_agent', '')
            ])
        
        # Prepare response
        output.seek(0)
        
        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={
                "Content-Disposition": f"attachment; filename=avexo_waitlist_{datetime.now().strftime('%Y%m%d')}.csv"
            }
        )
        
    except Exception as e:
        logger.error(f"Error exporting waitlist: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to export waitlist"
        )


@router.get("/stats")
async def get_waitlist_stats(request: Request):
    """
    Get waitlist statistics
    """
    db = request.state.db
    
    try:
        total = await db.waitlist.count_documents({})
        pending = await db.waitlist.count_documents({"status": "pending"})
        confirmed = await db.waitlist.count_documents({"status": "confirmed"})
        
        return WaitlistResponse(
            success=True,
            message="Statistics retrieved successfully",
            data={
                "total": total,
                "pending": pending,
                "confirmed": confirmed
            }
        )
    except Exception as e:
        logger.error(f"Error getting stats: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get statistics"
        )
