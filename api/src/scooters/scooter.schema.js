import z from 'zod'

export const scooterSchema = z.object({
  title: z.string({ required_error: 'El nombre es requerido' }),
  description: z.string().optional(),
  filter: z.string().optional(),
  price: z.number({ required_error: 'El precio es requerido' }),
  images: z.array(z.string(), {
    required_error: 'Debes ingresar al menos una imagen',
  }),
  coverImage: z.string(),
  brand: z.string({ required_error: 'Debes ingresar la marca' }),
  specs: z
    .array(
      z
        .object({
          category: z.string().optional(),
          name: z.string().optional(),
          info: z.string().optional(),
        })
        .optional()
    )
    .optional(),
})

// Schema para PATCH
export const scooterPatchSchema = scooterSchema.partial()
