import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(50, {
      message: "Name must be at most 50 characters",
    }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(30, {
      message: "Username must be at most 30 characters",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers and underscores",
    }),
  bio: z
    .string()
    .max(300, {
      message: "Bio must be at most 300 characters",
    })
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const profilePreferencesSchema = z.object({
  interests: z.array(z.enum(["ai", "python", "javascript", "typescript"])).max(10),
  goals: z
    .array(
      z.enum(["complete_course", "practice_daily", "achieve_streak", "finish_lesson"])
    )
    .max(10),
  dailyReminderTime: z.enum(["morning", "afternoon", "evening", "night"]),
  dailyReminderEnabled: z.boolean(),
  streakReminderEnabled: z.boolean(),
  lessonReminderEnabled: z.boolean(),
  pushNotificationsEnabled: z.boolean(),
  emailNotificationsEnabled: z.boolean(),
});

export type ProfilePreferencesFormValues = z.infer<typeof profilePreferencesSchema>;
