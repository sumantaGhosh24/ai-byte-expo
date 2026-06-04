import { memo } from "react";
import { Text, View } from "react-native";

import { QuestionItem } from "@/types/question.type";

import Card from "../ui/card";
import QuizOption from "./quiz-option";

interface QuizQuestionCardProps {
  question: QuestionItem;
  selectedOptionId?: string;
  onSelect: (id: string) => void;
}

const QuizQuestionCard = memo(
  ({ question, selectedOptionId, onSelect }: QuizQuestionCardProps) => {
    return (
      <Card radius="xl" padding="xl" shadow="md" className="gap-6">
        <View>
          <Text className="text-muted-foreground dark:text-white">Question</Text>
          <Text className="mt-2 text-xl font-bold dark:text-white">
            {question.question}
          </Text>
        </View>
        <View className="gap-3">
          {question.options.map((option) => (
            <QuizOption
              key={option.id}
              label={option.text}
              selected={selectedOptionId === option.id}
              onPress={() => onSelect(option.id)}
            />
          ))}
        </View>
      </Card>
    );
  }
);

QuizQuestionCard.displayName = "QuizQuestionCard";

export default QuizQuestionCard;
