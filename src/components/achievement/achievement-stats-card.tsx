import { memo } from "react";
import { View, Text } from "react-native";

import { UserAchievement } from "@/types/achievement.type";

import Card from "../ui/card";

interface AchievementStatsCardProps {
  achievements: UserAchievement[];
}

const Stat = ({ label, value }: { label: string; value: number }) => {
  return (
    <View className="items-center">
      <Text className="text-xl font-bold dark:text-white">{value}</Text>
      <Text className="text-xs text-neutral-500">{label}</Text>
    </View>
  );
};

const AchievementStatsCard = memo(({ achievements }: AchievementStatsCardProps) => {
  const stats = {
    total: achievements.length,
    legendary: achievements.filter((x) => x.achievement.achievementRarity === "legendary")
      .length,
    epic: achievements.filter((x) => x.achievement.achievementRarity === "epic").length,
    rare: achievements.filter((x) => x.achievement.achievementRarity === "rare").length,
  };

  return (
    <Card radius="xl" padding="xl" bordered>
      <View className="flex-row justify-between">
        <Stat label="Total" value={stats.total} />
        <Stat label="Legendary" value={stats.legendary} />
        <Stat label="Epic" value={stats.epic} />
        <Stat label="Rare" value={stats.rare} />
      </View>
    </Card>
  );
});

AchievementStatsCard.displayName = "AchievementStatsCard";

export default AchievementStatsCard;
