const express = require("express");
const mongoose = require("mongoose");
const Resume = require("../models/Resume");

const router = express.Router();

// Save a new Resume
router.post("/save", async (req, res) => {
  try {
    console.log("Received Resume Data for Save:", req.body);

    const {
      userId,
      personalDetails,
      education,
      experience,
      skills,
      projects,
      certifications,
      activitiesAwards,
      selectedTemplate,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const newResume = await Resume.create({
      userId: new mongoose.Types.ObjectId(userId),
      personalDetails,
      education,
      experience,
      skills,
      projects,
      certifications,
      activitiesAwards,
      selectedTemplate,
    });

    return res.status(200).json({
      message: "Resume saved successfully",
      resume: newResume,
    });
  } catch (err) {
    console.error("Error saving resume:", err);
    return res.status(500).json({
      message: "Failed to save resume",
      error: err.message,
    });
  }
});

// Update an existing resume
router.put("/update/:resumeId", async (req, res) => {
  try {
    const { resumeId } = req.params;
    console.log("Update Request for Resume ID:", resumeId);
    console.log("Data:", req.body);

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({ message: "Invalid resumeId format" });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      {
        ...req.body, // safely includes all updated fields
      },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (err) {
    console.error("Error updating resume:", err);
    return res.status(500).json({
      message: "Failed to update resume",
      error: err.message,
    });
  }
});

// Fetch all resumes for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const resumes = await Resume.find({ userId: new mongoose.Types.ObjectId(userId) });

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({ message: "No resumes found for this user" });
    }

    return res.status(200).json(resumes);
  } catch (err) {
    console.error("Error fetching resumes:", err);
    return res.status(500).json({
      message: "Failed to fetch resumes",
      error: err.message,
    });
  }
});
// In routes/resume.js
router.delete("/delete/:resumeId", async (req, res) => {
  try {
    const { resumeId } = req.params;
    await Resume.findByIdAndDelete(resumeId);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete resume", error: err.message });
  }
});


module.exports = router;
