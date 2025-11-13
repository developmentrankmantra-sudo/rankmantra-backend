import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Send Contact Form Email
export const sendContactEmail = async (formData) => {
  const { name, email, phoneNumber, websiteUrl, message } = formData;

  try {
    await resend.emails.send({
      from: "RankMantra Academy <onboarding@resend.dev>", // or use your verified domain later
      to: "rohitrankmantra12@gmail.com",
      subject: `New Contact Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Website:</strong> ${websiteUrl || "N/A"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    console.log("✅ Contact email sent successfully!");
  } catch (error) {
    console.error("❌ Failed to send contact email:", error);
  }
};

// ✅ Send Booking Form Email
export const sendBookingEmail = async (formData) => {
  const { fullName, phoneNumber, selectedCourse } = formData;

  try {
    await resend.emails.send({
      from: "RankMantra Academy <onboarding@resend.dev>",
      to: "rohitrankmantra12@gmail.com",
      subject: `New Booking from ${fullName}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Selected Course:</strong> ${selectedCourse}</p>
      `,
    });
    console.log("✅ Booking email sent successfully!");
  } catch (error) {
    console.error("❌ Failed to send booking email:", error);
  }
};
