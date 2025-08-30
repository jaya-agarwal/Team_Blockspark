import { z } from 'zod'

export const reportSchema = z.object({
  title: z.string().trim().min(4, "Title must be at least 4 characters").max(120, "Title too long"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(2000, "Description too long"),
  imageUrl: z.string()
    .url("Must be a valid URL")
    .startsWith('https://', "Must use HTTPS")
    .optional()
    .or(z.literal('')),
  location: z.object({
    lat: z.number().min(-90, "Invalid latitude").max(90, "Invalid latitude"),
    lng: z.number().min(-180, "Invalid longitude").max(180, "Invalid longitude"),
  }),
})

export type ReportInputSafe = z.infer<typeof reportSchema>