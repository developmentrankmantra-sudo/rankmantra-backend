import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ Send Contact Form Email
export const sendContactEmail = async (formData) => {
  const { name, email, phoneNumber, websiteUrl, message } = formData;

  const mailOptions = {
    from: `"RankMantra Academy" <${process.env.SMTP_USER}>`,
    to: "rohitrankmantra12@gmail.com", // fixed recipient
    subject: `New Contact Inquiry from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Website:</strong> ${websiteUrl || "N/A"}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// ✅ Send Booking Form Email
export const sendBookingEmail = async (formData) => {
  const { fullName, phoneNumber, selectedCourse } = formData;

  const mailOptions = {
    from: `"RankMantra Academy" <${process.env.SMTP_USER}>`,
    to: "rohitrankmantra12@gmail.com", // same recipient
    subject: `New Booking from ${fullName}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Selected Course:</strong> ${selectedCourse}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
