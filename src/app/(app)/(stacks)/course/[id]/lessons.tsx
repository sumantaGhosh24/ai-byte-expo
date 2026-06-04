import { useCallback, useMemo, useState } from "react";
import { RefreshControl, Text, View, useWindowDimensions } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import { useColorScheme } from "nativewind";

import { useMyCourse } from "@/hooks/use-courses";
import { useDebounce } from "@/hooks/use-debouce";
import { useEnroll } from "@/hooks/use-enrolls";
import { useLessons } from "@/hooks/use-lessons";
import { useUpdateProgress } from "@/hooks/use-progresses";
import CourseHero from "@/components/courses/course-hero";
import EnrollProgressCard from "@/components/lessons/enroll-progress-card";
import LessonCard from "@/components/lessons/lesson-card";
import {
  LessonCardSkeleton,
  LessonsScreenSkeleton,
} from "@/components/lessons/lesson-screen-skeleton";
import EmptyLessons from "@/components/lessons/empty-lessons";
import Input from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";

const LessonsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const [search, setSearch] = useState("");

  const [processing, setProcessing] = useState(false);

  const debouncedSearch = useDebounce(search);

  const { data: courseData, isLoading: courseLoading } = useMyCourse(id);

  const { data: enrollData, refetch: refetchEnroll } = useEnroll(id);

  const {
    data: lessonsData,
    isLoading: lessonsLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLessons({
    courseId: id,
    limit: 20,
    search: debouncedSearch,
  });

  const updateProgress = useUpdateProgress();

  const lessons = useMemo(
    () => lessonsData?.pages.flatMap((page) => page.result.items) ?? [],
    [lessonsData]
  );

  const progressPercentage = useMemo(() => {
    if (!enrollData || !lessons.length) {
      return 0;
    }

    return Math.round((enrollData.enroll.finishedLessons / lessons.length) * 100);
  }, [enrollData, lessons.length]);

  const handleLessonPress = useCallback(
    async (lessonId: string) => {
      setProcessing(true);

      try {
        await updateProgress.mutateAsync({
          lessonId,
          startedAt: new Date().toISOString(),
        });

        await refetchEnroll();
      } catch {
      } finally {
        setProcessing(false);
      }

      router.push(`/lesson/${lessonId}`);
    },
    [updateProgress, refetchEnroll]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderLesson = useCallback(
    ({ item, index }: any) => (
      <Animated.View entering={FadeInUp.delay(index * 40)} className={"mb-3 px-4"}>
        <LessonCard lesson={item} onPress={() => handleLessonPress(item.id)} />
      </Animated.View>
    ),
    [handleLessonPress]
  );

  const renderHeader = useMemo(
    () => (
      <View className="mt-4 gap-6 px-4 pb-6">
        <CourseHero course={courseData?.course!} />
        <EnrollProgressCard
          enroll={enrollData?.enroll}
          lessonsCount={lessons.length}
          progress={progressPercentage}
        />
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search lessons..."
          leftIcon={<Search size={18} color={isDark ? "white" : "black"} />}
        />
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-neutral-900 dark:text-white">
            Lessons
          </Text>
          <Text className="text-sm text-neutral-500">{lessons.length} found</Text>
        </View>
      </View>
    ),
    [
      courseData?.course,
      enrollData?.enroll,
      lessons.length,
      progressPercentage,
      search,
      isDark,
    ]
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="px-4 pb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} className={isTablet ? "px-2" : ""}>
            <LessonCardSkeleton />
          </View>
        ))}
      </View>
    );
  };

  if (courseLoading || lessonsLoading) {
    return <LessonsScreenSkeleton />;
  }

  if (processing) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner label="Loading lesson..." />
      </View>
    );
  }

  return (
    <FlashList
      data={lessons}
      renderItem={renderLesson}
      numColumns={isTablet ? 2 : 1}
      key={isTablet ? "tablet" : "mobile"}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={<EmptyLessons />}
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

export default LessonsScreen;
