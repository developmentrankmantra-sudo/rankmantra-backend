import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    curriculum: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Create slug automatically (NO slugify)
courseSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();

  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces/special chars with -
    .replace(/^-+|-+$/g, "");    // Trim - from start/end

  next();
});

export default mongoose.model("Course", courseSchema);
