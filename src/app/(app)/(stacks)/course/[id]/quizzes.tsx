import { useCallback, useMemo, useState } from "react";
import { RefreshControl, Text, View, Pressable, useWindowDimensions } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import { useColorScheme } from "nativewind";

import { useDebounce } from "@/hooks/use-debounce";
import { useMyCourse } from "@/hooks/use-courses";
import { usePublicQuizzes } from "@/hooks/use-quizzes";
import Input from "@/components/ui/input";
import Badge from "@/components/ui/badge";
import CourseHero from "@/components/courses/course-hero";
import QuizCard from "@/components/quizzes/quiz-card";
import EmptyQuizzes from "@/components/quizzes/empty-quizzes";
import {
  QuizCardSkeleton,
  QuizzesScreenSkeleton,
} from "@/components/quizzes/quizzes-skeleton";
import { QuizDifficulty } from "@/types/quiz.type";

const FILTERS: {
  label: string;
  value?: QuizDifficulty;
}[] = [
  {
    label: "All",
  },
  {
    label: "Beginner",
    value: "beginner",
  },
  {
    label: "Intermediate",
    value: "intermediate",
  },
  {
    label: "Expert",
    value: "expert",
  },
];

const QuizzesScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState<QuizDifficulty>();

  const debouncedSearch = useDebounce(search);

  const { data: courseData, isLoading: courseLoading } = useMyCourse(id);

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePublicQuizzes({
    courseId: id,
    limit: 20,
    search: debouncedSearch,
    difficulty,
  });

  const quizzes = useMemo(
    () => data?.pages.flatMap((page) => page.result.items) ?? [],
    [data]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleQuizPress = useCallback((quizId: string) => {
    router.push(`/quiz/${quizId}`);
  }, []);

  const renderQuiz = useCallback(
    ({ item, index }: any) => (
      <Animated.View entering={FadeInUp.delay(index * 40)} className="mb-3 px-4">
        <QuizCard quiz={item} onPress={() => handleQuizPress(item.id)} />
      </Animated.View>
    ),
    [handleQuizPress]
  );

  const renderHeader = useMemo(
    () => (
      <View className="mt-4 gap-6 px-4 pb-6">
        <CourseHero course={courseData?.course!} />
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search quizzes..."
          leftIcon={<Search size={18} color={isDark ? "white" : "black"} />}
        />
        <View className="gap-3">
          <Text className="font-semibold text-neutral-900 dark:text-white">
            Difficulty
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const active =
                difficulty === filter.value || (!difficulty && !filter.value);

              return (
                <Pressable key={filter.label} onPress={() => setDifficulty(filter.value)}>
                  <Badge
                    label={filter.label}
                    variant={active ? "primary" : "secondary"}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-neutral-900 dark:text-white">
            Quizzes
          </Text>
          <Text className="text-sm text-neutral-500">{quizzes.length} found</Text>
        </View>
      </View>
    ),
    [courseData?.course, search, isDark, difficulty, quizzes.length]
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="px-4 pb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} className={isTablet ? "px-2" : ""}>
            <QuizCardSkeleton />
          </View>
        ))}
      </View>
    );
  };

  if (courseLoading || isLoading) {
    return <QuizzesScreenSkeleton />;
  }

  return (
    <FlashList
      data={quizzes}
      renderItem={renderQuiz}
      numColumns={isTablet ? 2 : 1}
      key={isTablet ? "tablet" : "mobile"}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={<EmptyQuizzes />}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      contentContainerStyle={{
        paddingHorizontal: isTablet ? 8 : 0,
        paddingBottom: 120,
      }}
    />
  );
};

export default QuizzesScreen;
