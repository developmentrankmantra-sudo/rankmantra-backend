// middleware/courses/upload.js
import multer from "multer";
import cloudinary from "../../utils/cloudinary.js"; // adjust path as needed

// Multer memory storage for buffering files before upload
const storage = multer.memoryStorage();

// Multer upload instance with file filtering for thumbnail & curriculum
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      // Accept only jpg/png/webp for thumbnail
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/webp"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Thumbnail must be an image (jpeg/png/webp)"));
      }
    } else if (file.fieldname === "curriculum") {
      // Accept only PDF for curriculum
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Curriculum must be a PDF"));
      }
    } else {
      // Reject any other fields/files
      cb(new Error("Unsupported file field"));
    }
  },
});

// Cloudinary upload function that uploads buffer to specified folder & resource type
export const uploadToCloudinary = (buffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,          // ex: "courses/thumbnails" or "courses/curriculum"
        resource_type: resourceType, // "image" or "raw"
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

export default upload;
