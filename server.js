const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
console.log("MongoDB URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('Connection error:', err));



const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Event Schema
const eventSchema = new mongoose.Schema({
  date: String,
  day: String,
  stripbg: String,
  eventHeading: String,
  evetDetail: String,
  from: String,
  to: String,
  mode: String,
});

const Event = mongoose.model("Event", eventSchema);

// API Routes
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from MongoDB
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
