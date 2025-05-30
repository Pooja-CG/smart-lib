const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/smartlib")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Middleware to Verify JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "mySuperSecretKey123");
    req.user = decoded; // Attach the decoded token (contains user ID) to the request
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

// Root Route (for testing)
app.get("/", (req, res) => {
  res.send("SmartLib Backend API is running. Use /api/register to register a user.");
});

// Register Route (unchanged)
app.post("/api/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    console.log("Received registration data:", { fullName, email, password: "[hidden]" });

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters with letters and numbers",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("User saved successfully:", email);

    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err.message, err.stack);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});

// Login Route (unchanged)
app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    console.log("Login attempt:", { identifier, password: "[hidden]" });

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: identifier });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "mySuperSecretKey123", { expiresIn: "1h" });
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err.message, err.stack);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});

// New Route to Fetch Logged-In User Details
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password for security
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        userId: user._id, // Use MongoDB _id as userId
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error fetching user details:", err.message, err.stack);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));