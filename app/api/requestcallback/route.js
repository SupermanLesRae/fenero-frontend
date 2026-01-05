import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 🚨 REQUIRED for nodemailer

export async function POST(req) {
  const { name, surname, email, telephone } = await req.json();

  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);

  console.log(name, surname, email, telephone);

  // Basic validation
  if (!name || !surname || !email) {
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
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: "Request for a Callback",
      html: `
        <h3>Request for a Callback: </h3>
        <p><strong>Name:</strong> ${name} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telephone:</strong> ${telephone || "N/A"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
