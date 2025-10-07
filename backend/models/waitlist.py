from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid


class WaitlistBase(BaseModel):
    email: EmailStr
    source: str = "landing_page"
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None


class WaitlistCreate(WaitlistBase):
    pass


class Waitlist(WaitlistBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    email_sent: bool = False
    status: str = "pending"  # pending, confirmed, unsubscribed

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "email": "user@example.com",
                "source": "landing_page",
                "user_agent": "Mozilla/5.0...",
                "ip_address": "192.168.1.1",
                "timestamp": "2025-01-06T12:00:00Z",
                "email_sent": True,
                "status": "pending"
            }
        }


class WaitlistResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
