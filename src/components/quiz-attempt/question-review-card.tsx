import { memo } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { QuizAttemptAnswer } from "@/types/quiz-attempt.type";

import Card from "../ui/card";
import Badge from "../ui/badge";

type QuestionReviewCardProps = {
  answer: QuizAttemptAnswer;
  index: number;
};

const QuestionReviewCard = memo(({ answer, index }: QuestionReviewCardProps) => {
  return (
    <Animated.View entering={FadeInDown.delay(index * 50)}>
      <Card padding="lg" radius="xl" shadow="sm">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-semibold dark:text-white">Question {index + 1}</Text>
          <Badge
            label={answer.isCorrect ? "Correct" : "Wrong"}
            variant={answer.isCorrect ? "success" : "danger"}
          />
        </View>
        <Text className="mb-5 text-base font-medium leading-6 dark:text-white">
          {answer.question.question}
        </Text>
        <View className="gap-3">
          {answer.question.options.map((option) => {
            const isSelected = option.id === answer.selectedOptionId;
            const isCorrect = option.isCorrect;

            return (
              <View
                key={option.id}
                className={`rounded-2xl border p-4 ${
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : isSelected
                      ? "border-red-500 bg-red-50"
                      : "border-neutral-200"
                } `}
              >
                <Text
                  className={
                    isSelected || isCorrect ? "dark:text-black" : "dark:text-white"
                  }
                >
                  {option.text}
                </Text>
              </View>
            );
          })}
        </View>
        {!!answer.question.explanation && (
          <View className="mt-5 rounded-2xl bg-primary/5 p-4">
            <Text className="mb-1 font-semibold text-primary">Explanation</Text>
            <Text className="leading-6 text-neutral-500">
              {answer.question.explanation}
            </Text>
          </View>
        )}
      </Card>
    </Animated.View>
  );
});

QuestionReviewCard.displayName = "QuestionReviewCard";

export default QuestionReviewCard;
