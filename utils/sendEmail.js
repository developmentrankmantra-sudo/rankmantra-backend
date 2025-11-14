import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Send Contact Email
export const sendContactEmail = async (formData) => {
  const { name, email, phoneNumber, websiteUrl, message } = formData;

  await resend.emails.send({
    from: "RankMantra Academy <noreply@rankmantra.in>",
    to: "rohitrankmantra12@gmail.com",
    subject: `New Contact Inquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f8f8;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; border: 1px solid #eee;">
          <h2 style="color: #333; border-bottom: 2px solid #4A90E2; padding-bottom: 6px;">New Contact Form Submission</h2>
          <table style="width:100%; margin-top:15px; font-size:15px;">
            <tr><td><b>Name:</b></td><td>${name}</td></tr>
            <tr><td><b>Email:</b></td><td>${email}</td></tr>
            <tr><td><b>Phone:</b></td><td>${phoneNumber}</td></tr>
            <tr><td><b>Website:</b></td><td>${websiteUrl || "N/A"}</td></tr>
            <tr><td style="vertical-align:top;"><b>Message:</b></td><td>${message}</td></tr>
          </table>
        </div>
      </div>
    `,
  });
};

// Send Booking Email
export const sendBookingEmail = async (formData) => {
  const { fullName, phoneNumber, selectedCourse } = formData;

  await resend.emails.send({
    from: "RankMantra Academy <noreply@rankmantra.in>",
    to: "rohitrankmantra12@gmail.com",
    subject: `New Booking from ${fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f8f8;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 25px; border: 1px solid #eee;">
          <h2 style="color:#333;">New Booking Request</h2>
          <table style="width:100%; margin-top:15px; font-size:15px;">
            <tr><td><b>Full Name:</b></td><td>${fullName}</td></tr>
            <tr><td><b>Phone Number:</b></td><td>${phoneNumber}</td></tr>
            <tr><td><b>Selected Course:</b></td><td>${selectedCourse}</td></tr>
          </table>
        </div>
      </div>
    `,
  });
};
