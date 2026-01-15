import { NextResponse } from "next/server";
import { Resend } from "resend";

// ✅ Required for Amplify hosting

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, enquiry, message, terms } = await req.json();

    // Basic validation
    if (!name || !email || !phone || !enquiry || !message || !terms) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ===========================
       1️⃣ Email to site owner
    ============================ */

    await resend.emails.send({
      from: "Fenero <onboarding@resend.dev>",
      to: ["superman.lesrae111@gmail.com"], // 👈 CONTACT_RECEIVER
      replyTo: email,
      subject: `New Contact Request: ${enquiry}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Enquiry:</strong> ${enquiry}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `,
    });

    /* ===========================
       2️⃣ Confirmation email to user
    ============================ */

    await resend.emails.send({
      from: "Fenero <onboarding@resend.dev>",
      to: [email],
      subject: "We received your contact request",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your enquiry regarding <strong>${enquiry}</strong>.</p>
        <p>Our team will get back to you shortly.</p>

        <p><strong>Your message:</strong></p>
        <blockquote>${message}</blockquote>

        <p>Kind regards,<br/>Fenero</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RESEND ERROR:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
