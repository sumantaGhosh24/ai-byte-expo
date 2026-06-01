import { memo } from "react";
import { View, Text } from "react-native";
import { Brain, CheckCircle2 } from "lucide-react-native";

import { PublicProfileResponse } from "@/types/profile.type";

import Card from "../ui/card";
import ProgressBar from "../ui/progress";

interface QuizPerformanceProps {
  stats: PublicProfileResponse["user"]["stats"];
}

function ProgressItem({ title, value }: { title: string; value: number }) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-neutral-500 dark:text-neutral-400">{title}</Text>
        <Text className="font-semibold dark:text-white">{value.toFixed(1)}%</Text>
      </View>
      <ProgressBar progress={value} showLabel={false} />
    </View>
  );
}

const QuizPerformance = memo(({ stats }: QuizPerformanceProps) => {
  return (
    <Card radius="xl" shadow="sm">
      <View className="mb-5 flex-row items-center gap-3">
        <View className="rounded-2xl bg-primary/10 p-3">
          <Brain size={22} color="#1447e6" />
        </View>
        <View>
          <Text className="text-lg font-bold dark:text-white">Quiz Performance</Text>
          <Text className="text-neutral-500 dark:text-neutral-400">
            Learning analytics
          </Text>
        </View>
      </View>
      <View className="gap-5">
        <ProgressItem title="Average Score" value={stats.averageScore} />
        <ProgressItem title="Highest Score" value={stats.highestScore} />
        <ProgressItem title="Lowest Score" value={stats.lowestScore} />
      </View>
      <View className="mt-6 flex-row gap-3">
        <View className="flex-1 rounded-2xl bg-neutral-100 p-4 dark:bg-neutral-900">
          <Text className="text-neutral-500 dark:text-neutral-400">Attempts</Text>
          <Text className="mt-1 text-2xl font-bold dark:text-white">
            {stats.totalQuizAttempts}
          </Text>
        </View>
        <View className="flex-1 rounded-2xl bg-neutral-100 p-4 dark:bg-neutral-900">
          <Text className="text-neutral-500 dark:text-neutral-400">Answers</Text>
          <Text className="mt-1 text-2xl font-bold dark:text-white">
            {stats.totalAnswerSubmissions}
          </Text>
        </View>
      </View>
      <View className="mt-4 rounded-2xl bg-green-50 p-4 dark:bg-green-950">
        <View className="flex-row items-center gap-2">
          <CheckCircle2 size={18} color="#16a34a" />
          <Text className="font-semibold text-green-700 dark:text-green-400">
            Strong Learning Progress
          </Text>
        </View>
      </View>
    </Card>
  );
});

QuizPerformance.displayName = "QuizPerformance";

export default QuizPerformance;
