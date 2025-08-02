import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = "user";
    console.log("Registering user:", name, email, password);

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration failed:", error);

    res.status(500).json({
      success: false,
      message: "Server error while registering",
      error: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Logging in user:", email, password);
    

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Set cookies
    res.cookie("userId", user._id.toString(), {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie("userRole", user.role, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("userId", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.clearCookie("userRole", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Auth check route
export const isAuthenticated = async (req, res) => {
  try {
    const { userId } = req.cookies;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Auth check failed:", error);
    res.status(500).json({
      success: false,
      message: "Auth check failed",
      error: error.message,
    });
  }
};
