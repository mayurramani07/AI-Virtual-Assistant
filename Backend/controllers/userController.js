const User = require("../models/userModel");
const { uploadOnCloudinary } = require("../config/cloudinary");

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

const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageURL } = req.body;
    let assistantImage = imageURL;

    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file.path);
      assistantImage = cloudinaryResult?.url || imageURL;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        assistantName,
        assistantImage,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating assistant:", error.message);
    return res.status(500).json({ message: "Server error while updating assistant" });
  }
};



module.exports = { getCurrentUser, updateAssistant };
