import { NextResponse } from "next/server";
import { Resend } from "resend";

// ✅ Edge-safe (default on Amplify)

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, /* surname, email, */ telephone } = await req.json();

    // Basic validation
    if (!name || !telephone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>", // replace after domain verification
      to: ["superman.lesrae111@gmail.com"], // 👈 CONTACT_RECEIVER
      replyTo: "superman.lesrae111@gmail.com",
      subject: "Request for a Callback",
      html: `
        <h3>Request for a Callback</h3>
        <p><strong>Name:</strong> ${name}</p>        
        <p><strong>Telephone:</strong> ${telephone || "N/A"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RESEND ERROR:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
