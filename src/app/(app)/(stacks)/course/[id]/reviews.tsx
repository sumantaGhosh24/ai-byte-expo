import { useCallback, useMemo, useState } from "react";
import { View, Text, useWindowDimensions, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { Search, Star } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Toast from "react-native-toast-message";

import { useDebounce } from "@/hooks/use-debouce";
import { useMyCourse } from "@/hooks/use-courses";
import { useEnroll } from "@/hooks/use-enrolls";
import { useCourseReviews, useCreateReview } from "@/hooks/use-reviews";
import EmptyReviews from "@/components/reviews/empty-reviews";
import RatingSelector from "@/components/reviews/rating-selector";
import ReviewCard from "@/components/reviews/review-card";
import {
  ReviewCardSkeleton,
  ReviewsSkeleton,
} from "@/components/reviews/review-skeleton";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import { ReviewItem } from "@/types/review.type";

const ReviewsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const [search, setSearch] = useState("");

  const [rating, setRating] = useState(5);

  const debouncedSearch = useDebounce(search);

  const createReview = useCreateReview();

  const { data: courseData } = useMyCourse(id);

  const { data: enrollData } = useEnroll(id);

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCourseReviews({
    courseId: id,
    limit: 10,
    search: debouncedSearch,
  });

  const course = courseData?.course;

  const isEnrolled = !!enrollData?.enroll;

  const reviews = useMemo(
    () => data?.pages.flatMap((page) => page.result.items) ?? [],
    [data]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const onSubmit = useCallback(
    ({ message }: { message: string }) => {
      createReview.mutate(
        {
          courseId: id,
          rating,
          message,
        },
        {
          onSuccess: (data) => {
            Toast.show({
              type: "success",
              text1: "Success",
              text2: data.message,
            });
            reset();
            setRating(5);
          },
          onError: (error: any) => {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: error?.message,
            });
          },
        }
      );
    },
    [createReview, id, rating, reset]
  );

  const renderReview = useCallback(
    ({ item }: { item: ReviewItem }) => <ReviewCard review={item} />,
    []
  );

  const renderHeader = useMemo(
    () => (
      <View className={`gap-5 px-4 py-4 ${isTablet ? "mx-auto w-full max-w-3xl" : ""}`}>
        <Animated.View entering={FadeInUp.duration(400)}>
          <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
            Course Review
          </Text>
          <Text className="mt-1 text-neutral-500">Reviews of this course</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp}>
          <Card>
            <View className="items-center gap-3">
              <Text className="text-5xl font-bold text-neutral-900 dark:text-white">
                {course?.averageReview?.toFixed(1) ?? "0.0"}
              </Text>
              <View className="flex-row">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} color="#f59e0b" fill="#f59e0b" />
                ))}
              </View>
              <Text className="text-neutral-500">
                {course?.reviewsCount ?? 0} Reviews
              </Text>
            </View>
          </Card>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100)}>
          <Input
            placeholder="Search reviews..."
            value={search}
            onChangeText={setSearch}
            leftIcon={<Search size={18} color={isDark ? "white" : "black"} />}
          />
        </Animated.View>
        {isEnrolled && (
          <Animated.View entering={FadeInDown.delay(200)}>
            <Card>
              <View className="gap-5">
                <Text className="text-lg font-semibold dark:text-white">
                  Write Review
                </Text>
                <RatingSelector value={rating} onChange={setRating} />
                <Controller
                  control={control}
                  name="message"
                  rules={{
                    required: "Review is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters",
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label="Review"
                      value={value}
                      onChangeText={onChange}
                      multiline
                      numberOfLines={5}
                      maxLength={500}
                      error={errors.message?.message}
                      placeholder="Share your learning experience..."
                      textAlignVertical="top"
                    />
                  )}
                />
                <Button
                  title="Submit Review"
                  loading={createReview.isPending}
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </Card>
          </Animated.View>
        )}
        <Text className="text-lg font-semibold dark:text-white">
          Reviews ({reviews.length})
        </Text>
      </View>
    ),
    [
      control,
      course?.averageReview,
      course?.reviewsCount,
      createReview.isPending,
      errors.message?.message,
      handleSubmit,
      isDark,
      isEnrolled,
      isTablet,
      onSubmit,
      rating,
      reviews.length,
      search,
    ]
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="gap-4 px-4 pb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <ReviewCardSkeleton key={i} />
        ))}
      </View>
    );
  };

  if (isLoading) {
    return <ReviewsSkeleton />;
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
          paddingHorizontal: isTablet ? 8 : 0,
          paddingBottom: 120,
        }}
      />
    </View>
  );
};

export default ReviewsScreen;
