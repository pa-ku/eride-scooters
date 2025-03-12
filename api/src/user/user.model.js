import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      maxlength: [22, 'El nombre no puede exceder los 22 caracteres'],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      maxlength: [22, 'El nombre no puede exceder los 22 caracteres'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      match: [/^\S+@\S+\.\S+$/, 'Por favor, ingresa un email válido'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: 6,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    favorites: {
      type: [String],
      default: [],
    },
    shipping: {
      cp: {
        type: Number,
        default: null,
      },
      street: {
        type: String,
        maxlength: [50, 'La calle no puede exceder los 50 caracteres'],
        default: '',
      },
      streetNumber: {
        type: String,
        default: '',
      },
      province: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        default: '',
      },
      extraDetails: {
        type: String,
        maxlength: [
          100,
          'Los detalles extra no pueden exceder los 100 caracteres',
        ],
        default: '',
      },
    },
  },
  { timestamps: true }
)

export default mongoose.models.Users || mongoose.model('Users', userSchema)
