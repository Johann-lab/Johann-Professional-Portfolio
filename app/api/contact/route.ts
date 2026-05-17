import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 1;
const RATE_LIMIT_WINDOW = 60000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, message } = body;

    const clientIp = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     "unknown";
    
    const now = Date.now();
    const clientData = rateLimitMap.get(clientIp);

    if (clientData) {
      if (now - clientData.timestamp < RATE_LIMIT_WINDOW) {
        if (clientData.count >= RATE_LIMIT) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        clientData.count++;
      } else {
        rateLimitMap.set(clientIp, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(clientIp, { count: 1, timestamp: now });
    }

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("Email not configured. Contact form submission:", { email, message });
      return NextResponse.json(
        { success: true, message: "Message received (email not configured)" },
        { status: 200 }
      );
    }

    await sendContactEmail(email, message);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}