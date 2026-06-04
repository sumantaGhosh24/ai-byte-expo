import { useCallback, useMemo } from "react";
import { View, Text, RefreshControl, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";
import { Brain, RotateCcw } from "lucide-react-native";

import { usePublicQuiz } from "@/hooks/use-quizzes";
import Spinner from "@/components/ui/spinner";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { QuizScreenSkeleton } from "@/components/quizzes/quizzes-skeleton";

const QuizScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isRefetching, refetch } = usePublicQuiz(id);

  const quiz = data?.quiz;

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

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleStartQuiz = useCallback(() => {
    router.push(`/quiz/${id}/attempt`);
  }, [id]);

  if (isLoading) {
    return <QuizScreenSkeleton />;
  }

  if (!quiz) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner label="Loading quiz..." />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120,
        }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp} layout={LinearTransition}>
          <Card radius="xl" padding="xl" className="overflow-hidden">
            <View className="gap-5">
              <View className="h-16 w-16 items-center justify-center rounded-3xl bg-primary/10">
                <Brain size={30} color="#1447e6" />
              </View>
              <View>
                <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {quiz.title}
                </Text>
                {!!quiz.description && (
                  <Text className="mt-2 text-base text-neutral-500 dark:text-neutral-400">
                    {quiz.description}
                  </Text>
                )}
              </View>
              <View className="flex-row flex-wrap gap-3">
                <Badge label={quiz.difficulty} variant={difficultyVariant} />
                <Badge label={`${quiz._count.questions} Questions`} variant="secondary" />
                <Badge label={`${quiz.passingScore}% Pass`} variant="primary" />
                {quiz.aiGenerated && <Badge label="AI Generated" variant="primary" />}
              </View>
            </View>
          </Card>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(100)}
          layout={LinearTransition}
          className="mt-6"
        >
          <Card radius="xl" padding="lg">
            <Text className="mb-4 text-lg font-semibold dark:text-white">
              Quiz Statistics
            </Text>
            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-500 dark:text-neutral-400">Questions</Text>
                <Text className="font-semibold dark:text-white">
                  {quiz._count.questions}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-500 dark:text-neutral-400">
                  Passing Score
                </Text>
                <Text className="font-semibold dark:text-white">
                  {quiz.passingScore}%
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-500 dark:text-neutral-400">Attempts</Text>
                <Text className="font-semibold dark:text-white">
                  {quiz._count.attempts}
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(200)}
          layout={LinearTransition}
          className="mt-6"
        >
          <Card radius="xl" padding="lg">
            <Text className="mb-4 text-lg font-semibold dark:text-white">
              Before You Start
            </Text>
            <View className="gap-4">
              <View className="flex-row gap-3">
                <RotateCcw size={18} color="#1447e6" />
                <Text className="flex-1 text-neutral-600 dark:text-neutral-400">
                  Answer all questions carefully before submitting.
                </Text>
              </View>
              <View className="flex-row gap-3">
                <RotateCcw size={18} color="#1447e6" />
                <Text className="flex-1 text-neutral-600 dark:text-neutral-400">
                  You need at least {quiz.passingScore}% to pass.
                </Text>
              </View>
              <View className="flex-row gap-3">
                <RotateCcw size={18} color="#1447e6" />
                <Text className="flex-1 text-neutral-600 dark:text-neutral-400">
                  Review lesson content before attempting if needed.
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>
      <Animated.View
        entering={FadeInUp}
        className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950"
      >
        <Button title="Start Quiz" variant="primary" onPress={handleStartQuiz} />
      </Animated.View>
    </View>
  );
};

export default QuizScreen;
