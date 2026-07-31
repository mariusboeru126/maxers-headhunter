export async function sendVerificationEmail({ email, fullName, verificationUrl }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Email delivery is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Verify your Maxers Head Hunter email",
      html: `<p>Hi ${fullName},</p><p>Verify your email address to activate your Maxers Head Hunter account.</p><p><a href="${verificationUrl}">Verify email address</a></p><p>This link expires in 24 hours.</p>`,
    }),
  });

  if (!response.ok) {
    throw new Error("Email delivery failed.");
  }
}
