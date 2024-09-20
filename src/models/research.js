import mongoose from 'mongoose';

const researchSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    para: String,
    point1: String,
    point2: String,
    point3: String,
    isVisible: {
      type: Boolean,
      default: true,
    }
  });


export default mongoose.models.Research || mongoose.model('Research', researchSchema);