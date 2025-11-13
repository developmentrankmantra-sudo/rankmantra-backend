import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  createContact,
  getContacts,
  getContactById,
  deleteContactById,
} from "../controllers/contactController.js";
const router = express.Router();

// Create a new contact
// POST /api/contact
router.post("/contact-create", asyncHandler(createContact));

// Get all contacts
// GET /api/contact
router.get("/contact", asyncHandler(getContacts));

// Get a single contact by ID
// GET /api/contact/:id
router.get("/contact/:id", asyncHandler(getContactById));

// Delete a single contact by ID
// DELETE /api/contact/:id
router.delete("/contact/:id", asyncHandler(deleteContactById));

export default router;
