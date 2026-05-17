import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendContactEmail(email: string, message: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact from ${email}`,
    text: `
From: ${email}

Message:
${message}
    `.trim(),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `.trim(),
  };

  return transporter.sendMail(mailOptions);
}