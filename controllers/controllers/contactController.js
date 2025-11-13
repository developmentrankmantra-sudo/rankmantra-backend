import Contact from "../models/Contact.js";
import { sendContactEmail } from "../utils/sendEmail.js";

// @desc    Create a new contact
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  const { name, email, phoneNumber, websiteUrl, message } = req.body;

  // Validate required fields
  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ error: "Name, email, phoneNumber, and message are required" });
  }

  const contact = await Contact.create({
    name,
    email,
    phoneNumber,
    websiteUrl: websiteUrl || "", // optional
    message,
  });
 
   if(contact) {
    await sendContactEmail(req.body)
   }

  res.status(201).json({ message: "Contact created successfully", contact });
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Public
export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(contacts);
};

// @desc    Get a single contact by ID
// @route   GET /api/contact/:id
// @access  Public
export const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }
  res.status(200).json(contact);
};

// @desc    Delete a single contact by ID
// @route   DELETE /api/contact/:id
// @access  Public
export const deleteContactById = async (req, res) => {
  const contact =  await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }
  res.status(200).json({ message: "Contact deleted successfully" });
};
