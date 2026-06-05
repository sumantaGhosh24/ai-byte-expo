import { memo } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Crown, Gem, Shield, Sparkles } from "lucide-react-native";

import { UserAchievement } from "@/types/achievement.type";

import Card from "../ui/card";
import Badge, { getBadgeIconColor } from "../ui/badge";

const rarityMap = {
  common: {
    glow: "border-slate-300",
  },
  rare: {
    glow: "border-blue-400",
  },
  epic: {
    glow: "border-purple-500",
  },
  legendary: {
    glow: "border-yellow-500",
  },
};

interface AchievementCardProps {
  achievement: UserAchievement;
}

const AchievementCard = memo(({ achievement }: AchievementCardProps) => {
  const rarity = rarityMap[achievement.achievement.achievementRarity];

  return (
    <Card radius="xl" padding="lg" bordered shadow="sm">
      <View className="items-center">
        <View className={`rounded-full border-2 p-1 ${rarity.glow}`}>
          <Image
            source={{
              uri: achievement.achievement.badgeImage,
            }}
            contentFit="cover"
            transition={300}
            style={{
              height: 96,
              width: 96,
              borderRadius: 9999,
            }}
          />
        </View>
        <Text
          numberOfLines={1}
          className="mt-4 text-center text-base font-bold capitalize dark:text-white"
        >
          {achievement.achievement.title}
        </Text>
        <Text numberOfLines={2} className="mt-2 text-center text-xs text-neutral-500">
          {achievement.achievement.description}
        </Text>
        <View className="mt-4">
          <Badge
            label={achievement.achievement.achievementRarity}
            leftIcon={
              achievement.achievement.achievementRarity === "common" ? (
                <Shield size={12} color={getBadgeIconColor()} />
              ) : achievement.achievement.achievementRarity === "rare" ? (
                <Sparkles size={12} color={getBadgeIconColor()} />
              ) : achievement.achievement.achievementRarity === "epic" ? (
                <Gem size={12} color={getBadgeIconColor()} />
              ) : (
                <Crown size={12} color={getBadgeIconColor()} />
              )
            }
          />
        </View>
      </View>
    </Card>
  );
});

AchievementCard.displayName = "AchievementCard";

export default AchievementCard;
