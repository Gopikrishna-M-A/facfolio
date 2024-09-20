import mongoose from 'mongoose';
import slugify from 'slugify';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  customImageUrl: String,
  emailVerified: Date,
  phone: String,
  slug: {
    type: String,
    unique: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  }
});

UserSchema.pre('save', async function(next) {
  console.log('Pre-save middleware triggered');
  if (!this.slug) {
    console.log('Generating slug for:', this.name);
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    while (await mongoose.models.User.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
    console.log('Generated slug:', this.slug);
  }
  next();
});



UserSchema.post("save", async function (doc, next) {
  try {
    const existingHome = await Home.findOne({ user: doc._id });
    
    if (!existingHome) {
      await Home.create({ user: doc._id });
    }

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.post("save", async function (doc, next) {
  try {
    const existingAbout = await About.findOne({ user: doc._id });

    if (!existingAbout) {
      await About.create({ user: doc._id });
    }

    next();
  } catch (error) {
    next(error);
  }
});



export default mongoose.models.User || mongoose.model('User', UserSchema);