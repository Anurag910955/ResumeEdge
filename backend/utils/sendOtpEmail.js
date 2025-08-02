import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: `"ResumeEdge" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for ResumeEdge Registration",
    html: `
      <div style="font-family: sans-serif; padding: 10px;">
        <h2>OTP Verification</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
