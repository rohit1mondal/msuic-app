import userModel from "../models/userModel.js";

// check if user is authenticated
export const isLoggedIn = async (req, res, next) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  try {
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // safe to attach to request
    // console.log("Authenticated User:", req.user?.email, "Role:", req.user?.role);

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Auth check failed",
      error: err.message,
    });
  }
};


// check if user is an admin
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "User not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access only" });
  }

  next();
};

