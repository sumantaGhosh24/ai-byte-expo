import { memo } from "react";
import { View, Text } from "react-native";
import { Zap } from "lucide-react-native";

import Card from "../ui/card";
import ProgressBar from "../ui/progress";

interface LevelCardProps {
  totalXP: number;
  level: number;
  currentStreak: number;
}

const LevelCard = memo(({ totalXP, level, currentStreak }: LevelCardProps) => {
  const currentLevelXP = totalXP % 1000;
  const progress = (currentLevelXP / 1000) * 100;

  return (
    <Card className="mt-6" radius="xl" shadow="sm">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-neutral-500 dark:text-neutral-400">Current Level</Text>
          <Text className="mt-1 text-4xl font-bold dark:text-white">{level}</Text>
        </View>
        <View className="rounded-3xl bg-primary/10 p-4">
          <Zap size={30} color="#1447e6" />
        </View>
      </View>
      <View className="mt-6">
        <ProgressBar progress={progress} showLabel={false} />
      </View>
      <View className="mt-4 flex-row justify-between">
        <View>
          <Text className="text-neutral-500 dark:text-neutral-400">Total XP</Text>
          <Text className="font-semibold dark:text-white">
            {totalXP.toLocaleString()}
          </Text>
        </View>
        <View>
          <Text className="text-neutral-500 dark:text-neutral-400">Streak</Text>
          <Text className="font-semibold dark:text-white">{currentStreak} Days</Text>
        </View>
      </View>
    </Card>
  );
});

LevelCard.displayName = "LevelCard";

export default LevelCard;
