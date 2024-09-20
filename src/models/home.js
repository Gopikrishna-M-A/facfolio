import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ctaheading: {
    type: String,
    required: true,
    default: "Welcome to My Portfolio" // Default ctaheading value
  },
  ctapara: {
    type: String,
    required: true,
    default: "Explore my work and achievements." // Default ctapara value
  },
  isVisible: {
    type: Boolean,
    default: true,
  }
});

export default mongoose.models.Home || mongoose.model('Home', homeSchema);
