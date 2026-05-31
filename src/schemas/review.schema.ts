import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .string()
    .min(1, { message: "Rating must be between 1 and 5" })
    .max(5, { message: "Rating must be between 1 and 5" }),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message is too long" }),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
