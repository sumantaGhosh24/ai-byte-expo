import { memo, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Brain, ChevronRight } from "lucide-react-native";

import { QuizItem } from "@/types/quiz.type";

import Badge from "../ui/badge";
import Card from "../ui/card";
import Button from "../ui/button";

interface Props {
  quiz: QuizItem;
  onPress: () => void;
}

const QuizCard = memo(({ quiz, onPress }: Props) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  const difficultyVariant = useMemo(() => {
    switch (quiz?.difficulty) {
      case "beginner":
        return "success";

      case "intermediate":
        return "warning";

      case "expert":
        return "danger";

      default:
        return "secondary";
    }
  }, [quiz?.difficulty]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
    >
      <Animated.View style={animatedStyle}>
        <Card radius="xl" padding="lg" shadow="sm">
          <View className="gap-4">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text
                  numberOfLines={2}
                  className="text-lg font-bold text-neutral-900 dark:text-white"
                >
                  {quiz.title}
                </Text>
                {!!quiz.description && (
                  <Text numberOfLines={2} className="mt-2 text-neutral-500">
                    {quiz.description}
                  </Text>
                )}
              </View>
              <View className="ml-3 h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Brain size={22} color="#1447e6" />
              </View>
            </View>
            <View className="flex-row flex-wrap gap-2">
              <Badge label={quiz.difficulty} variant={difficultyVariant} />
              <Badge
                size="sm"
                variant="secondary"
                label={`${quiz.questionsCount} Questions`}
              />
              <Badge size="sm" variant="warning" label={`Pass ${quiz.passingScore}%`} />
              {quiz.aiGenerated && <Badge size="sm" label="AI Generated" />}
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-500">
                {quiz.attemptsCount} Attempts
              </Text>
              <Button
                size="sm"
                title="View Quiz"
                rightIcon={<ChevronRight size={16} color="white" />}
                onPress={onPress}
                fullWidth={false}
              />
            </View>
          </View>
        </Card>
      </Animated.View>
    </Pressable>
  );
});

QuizCard.displayName = "QuizCard";

export default QuizCard;
