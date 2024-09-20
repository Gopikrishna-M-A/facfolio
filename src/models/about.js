import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userTag: {
    type: String,
    required: true,
    default: "webdeveloper123", // Default user tag
  },
  quote: {
    type: String,
    default: "Passionate about crafting clean and efficient code.",
  },
  linkedinurl: {
    type: String,
    default: "https://www.linkedin.com/in/",
  },
  twitterurl: {
    type: String,
    default: "https://twitter.com/",
  },
  githuburl: {
    type: String,
    default: "https://github.com/",
  },
  interest: {
    type: [String],
    default: ["Web Development", "Machine Learning"],
  },
  responsibilities: {
    type: [String],
    default: ["Front-end Development", "Code Review"],
  },
  education: {
    type: [
      {
        degree: { type: String },
        school: { type: String },
        year: { type: Number },
      },
    ],
    default: [
      {
        degree: "Master of Science",
        school: "Tech University",
        year: 2022,
      },
      {
        degree: "Bachelor of Arts",
        school: "Arts College",
        year: 2018,
      },
    ],
  },
  expertise: {
    type: [String],
    default: ["React", "Node.js", "Python"],
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});


export default mongoose.models.About || mongoose.model('About', aboutSchema);