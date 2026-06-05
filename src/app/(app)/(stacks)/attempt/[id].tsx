import { useMemo } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";

import { useQuizAttempt } from "@/hooks/use-quiz-attempts";
import { useLocalSearchParams } from "expo-router";
import AISummaryCard from "@/components/quiz-attempt/ai-summary-card";
import AttemptSkeleton from "@/components/quiz-attempt/attempt-skeleton";
import QuestionReviewCard from "@/components/quiz-attempt/question-review-card";
import QuizOverviewCard from "@/components/quiz-attempt/quiz-overview-card";
import ScoreCard from "@/components/quiz-attempt/score-card";
import UserCard from "@/components/quiz-attempt/user-card";
import { QuizAttemptAnswer } from "@/types/quiz-attempt.type";

const ResultScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isRefetching, refetch } = useQuizAttempt(id);

  const attempt = data?.quizAttempt;

  const accuracy = useMemo(() => {
    if (!attempt) return 0;

    const total = attempt.correctAnswers + attempt.wrongAnswers;

    if (!total) return 0;

    return Math.round((attempt.correctAnswers / total) * 100);
  }, [attempt]);

  if (isLoading) {
    return <AttemptSkeleton />;
  }

  if (!attempt) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-base text-neutral-500">Attempt not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
      }}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
    >
      <Animated.View
        entering={FadeInUp.duration(400)}
        layout={LinearTransition.springify()}
      >
        <QuizOverviewCard attempt={attempt} />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(100)}>
        <ScoreCard
          score={attempt.score}
          correct={attempt.correctAnswers}
          wrong={attempt.wrongAnswers}
          accuracy={accuracy}
        />
      </Animated.View>
      {attempt.summary && (
        <Animated.View entering={FadeInDown.delay(150)}>
          <AISummaryCard
            strength={attempt.summary.strength}
            weaknesses={attempt.summary.weaknesses}
          />
        </Animated.View>
      )}
      <Animated.View entering={FadeInDown.delay(200)}>
        <UserCard attempt={attempt} />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(250)}>
        <Text className="mb-4 mt-8 text-xl font-bold text-neutral-900 dark:text-white">
          Question Review
        </Text>
        <View className="gap-4">
          {attempt.answers.map((answer: QuizAttemptAnswer, index) => (
            <QuestionReviewCard key={answer.id} answer={answer} index={index} />
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default ResultScreen;
