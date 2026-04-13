import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: "Vidayanta <noreplyvidayanta@gmail.com>",
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", to);
  } catch (err) {
    console.log("❌ Email error:", err.message);
  }
};