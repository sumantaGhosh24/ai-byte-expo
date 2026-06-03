import { useCallback, useMemo, useState } from "react";
import { View, Text, useWindowDimensions, Alert, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Search } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Toast from "react-native-toast-message";

import { useDebounce } from "@/hooks/use-debouce";
import { useDeleteReview, useUserReviews } from "@/hooks/use-reviews";
import EmptyReviews from "@/components/reviews/empty-reviews";
import MyReviewCard from "@/components/reviews/my-review-card";
import Input from "@/components/ui/input";
import {
  MyReviewCardSkeleton,
  MyReviewsSkeleton,
} from "@/components/reviews/review-skeleton";
import { ReviewItem } from "@/types/review.type";

const ReviewsScreen = () => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const deleteReview = useDeleteReview();

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserReviews({
    limit: 10,
    search: debouncedSearch,
  });

  const reviews = useMemo(
    () => data?.pages.flatMap((page) => page.result.items) ?? [],
    [data]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleDelete = useCallback(
    (review: ReviewItem) => {
      Alert.alert("Delete Review", "Are you sure you want to delete this review?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            deleteReview.mutate(
              {
                id: review.id,
                courseId: review.courseId,
              },
              {
                onSuccess: (data) => {
                  Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: data.message,
                  });
                },
                onError: (error: any) => {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error?.message,
                  });
                },
              }
            ),
        },
      ]);
    },
    [deleteReview]
  );

  const renderReview = useCallback(
    ({ item }: { item: ReviewItem }) => (
      <MyReviewCard review={item} onDelete={() => handleDelete(item)} />
    ),
    [handleDelete]
  );

  const renderHeader = useMemo(
    () => (
      <View className={`gap-5 px-4 py-4 ${isTablet ? "mx-auto w-full max-w-3xl" : ""}`}>
        <Animated.View entering={FadeInUp.duration(400)}>
          <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
            My Reviews
          </Text>
          <Text className="mt-1 text-neutral-500">All of my reviews</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100)}>
          <Input
            placeholder="Search reviews..."
            value={search}
            onChangeText={setSearch}
            leftIcon={<Search size={18} color={isDark ? "white" : "black"} />}
          />
        </Animated.View>
        <Text className="text-lg font-semibold dark:text-white">
          Reviews ({reviews.length})
        </Text>
      </View>
    ),
    [isDark, isTablet, reviews.length, search]
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="gap-4 px-4 pb-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <MyReviewCardSkeleton key={i} />
        ))}
      </View>
    );
  };

  if (isLoading) {
    return <MyReviewsSkeleton />;
  }

  return (
    <View className="flex-1">
      <FlashList
        data={reviews}
        renderItem={renderReview}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? "tablet" : "mobile"}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<EmptyReviews />}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingHorizontal: isTablet ? 8 : 0,
        }}
      />
    </View>
  );
};

export default ReviewsScreen;
