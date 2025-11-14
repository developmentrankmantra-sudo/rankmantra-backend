import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./libs/db.js";
import testRoutes from "./routes/testRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js";

const app = express();
const port = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://rankmantraacademy.vercel.app",
  "https://admin.yourapp.com",
  "https://yourapp.com",
  
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS Error: ${origin} is not allowed`));
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api", testRoutes);
app.use("/api", contactRoutes);
app.use("/api",bookingRoutes);
app.use("/api",coursesRoutes);

// Health check route
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.get("/", (req, res) => res.send("Hello User !"))

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
