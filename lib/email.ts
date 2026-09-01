import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRegistrationEmail(
  to: string,
  name: string,
  eventTitle: string,
  regId: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set - email not sent');
    return;
  }

  await resend.emails.send({
    from: 'Symposium 2026 <noreply@yourdomain.com>',
    to,
    subject: `Registration Confirmed: ${eventTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4f46e5;">Hello ${name},</h2>
        <p>Your registration for <strong>${eventTitle}</strong> has been confirmed!</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Registration ID</p>
          <p style="margin: 8px 0; font-size: 24px; font-weight: bold; color: #111827; font-family: monospace;">${regId}</p>
        </div>
        <p>Please save this ID. You'll need it for entry.</p>
        <p style="color: #6b7280; font-size: 12px;">Symposium 2026 Team</p>
      </div>
    `,
  });
}
