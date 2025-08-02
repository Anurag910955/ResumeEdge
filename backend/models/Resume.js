const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      github: { type: String },
    },
    education: [
      {
        university: String,
        degree: String,
        cgpa: String,
        duration: String,
        courses: String,
      },
    ],
    skills: {
      software: String,
      programming: String,
    },
    projects: [
      {
        title: String,
        date: String,
        description: String,
      },
    ],
    experience: [
      {
        role: String,
        company: String,
        duration: String,
        responsibilities: String,
      },
    ],
    certifications: [
      {
        name: String,
      },
    ],
    activitiesAwards: [
      {
        description: String,
      },
    ],
    selectedTemplate: {
      type: String,
      default: "template1",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Resume", resumeSchema);
