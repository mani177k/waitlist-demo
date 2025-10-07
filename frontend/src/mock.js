// Mock data for Avexo waitlist landing page

export const problems = [
  {
    title: "Hours of Manual Entry",
    description: "Typing transactions from PDF statements takes 2-4 hours per statement. Multiply that by dozens of clients.",
    stat: "20+ hours wasted monthly"
  },
  {
    title: "Costly Errors",
    description: "Manual data entry leads to 30% error rate. Wrong numbers = wrong tax filings = penalties.",
    stat: "₹50K+ in avoidable penalties"
  },
  {
    title: "Can't Scale",
    description: "Taking on more clients means hiring more staff. Time-consuming training and high costs.",
    stat: "Growth limited to 20%"
  }
];

export const features = [
  {
    title: "10x Faster",
    description: "90 seconds vs 4 hours"
  },
  {
    title: "95% Accurate",
    description: "AI-powered extraction"
  },
  {
    title: "Bank-Grade Security",
    description: "Your data is encrypted"
  },
  {
    title: "Save ₹50K+",
    description: "Monthly cost savings"
  }
];

export const steps = [
  {
    title: "Upload Statement",
    description: "Drag and drop your bank statement PDF. Supports all major Indian banks. Even password-protected files work.",
    time: "5 seconds"
  },
  {
    title: "AI Extracts Data",
    description: "Our AI reads the PDF, identifies transactions, amounts, dates, and categorizes everything automatically.",
    time: "60 seconds"
  },
  {
    title: "Review & Edit",
    description: "Quickly review extracted data. Make corrections if needed with inline editing. 95%+ accuracy out of the box.",
    time: "15 seconds"
  },
  {
    title: "Download & Use",
    description: "Export to Excel, Tally XML, or PDF report. Ready to import into your accounting software instantly.",
    time: "10 seconds"
  }
];

export const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Chartered Accountant",
    company: "RK Associates",
    quote: "This tool is a game-changer. What used to take me 4 hours now takes less than 2 minutes. I can finally focus on advisory work."
  },
  {
    name: "Priya Sharma",
    role: "CA & Tax Consultant",
    company: "Sharma & Co.",
    quote: "The accuracy is incredible. I was skeptical at first, but it handles even complex statements flawlessly. Worth every rupee."
  },
  {
    name: "Amit Patel",
    role: "SME Owner",
    company: "Patel Textiles",
    quote: "As a business owner, I need quick insights. This tool gives me clean Excel data instantly. No more waiting for my accountant."
  }
];

export const stats = [
  { value: "500+", label: "CAs Registered" },
  { value: "10,000+", label: "Statements Processed" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "90 sec", label: "Average Time" }
];

// Mock function for waitlist submission
export const mockWaitlistSubmit = async (email) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate success (90% success rate)
  if (Math.random() > 0.1) {
    console.log('Mock: Email added to waitlist:', email);
    return { success: true, message: 'Successfully joined waitlist!' };
  } else {
    throw new Error('Something went wrong. Please try again.');
  }
};
