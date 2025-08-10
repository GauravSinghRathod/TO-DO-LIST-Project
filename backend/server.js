//  Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Use .env variables
//add your port..


app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB Connected");
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});

//  Routes
app.use("/api/tasks", taskRoutes);

//  Start server
app.listen(PORT, () => {
  console.log('🚀 Server running ://localhost:${PORT}');
});
