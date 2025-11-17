import { uploadToCloudinary } from "../middleware/courses/upload.js";
import Course from "../models/Course.js";
import cloudinary from "../utils/cloudinary.js";

// DELETE FROM CLOUDINARY HELPER
const deleteFromCloudinary = async (url) => {
  if (!url) return;
  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1].split(".")[0];
    const folder = parts[parts.length - 2];
    const public_id = `courses/${folder}/${fileName}`;

    await cloudinary.uploader.destroy(public_id, { resource_type: "auto" });
  } catch (err) {
    console.log("Cloudinary delete error:", err.message);
  }
};

// CREATE
export const createCourse = async (req, res) => {
  const { title, description, price, duration } = req.body;

  const thumbnailFile = req.files?.thumbnail?.[0];
  const curriculumFile = req.files?.curriculum?.[0];

  if (!title || !description || !price || !duration)
    return res.status(400).json({ message: "All fields are required" });

  if (!thumbnailFile )
    return res.status(400).json({ message: "Thumbnail required" });

  const thumbnailUpload = await uploadToCloudinary(
    thumbnailFile.buffer,
    "courses/thumbnails",
    "image"
  );

  const curriculumUpload = await uploadToCloudinary(
    curriculumFile.buffer,
    "courses/curriculum",
    "raw"
  );

  const course = await Course.create({
    title,
    description,
    price,
    duration,
    thumbnail: thumbnailUpload.secure_url,
    curriculum: curriculumUpload.secure_url,
  });

  res.status(201).json({ success: true, course });
};

// GET ALL
export const getCourses = async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json({ success: true, courses });
};

// GET BY SLUG
export const getCourseBySlug = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });

  if (!course)
    return res.status(404).json({ message: "Course not found" });

  res.json({ success: true, course });
};

// UPDATE
export const updateCourseById = async (req, res) => {
  const { title, description, price, duration } = req.body;

  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  // Update text fields
  if (title) course.title = title;
  if (description) course.description = description;
  if (price) course.price = price;
  if (duration) course.duration = duration;

  // Replace thumbnail
  if (req.files?.thumbnail?.[0]) {
    await deleteFromCloudinary(course.thumbnail);
    const uploadRes = await uploadToCloudinary(
      req.files.thumbnail[0].buffer,
      "courses/thumbnails",
      "image"
    );
    course.thumbnail = uploadRes.secure_url;
  }

  // Replace curriculum PDF
  if (req.files?.curriculum?.[0]) {
    await deleteFromCloudinary(course.curriculum);
    const uploadRes = await uploadToCloudinary(
      req.files.curriculum[0].buffer,
      "courses/curriculum",
      "raw"
    );
    course.curriculum = uploadRes.secure_url;
  }

  await course.save();
  res.json({ success: true, course });
};

// DELETE
export const deleteCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course)
    return res.status(404).json({ message: "Course not found" });

  await deleteFromCloudinary(course.thumbnail);
  await deleteFromCloudinary(course.curriculum);

  await Course.deleteOne({ _id: course._id });

  res.json({ success: true, message: "Course deleted" });
};
