import { memo } from "react";
import { Text, View } from "react-native";
import { Trophy } from "lucide-react-native";

import Card from "../ui/card";
import ProgressBar from "../ui/progress";
import StatBox from "./stat-box";

type ScoreCardProps = {
  score: number;
  correct: number;
  wrong: number;
  accuracy: number;
};

const ScoreCard = memo(({ score, correct, wrong, accuracy }: ScoreCardProps) => {
  return (
    <Card padding="lg" radius="xl" shadow="sm" className="mb-5">
      <View className="mb-6 flex-row items-center gap-2">
        <Trophy size={20} color="#1447e6" />
        <Text className="text-lg font-semibold dark:text-white">Performance</Text>
      </View>
      <Text className="text-center text-5xl font-black text-primary">{score}</Text>
      <Text className="mt-1 text-center text-neutral-500">Final Score</Text>
      <View className="mt-6">
        <ProgressBar progress={accuracy} showLabel />
      </View>
      <View className="mt-6 flex-row gap-3">
        <StatBox title="Correct" value={correct} success />
        <StatBox title="Wrong" value={wrong} danger />
      </View>
    </Card>
  );
});

ScoreCard.displayName = "ScoreCard";

export default ScoreCard;
