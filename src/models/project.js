import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: {
    type: String,
    required: true,
  },
  description: String,
  link: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  fundingSources: {
    type: [String],
    default: [],
  },
  fundingAmount: Number,
  collaborators: {
    type: [String],
    default: [],
  },
  publications: {
    type: [
      {
        title: String,
        authors: [String],
        conference: String,
        year: Number,
      },
    ],
    default: [],
  },
  isVisible: {
    type: Boolean,
    default: true,
  }
});


export default mongoose.models.Project || mongoose.model('Project', projectSchema);