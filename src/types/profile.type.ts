export type Interest = "ai" | "python" | "javascript" | "typescript";

export type Goal =
  | "complete_course"
  | "practice_daily"
  | "achieve_streak"
  | "finish_lesson";

export type ReminderTime = "morning" | "afternoon" | "evening" | "night";

export interface Profile {
  id: string;
  userId: string;
  name: string;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  avatarPublicId: string | null;
  interests: Interest[];
  goals: Goal[];
  dailyReminderTime: ReminderTime;
  dailyReminderEnabled: boolean;
  streakReminderEnabled: boolean;
  lessonReminderEnabled: boolean;
  pushNotificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  clerkId: string;
  profile: Profile | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  user: User;
}

export interface PublicProfileResponse {
  success: boolean;
  user: User;
  stats: {
    enrollsCount: number;
    progressCount: number;
    finishedCoursesCount: number;
    finishedLessonsCount: number;
    totalQuizAttempts: number;
    totalAnswerSubmissions: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    totalBookmarks: number;
    achievementsCount: number;
    totalNotifications: number;
    currentStreak: number;
    longestStreak: number;
  };
  lastEnroll: unknown | null;
  lastProgress: unknown | null;
  xp: {
    lessonXP: number;
    courseXP: number;
    quizXP: number;
    bookmarkXP: number;
    onboardingXP: number;
    firstLoginXP: number;
    achievementXP: number;
    streakXP: number;
    totalXP: number;
  };
}

export interface UpdateProfilePayload {
  name: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  avatarPublicId?: string;
}

export interface UpdateProfilePreferencesPayload {
  interests: Interest[];
  goals: Goal[];
  dailyReminderTime: ReminderTime;
  dailyReminderEnabled: boolean;
  streakReminderEnabled: boolean;
  lessonReminderEnabled: boolean;
  pushNotificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
}

export interface UpdateProfileResponse {
  success: boolean;
  profile: Profile;
  message: string;
}
