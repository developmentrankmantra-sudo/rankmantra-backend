import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
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
    to: "info@rankmantraacademy.com", 
    subject: `New Contact Inquiry from ${name}`,
html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f8f8;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; border: 1px solid #eee;">
      
      <h2 style="color: #333; border-bottom: 2px solid #4A90E2; padding-bottom: 6px;">
        New Contact Form Submission
      </h2>

      <table style="width: 100%; margin-top: 15px; font-size: 15px;">
        <tr>
          <td style="font-weight: bold; padding: 6px 0;">Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 6px 0;">Email:</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 6px 0;">Phone:</td>
          <td>${phoneNumber}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 6px 0;">Website:</td>
          <td>${websiteUrl || "N/A"}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 6px 0; vertical-align: top;">Message:</td>
          <td>${message}</td>
        </tr>
      </table>

      <div style="margin-top: 25px; font-size: 13px; color: #888;">
        <p>This email was automatically generated from the RankMantra Academy website.</p>
      </div>
    </div>
  </div>
`

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
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f8f8;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; border: 1px solid #eee;">
      
      <h2 style="color: #333; border-bottom: 2px solid #4A90E2; padding-bottom: 6px;">
        New Booking Request
      </h2>

      <table style="width: 100%; margin-top: 15px; font-size: 15px;">
        <tr>
          <td style="font-weight: bold; padding: 6px 0;">Full Name:</td>
          <td>${fullName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 6px 0;">Phone Number:</td>
          <td>${phoneNumber}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 6px 0;">Selected Course:</td>
          <td>${selectedCourse}</td>
        </tr>
      </table>

      <div style="margin-top: 25px; font-size: 13px; color: #888;">
        <p>This email was automatically generated from the RankMantra Academy website.</p>
      </div>

    </div>
  </div>
`

  };

  await transporter.sendMail(mailOptions);
};