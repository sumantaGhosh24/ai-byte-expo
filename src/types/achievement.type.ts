export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export type AchievementType =
  | "course_completion"
  | "streak"
  | "quiz_master"
  | "first_login"
  | "milestone";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeImage: string;
  badgeImagePublicId: string;
  achievementType: AchievementType;
  achievementRarity: AchievementRarity;
  createdAt: string;
  updatedAt: string;
}

export interface UserAchievement {
  id: string;
  unlockedAt: string;
  userId: string;
  achievementId: string;
  achievement: Achievement;
}

export interface UserAchievementsResponse {
  success: boolean;
  achievements: UserAchievement[];
}
