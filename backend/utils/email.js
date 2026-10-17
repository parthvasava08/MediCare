import nodemailer from "nodemailer";

let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendEmail({ to, subject, text, html }) {
  if (!transporter) {
    console.warn(
      `[email] SMTP not configured — logging instead of sending.\n  To: ${to}\n  Subject: ${subject}\n  Body: ${text}`,
    );
    return { sent: false, loggedOnly: true };
  }
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    });
    return { sent: true };
  } catch (err) {
    console.error("Failed to send email:", err.message);
    return { sent: false, error: err.message };
  }
}
