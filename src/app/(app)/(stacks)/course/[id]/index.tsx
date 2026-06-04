import { useCallback, useMemo } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";
import { Bookmark, BookOpen, ClipboardCheck, Star, Users } from "lucide-react-native";
import Toast from "react-native-toast-message";

import { useMyCourse } from "@/hooks/use-courses";
import { useBookmark, useCreateBookmark, useDeleteBookmark } from "@/hooks/use-bookmarks";
import { useCreateEnroll, useDeleteEnroll, useEnroll } from "@/hooks/use-enrolls";
import CourseDetailsSkeleton from "@/components/courses/course-details-skeleton";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import Card from "@/components/ui/card";
import ProgressBar from "@/components/ui/progress";

const CourseScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const {
    data: courseData,
    isLoading: courseLoading,
    isRefetching: courseRefetching,
    refetch: courseRefetch,
  } = useMyCourse(id);

  const {
    data: bookmarkData,
    isLoading: bookmarkLoading,
    isRefetching: bookmarkRefetching,
    refetch: bookmarkRefetch,
  } = useBookmark(id);

  const {
    data: enrollData,
    isLoading: enrollLoading,
    isRefetching: enrollRefetching,
    refetch: enrollRefetch,
  } = useEnroll(id);

  const createBookmark = useCreateBookmark();
  const deleteBookmark = useDeleteBookmark();

  const createEnroll = useCreateEnroll();
  const deleteEnroll = useDeleteEnroll();

  const course = courseData?.course;

  const bookmark = bookmarkData?.bookmark;

  const enroll = enrollData?.enroll;

  const isBookmarked = !!bookmarkData?.bookmark;

  const isEnrolled = !!enroll;

  const initialLoading = courseLoading || bookmarkLoading || enrollLoading;

  const refreshing = courseRefetching || bookmarkRefetching || enrollRefetching;

  const difficultyVariant = useMemo(() => {
    switch (course?.difficulty) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "expert":
        return "danger";
      default:
        return "secondary";
    }
  }, [course?.difficulty]);

  const stats = useMemo(
    () => [
      { label: "Lessons", value: course?.lessonsCount ?? 0, icon: BookOpen },
      { label: "Quizzes", value: course?.quizzesCount ?? 0, icon: ClipboardCheck },
      { label: "Students", value: course?.enrollsCount ?? 0, icon: Users },
      { label: "Bookmarks", value: course?.bookmarksCount ?? 0, icon: Bookmark },
      {
        label: "Rating",
        value: `${course?.averageReview?.toFixed(1)} (${course?.reviewsCount})`,
        icon: Star,
      },
    ],
    [course]
  );

  const refetchAll = useCallback(async () => {
    await Promise.all([courseRefetch(), bookmarkRefetch(), enrollRefetch()]);
  }, [courseRefetch, bookmarkRefetch, enrollRefetch]);

  const handleBookmark = useCallback(() => {
    if (!course) return;

    if (isBookmarked && bookmark) {
      Alert.alert(
        "Remove Bookmark",
        "Are you sure you want to remove this course from bookmarks?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () =>
              deleteBookmark.mutate(
                {
                  bookmarkId: bookmark.id,
                },
                {
                  onSuccess: (data) => {
                    Toast.show({
                      type: "success",
                      text1: "Success",
                      text2: data?.message,
                    });
                  },
                  onError: (error) => {
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: error?.message,
                    });
                  },
                }
              ),
          },
        ]
      );

      return;
    }

    createBookmark.mutate(
      {
        courseId: course.id,
      },
      {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: data?.message,
          });
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message,
          });
        },
      }
    );
  }, [bookmark, course, createBookmark, deleteBookmark, isBookmarked]);

  const handleEnroll = useCallback(() => {
    if (!course) return;

    if (isEnrolled && enroll) {
      Alert.alert("Leave Course", "Are you sure you want to remove this enrollment?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () =>
            deleteEnroll.mutate(
              {
                enrollId: enroll.id,
              },
              {
                onSuccess: (data) => {
                  Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: data?.message,
                  });
                },
                onError: (error) => {
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

      return;
    }

    createEnroll.mutate(
      {
        courseId: course.id,
      },
      {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: data?.message,
          });
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message,
          });
        },
      }
    );
  }, [course, enroll, isEnrolled, createEnroll, deleteEnroll]);

  const handleProtectedRoute = useCallback(
    (path: string) => {
      if (!isEnrolled) {
        Alert.alert(
          "Enrollment Required",
          "Enroll in this course to access lessons, quizzes and submit reviews."
        );

        return;
      }

      router.push(path as never);
    },
    [isEnrolled]
  );

  const handleShare = useCallback(async () => {
    if (!course) return;

    try {
      await Share.share({
        title: course.title,
        message: `${course.title}\n\n${course.description}`,
      });
    } catch {}
  }, [course]);

  if (initialLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (!course) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
          Course not found
        </Text>
        <Button title="Retry" className="mt-4" onPress={refetchAll} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetchAll} />}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp} layout={LinearTransition.springify()}>
          <View className="relative">
            <Image
              source={{ uri: course.thumbnailUrl }}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
              style={{
                width: "100%",
                height: isTablet ? 380 : 280,
              }}
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.85)", "#000"]}
              className="absolute inset-0 justify-end p-5"
            >
              <View className="gap-3">
                <View className="flex-row flex-wrap gap-2">
                  <Badge label={course.category.name} />
                  <Badge label={course.difficulty} variant={difficultyVariant} />
                  <Badge label={course.duration} variant="secondary" />
                  {course.aiGenerated && <Badge label="AI-Generated" variant="primary" />}
                </View>
                <Text className="text-3xl font-bold text-white">
                  {course.title.charAt(0).toUpperCase() + course.title.slice(1)}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
        <View className="gap-5 p-4">
          <Animated.View entering={FadeInDown.delay(100)}>
            <Card>
              <View className="gap-3">
                <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
                  About This Course
                </Text>
                <Text className="leading-6 text-neutral-600 dark:text-neutral-300">
                  {course.description.charAt(0).toUpperCase() +
                    course.description.slice(1)}
                </Text>
              </View>
            </Card>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(150)}>
            <View className="flex-row flex-wrap gap-3">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.label}
                    style={{
                      width: isTablet ? "23%" : "48%",
                    }}
                  >
                    <View className="items-center gap-2">
                      <Icon size={22} color="#1447e6" />
                      <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {item.value}
                      </Text>
                      <Text className="text-sm text-neutral-500">{item.label}</Text>
                    </View>
                  </Card>
                );
              })}
            </View>
          </Animated.View>
          {isEnrolled && enroll && (
            <Animated.View entering={FadeInDown.delay(200)}>
              <Card>
                <View className="gap-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
                      Your Progress
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      {enroll.finishedLessons}/{course.lessonsCount} lessons
                    </Text>
                  </View>
                  <ProgressBar
                    progress={
                      course.lessonsCount > 0
                        ? parseInt(
                            (
                              (enroll.finishedLessons / course.lessonsCount) *
                              100
                            ).toFixed(2)
                          )
                        : 0
                    }
                    showLabel
                  />
                  {enroll.completed && (
                    <View className="flex-row items-center gap-2">
                      <Badge variant="success" label="Completed" />
                    </View>
                  )}
                  <View className="flex-row justify-between">
                    <Text className="text-xs text-neutral-500">
                      Started:{" "}
                      {enroll.startedAt
                        ? new Date(enroll.startedAt).toLocaleDateString()
                        : "—"}
                    </Text>
                    <Text className="text-xs text-neutral-500">
                      Finished:{" "}
                      {enroll.finishedAt
                        ? new Date(enroll.finishedAt).toLocaleDateString()
                        : "—"}
                    </Text>
                  </View>
                </View>
              </Card>
            </Animated.View>
          )}
          {isEnrolled && (
            <Animated.View entering={FadeInDown.delay(250)}>
              <Button
                size="lg"
                title="Continue Learning"
                leftIcon={<BookOpen size={18} color="#fff" />}
                onPress={() => router.push(`/course/${id}/lessons`)}
              />
            </Animated.View>
          )}
          <Animated.View entering={FadeInDown.delay(300)}>
            <Card>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Reviews
                  </Text>
                  <Text className="text-neutral-500">{course.reviewsCount} reviews</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Star size={22} color="#f59e0b" fill="#f59e0b" />
                  <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {course.averageReview.toFixed(1)} ({course.reviewsCount})
                  </Text>
                </View>
              </View>
            </Card>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(350)}>
            <Card>
              <View className="gap-3">
                <Button
                  title="Lessons"
                  onPress={() => handleProtectedRoute(`/course/${id}/lessons`)}
                />
                <Button
                  title="Quizzes"
                  onPress={() => handleProtectedRoute(`/course/${id}/quizzes`)}
                />
                <Button
                  title="Reviews"
                  variant="outline"
                  onPress={() => router.push(`/course/${id}/reviews`)}
                />
              </View>
            </Card>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(400)}>
            <Card>
              <Button title="Share Course" variant="outline" onPress={handleShare} />
            </Card>
          </Animated.View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
        <View className="flex-row gap-3">
          <Button
            className="flex-1"
            title={isEnrolled ? "Unenroll" : "Enroll"}
            variant={isEnrolled ? "danger" : "success"}
            loading={createEnroll.isPending || deleteEnroll.isPending}
            onPress={handleEnroll}
          />
          <Button
            className="flex-1"
            title={isBookmarked ? "Unsaved" : "Save"}
            variant={isBookmarked ? "secondary" : "outline"}
            loading={createBookmark.isPending || deleteBookmark.isPending}
            onPress={handleBookmark}
          />
        </View>
      </View>
    </View>
  );
};

export default CourseScreen;
