import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
const adminEmail = process.env.ADMIN_EMAIL;

function buildApplicantHtml(data: {
  name: string;
  position: string;
  experience: string;
  education: string;
}) {
  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
      <h1 style="color: #6366f1;">Application Received — Mentora</h1>
      <p>Hi ${data.name},</p>
      <p>Thank you for applying for the <strong>${data.position}</strong> position at Mentora.</p>
      <p>We have received your application and our team will review it shortly. We'll get back to you within 3-5 business days.</p>
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0; color: #666; font-size: 14px;"><strong>Position Applied:</strong> ${data.position}</p>
        <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;"><strong>Experience:</strong> ${data.experience} years</p>
        <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;"><strong>Qualification:</strong> ${data.education}</p>
      </div>
      <p>If you have any questions, feel free to reach out to us at contact@mentoraonline.guru</p>
      <p>— Team Mentora</p>
    </div>
  `;
}

function buildAdminHtml(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  resume: string;
  coverLetter: string;
}) {
  return `
    <div style="font-family: sans-serif; max-width: 560px;">
      <h2 style="color: #6366f1;">New Job Application</h2>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Position:</strong> ${data.position}</li>
        <li><strong>Experience:</strong> ${data.experience} years</li>
        <li><strong>Education:</strong> ${data.education}</li>
        <li><strong>Resume:</strong> <a href="${data.resume}" style="color: #6366f1;">View Resume</a></li>
      </ul>
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0 0 8px 0;"><strong>Cover Letter:</strong></p>
        <p style="margin: 0; color: #666;">${data.coverLetter}</p>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      position: formData.get("position") as string,
      experience: formData.get("experience") as string,
      education: formData.get("education") as string,
      resume: formData.get("resume") as string,
      coverLetter: formData.get("coverLetter") as string,
    };

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.position) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepend +91 to phone if not already present
    const fullPhone = data.phone.startsWith("+") ? data.phone : `+91${data.phone}`;

    if (!resend) {
      console.log("[Mentora] RESEND_API_KEY not set — skipping career emails");
      return NextResponse.json(
        { success: true, message: "Application received (emails disabled)" },
        { status: 200 }
      );
    }

    const results = [];

    // Send confirmation email to applicant
    try {
      const applicantResult = await resend.emails.send({
        from: `Mentora <${fromEmail}>`,
        to: data.email,
        subject: `Application Received — ${data.position} | Mentora`,
        html: buildApplicantHtml({
          name: data.name,
          position: data.position,
          experience: data.experience,
          education: data.education,
        }),
      });
      console.log("[Mentora] Applicant email sent successfully to:", data.email);
      results.push(applicantResult);
    } catch (err) {
      console.error("[Mentora] Applicant email failed:", err);
    }

    // Send notification email to admin
    if (adminEmail) {
      try {
        const adminResult = await resend.emails.send({
          from: `Mentora <${fromEmail}>`,
          to: adminEmail,
          subject: `[New Application] ${data.name} — ${data.position}`,
          html: buildAdminHtml({
            ...data,
            phone: fullPhone,
          }),
        });
        console.log("[Mentora] Admin email sent successfully");
        results.push(adminResult);
      } catch (err) {
        console.error("[Mentora] Admin email failed:", err);
      }
    }

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Mentora] Career application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
