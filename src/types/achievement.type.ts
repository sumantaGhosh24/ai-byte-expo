export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export type AchievementType =
  | "course_completion"
  | "streak"
  | "quiz_master"
  | "first_login"
  | "milestone";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  badgeImage: string;
  badgeImagePublicId: string;
  achievementType: AchievementType;
  achievementRarity: AchievementRarity;
  createdAt: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: string;
  achievement: Achievement;
}

export interface UserAchievementsResponse {
  success: boolean;
  achievements: UserAchievement[];
}
