import { useCallback, useMemo, useState } from "react";
import { Pressable, RefreshControl, Text, View, useWindowDimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useUserQuizAttempts } from "@/hooks/use-quiz-attempts";
import Badge from "@/components/ui/badge";
import QuizAttemptCard from "@/components/quiz-attempt/quiz-attempt-card";
import EmptyQuizAttempts from "@/components/quiz-attempt/empty-quiz-attempt";
import { MyReviewCardSkeleton } from "@/components/reviews/review-skeleton";
import { AttemptStatus, QuizAttemptItem } from "@/types/quiz-attempt.type";

const FILTERS: {
  label: string;
  value: AttemptStatus | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Processing", value: "processing" },
  { label: "Failed", value: "failed" },
];

const MyQuizAttemptsScreen = () => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const [status, setStatus] = useState<AttemptStatus | "all">("all");

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserQuizAttempts();

  const attempts = useMemo(
    () => data?.pages.flatMap((page) => page.result.items) ?? [],
    [data]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: QuizAttemptItem }) => <QuizAttemptCard attempt={item} />,
    []
  );

  const renderHeader = useMemo(
    () => (
      <View className="mt-5 gap-6 px-4 pb-4 pt-2">
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          entering={FadeInDown.delay(150)}
        >
          <View className="gap-3">
            <Text className="font-semibold text-neutral-900 dark:text-white">Status</Text>
            <View className="flex-row flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const active = status === filter.value || (!status && !filter.value);

                return (
                  <Pressable key={filter.label} onPress={() => setStatus(filter.value)}>
                    <Badge
                      label={filter.label}
                      variant={active ? "primary" : "secondary"}
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Animated.ScrollView>
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-neutral-900 dark:text-white">
            Attempts
          </Text>
          <Text className="text-sm text-neutral-500">{attempts.length} found</Text>
        </View>
      </View>
    ),
    [attempts.length, status]
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="gap-4 px-4 pb-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <MyReviewCardSkeleton key={i} />
        ))}
      </View>
    );
  }, [isFetchingNextPage]);

  if (isLoading) {
    return (
      <View className="gap-4 px-4 pt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <MyReviewCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlashList
        data={attempts}
        renderItem={renderItem}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? "tablet" : "mobile"}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<EmptyQuizAttempts />}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingHorizontal: isTablet ? 8 : 0,
        }}
      />
    </View>
  );
};

export default MyQuizAttemptsScreen;
