import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "Vidayanta <support@nsjbgroups.com>",
      to,
      subject,
      html,
    });

    console.log("📧 RESEND RESPONSE:", response);

  } catch (err) {
    console.log("❌ FULL Email error:", err);
  }
};