import { memo } from "react";
import { Text, View } from "react-native";
import { Calendar } from "lucide-react-native";

import { QuizAttemptDetails } from "@/types/quiz-attempt.type";

import Card from "../ui/card";
import Badge from "../ui/badge";

type QuizOverviewCardProps = {
  attempt: QuizAttemptDetails;
};

const QuizOverviewCard = memo(({ attempt }: QuizOverviewCardProps) => {
  return (
    <Card padding="lg" radius="xl" shadow="sm" className="mb-5">
      <View className="gap-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-xl font-bold text-neutral-900 dark:text-white">
              {attempt.quiz.title}
            </Text>
            <Text className="mt-1 text-sm text-neutral-500">
              {attempt.quiz.description}
            </Text>
          </View>
          <Badge
            label={attempt.status}
            variant={attempt.status === "completed" ? "success" : "warning"}
          />
        </View>
        <View className="flex-row items-center gap-2">
          <Calendar size={16} color="#737373" />
          <Text className="text-sm text-neutral-500">
            {new Date(attempt.submittedAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </Card>
  );
});

QuizOverviewCard.displayName = "QuizOverviewCard";

export default QuizOverviewCard;
