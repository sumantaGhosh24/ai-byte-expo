import { memo } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { formatDistanceToNowStrict } from "date-fns";

import { UserAchievement } from "@/types/achievement.type";

import Card from "../ui/card";

interface Props {
  achievement: UserAchievement;
}

const FeaturedAchievementCard = memo(({ achievement }: Props) => {
  return (
    <Card radius="xl" padding="xl" shadow="md" bordered>
      <View className="flex-row items-center">
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
        <View className="ml-4 flex-1">
          <Text className="text-xs text-neutral-500">Latest Achievement</Text>
          <Text className="mt-1 text-xl font-bold capitalize dark:text-white">
            {achievement.achievement.title}
          </Text>
          <Text className="mt-1 text-neutral-500">
            {achievement.achievement.description}
          </Text>
          <Text className="mt-2 text-xs text-neutral-400">
            Unlocked{" "}
            {formatDistanceToNowStrict(achievement.unlockedAt, {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
    </Card>
  );
});

FeaturedAchievementCard.displayName = "FeaturedAchievementCard";

export default FeaturedAchievementCard;
