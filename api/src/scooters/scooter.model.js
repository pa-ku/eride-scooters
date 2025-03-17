import mongoose from 'mongoose'

const scooterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    tag: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      trim: true,
    },
    specs: [
      {
        category: { type: String },
        name: { type: String, required: true },
        info: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.Scooter ||
  mongoose.model('Scooter', scooterSchema)
