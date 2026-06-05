import { memo } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import {
  Brain,
  Clock3,
  Trophy,
  CheckCircle2,
  XCircle,
  ChartColumn,
} from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { formatDistanceToNow } from "date-fns";

import { QuizAttemptItem } from "@/types/quiz-attempt.type";

import Card from "../ui/card";
import Badge from "../ui/badge";
import Button, { getButtonIconColor } from "../ui/button";
import ProgressBar from "../ui/progress";

interface QuizAttemptCardProps {
  attempt: QuizAttemptItem;
}

const difficultyVariant = {
  beginner: "success",
  intermediate: "warning",
  expert: "danger",
} as const;

const statusVariant = {
  completed: "success",
  processing: "warning",
  failed: "danger",
  pending: "secondary",
} as const;

const QuizAttemptCard = memo(({ attempt }: QuizAttemptCardProps) => {
  return (
    <Animated.View entering={FadeInUp.duration(400)} className="flex-1 p-2">
      <Card shadow="sm" radius="xl">
        <View className="gap-5">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text
                numberOfLines={2}
                className="text-lg font-bold text-neutral-900 dark:text-white"
              >
                {attempt.quiz.title}
              </Text>
              <View className="mt-2 flex-row gap-2">
                <Badge
                  label={attempt.quiz.difficulty}
                  variant={difficultyVariant[attempt.quiz.difficulty]}
                />
                <Badge label={attempt.status} variant={statusVariant[attempt.status]} />
              </View>
            </View>
            <View className="items-center">
              <Trophy size={22} color="#1447e6" />
              <Text className="mt-1 text-2xl font-bold text-primary">
                {attempt.score}%
              </Text>
            </View>
          </View>
          <ProgressBar progress={attempt.score} />
          <View className="flex-row justify-between">
            <View className="flex-row items-center gap-2">
              <CheckCircle2 size={18} color="#16a34a" />
              <Text className="font-medium text-green-600">{attempt.correctAnswers}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <XCircle size={18} color="#ef4444" />
              <Text className="font-medium text-red-500">{attempt.wrongAnswers}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Clock3 size={18} color="#737373" />
              <Text className="text-neutral-500">
                {attempt.correctAnswers + attempt.wrongAnswers}
              </Text>
            </View>
          </View>
          {attempt.summary && (
            <View className="flex-row items-center gap-2 rounded-2xl bg-primary/5 p-3">
              <Brain size={18} color="#1447e6" />
              <Text className="flex-1 text-sm font-medium text-primary">
                AI performance summary available
              </Text>
            </View>
          )}
          <Text className="text-xs text-neutral-500">
            Submitted{" "}
            {formatDistanceToNow(new Date(attempt.submittedAt), {
              addSuffix: true,
            })}
          </Text>
          <Button
            title="View Results"
            disabled={attempt.status !== "completed"}
            onPress={() => router.push(`/attempt/${attempt.id}`)}
            leftIcon={<ChartColumn size={18} color={getButtonIconColor()} />}
          />
        </View>
      </Card>
    </Animated.View>
  );
});

QuizAttemptCard.displayName = "QuizAttemptCard";

export default QuizAttemptCard;
