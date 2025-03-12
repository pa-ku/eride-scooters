import z from 'zod'

export const registerSchema = z.object({
  name: z.string({ required_error: 'El nombre es requerido' }),
  lastname: z.string({ required_error: 'El apellido es requerido' }),
  email: z
    .string({ required_error: 'El email es requerido' })
    .email('Por favor, ingresa un email válido'),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  role: z.enum(['user', 'admin']).default('user'),
  favorites: z.array(z.string()).default([]),
  shippingInformation: z
    .object({
      cp: z.number({
        invalid_type_error: 'El código postal debe ser un número',
      }),
      street: z
        .string()
        .max(30, { message: 'La calle no puede exceder los 30 caracteres' }),
      streetNumber: z.number(),
      province: z.string(),
      city: z.string(),
      extraDetails: z.string().max(100, {
        message: 'Los detalles extra no pueden exceder los 100 caracteres',
      }),
    })
    .optional(), // El objeto puede ser opcional
})

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'El email es requerido' })
    .email('Por favor, ingresa un email válido'),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
})
