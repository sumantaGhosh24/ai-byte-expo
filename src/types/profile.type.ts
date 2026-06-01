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
  role: "user" | "admin";
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
  user: {
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
    lastEnroll: {
      id: string;
      userId: string;
      completed: boolean;
      finishedLessons: number;
      startedAt: Date;
      finishedAt: Date | null;
      course: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        thumbnailUrl: string | null;
        thumbnailPublicId: string | null;
        duration: string;
        aiGenerated: boolean;
        categoryId: string;
      };
    } | null;
    lastProgress: {
      id: string;
      userId: string;
      completed: boolean;
      startedAt: Date;
      finishedAt: Date | null;
      lessonId: string;
      lesson: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        title: string;
        content: string;
        thumbnailUrl: string | null;
        thumbnailPublicId: string | null;
        videoUrl: string | null;
        videoPublicId: string | null;
        duration: string;
        aiGenerated: boolean;
        orderIndex: number;
      };
    } | null;
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
