const User = require("../models/userModel");

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    return res.status(500).json({ message: "Server error while fetching user" });
  }
};

module.exports = { getCurrentUser };
