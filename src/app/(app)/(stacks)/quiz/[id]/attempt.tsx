import { useCallback, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated";

import { useQuestions } from "@/hooks/use-questions";
import { useCreateQuizAttempt } from "@/hooks/use-quiz-attempts";
import { useQuizAttempt } from "@/hooks/use-quiz-attempt";
import { usePreventExitQuiz } from "@/hooks/use-prevent-exit-quiz";
import { errorHaptic, successHaptic } from "@/lib/haptic";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import ProgressBar from "@/components/ui/progress";
import Button from "@/components/ui/button";
import QuizQuestionCard from "@/components/quizzes/quiz-question-card";
import { QuizAttemptSkeleton } from "@/components/quizzes/quiz-attempt-skeleton";
import QuizCompletionOverlay from "@/components/quizzes/quiz-completion-overlay";
import Toast from "react-native-toast-message";

const AttemptScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [showCompletion, setShowCompletion] = useState(false);

  const { data: questionsData, isPending } = useQuestions({
    quizId: id,
    limit: 100,
  });

  const createAttempt = useCreateQuizAttempt();

  const questions = useMemo(
    () => questionsData?.result.items ?? [],
    [questionsData?.result.items]
  );

  const { currentIndex, progress, answers, payload, answerQuestion, next, previous } =
    useQuizAttempt(questions.length);

  usePreventExitQuiz(!showCompletion && !createAttempt.isSuccess);

  const currentQuestion = questions[currentIndex];

  const selectedOptionId = currentQuestion
    ? answers[currentQuestion.id]?.selectedOptionId
    : undefined;

  const isLastQuestion = currentIndex === questions.length - 1;

  const submitQuiz = useCallback(async () => {
    try {
      setShowCompletion(true);

      await successHaptic();

      const response = await createAttempt.mutateAsync({
        quizId: id,
        answers: payload,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: response?.message,
      });

      setTimeout(() => {
        router.replace(`/attempt/${response.attempt.id}`);
      }, 1500);
    } catch {
      setShowCompletion(false);

      await errorHaptic();

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong, try again later",
      });
    }
  }, [createAttempt, id, payload]);

  if (isPending) {
    return <QuizAttemptSkeleton />;
  }

  if (!questions.length || !currentQuestion) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="dark:text-white">No questions found</Text>
      </View>
    );
  }

  return (
    <>
      <View className="mb-5 flex-1 px-5 pb-6">
        <Animated.View entering={FadeIn} layout={LinearTransition} className="gap-5">
          <Card radius="xl" padding="lg">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold dark:text-white">
                Question {currentIndex + 1}
              </Text>
              <Badge
                label={`${currentIndex + 1}/${questions.length}`}
                variant="primary"
              />
            </View>
            <View className="mt-4">
              <ProgressBar progress={progress} showLabel />
            </View>
          </Card>
          <Animated.View
            key={currentQuestion.id}
            entering={FadeInRight.duration(250)}
            exiting={FadeOutLeft.duration(250)}
          >
            <QuizQuestionCard
              question={currentQuestion}
              selectedOptionId={selectedOptionId}
              onSelect={(optionId: string) =>
                answerQuestion(currentQuestion.id, optionId)
              }
            />
          </Animated.View>
        </Animated.View>
        <View className="mt-auto flex-row gap-3 pt-6">
          <Button
            title="Previous"
            variant="secondary"
            disabled={currentIndex === 0}
            onPress={previous}
            fullWidth={false}
            className="w-1/2"
          />
          {isLastQuestion ? (
            <Button
              title="Submit Quiz"
              loading={createAttempt.isPending}
              onPress={submitQuiz}
              fullWidth={false}
              className="w-1/2"
            />
          ) : (
            <Button
              title="Next"
              disabled={!selectedOptionId}
              onPress={next}
              fullWidth={false}
              className="w-1/2"
            />
          )}
        </View>
      </View>
      <QuizCompletionOverlay visible={showCompletion} />
    </>
  );
};

export default AttemptScreen;
