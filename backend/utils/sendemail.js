export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    console.log("📧 RESEND RESPONSE:", response);

  } catch (err) {
    console.log("❌ FULL Email error:", err);
  }
};