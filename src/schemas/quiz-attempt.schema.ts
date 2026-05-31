import { z } from "zod";

export const createQuizAttemptSchema = z.object({
  quizId: z.string().min(1, { message: "Quiz is required" }),
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        selectedOptionId: z.string().min(1),
      })
    )
    .min(1, { message: "Please answer at least one question" }),
});

export type CreateQuizAttemptFormValues = z.infer<typeof createQuizAttemptSchema>;
