const User = require("../models/userModel");
const { uploadOnCloudinary } = require("../config/cloudinary");
const geminiResponse = require('../gemini.js');
const moment = require("moment");

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


const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    user.history.push(command)
    user.save()
    const userName = user.name;
    const assistantName = user.assistantName;

    const result = await geminiResponse(command, assistantName, userName);

    if (!result || typeof result !== 'object' || !result.type) {
      return res.status(400).json({ response: "Sorry, I didn't understand" });
    }

    const { type, userInput, response } = result;

    switch (type) {
      case "get-date":
        return res.json({
          type,
          userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get-time":
        return res.json({
          type,
          userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });
      case "get-day":
        return res.json({
          type,
          userInput,
          response: `Current day is ${moment().format("dddd")}`,
        });
      case "get-month":
        return res.json({
          type,
          userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });
      case "google-search":
      case "youtube-search":
      case "youtube-play":
      case "general":
      case "calculator-open":
      case "instagram-open":
      case "facebook-open":
      case "weather-show":
        return res.json({ type, userInput, response });

      default:
        return res.status(400).json({
          response: "I didn't understand that command.",
        });
    }
  } catch (error) {
    console.error("Error in askToAssistant:", error.message);
    return res.status(500).json({ message: "Server error while processing command" });
  }
};


module.exports = { askToAssistant, getCurrentUser, updateAssistant };
