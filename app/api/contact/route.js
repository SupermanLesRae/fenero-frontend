import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 🚨 REQUIRED for nodemailer

export async function POST(req) {
  const { name, email, phone, enquiry, message, terms } = await req.json();

  // Basic validation
  if (!name || !email || !phone || !enquiry || !message || !terms) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send email to your receiver
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `New Con Request: ${enquiry}`, // subject includes enquiry type
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Enquiry:</strong> ${enquiry}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Optional: send a confirmation email to user
    await transporter.sendMail({
      from: `"Fenero" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your contact request",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your request regarding "${enquiry}". Our team will get back to you shortly.</p>
        <p>Message:</p>
        <blockquote>${message}</blockquote>
        <p>Best regards,<br/>Your Company</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
