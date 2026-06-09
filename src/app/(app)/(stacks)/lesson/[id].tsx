import { useCallback, useMemo } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { Image } from "expo-image";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import { BookOpen, CheckCircle2, Clock2, Clock3, Layers3 } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLesson } from "@/hooks/use-lessons";
import { useUpdateProgress } from "@/hooks/use-progresses";
import { useReadingTime } from "@/hooks/use-reading-time";
import Badge, { getBadgeIconColor } from "@/components/ui/badge";
import Button, { getButtonIconColor } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import LessonMarkdown from "@/components/lessons/lesson-markdown";
import LessonVideoPlayer from "@/components/lessons/lesson-video-player";
import { LessonScreenSkeleton } from "@/components/lessons/lesson-screen-skeleton";

const LessonScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const insets = useSafeAreaInsets();

  const {
    data: lessonData,
    isLoading: lessonLoading,
    isRefetching: lessonRefetching,
    refetch: lessonRefetch,
  } = useLesson(id);

  const updateProgress = useUpdateProgress();

  const lesson = lessonData?.lesson;

  const progress = lesson?.progress;

  const isCompleted = progress?.completed ?? false;

  const readingTime = useReadingTime(lesson?.content ?? "");

  const handleComplete = useCallback(() => {
    if (isCompleted) return;

    updateProgress.mutate({
      lessonId: id,
      completed: true,
      finishedAt: new Date().toISOString(),
    });
  }, [isCompleted, updateProgress, id]);

  const difficultyVariant = useMemo(() => {
    switch (lesson?.difficulty) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "expert":
        return "danger";
      default:
        return "secondary";
    }
  }, [lesson?.difficulty]);

  const isRefetching = lessonRefetching;

  const onRefresh = useCallback(async () => {
    await Promise.all([lessonRefetch()]);
  }, [lessonRefetch]);

  if (lessonLoading) {
    return <LessonScreenSkeleton />;
  }

  if (!lesson) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner label="Loading lesson..." />
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        {lesson?.videoUrl ? (
          <Animated.View entering={FadeInUp} layout={LinearTransition}>
            <LessonVideoPlayer
              videoUrl={lesson.videoUrl}
              thumbnailUrl={
                lesson.thumbnailUrl ??
                "https://res.cloudinary.com/dvgmcfzhe/image/upload/v1780545856/600x400_cvsbr9.png"
              }
            />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInUp} layout={LinearTransition}>
            <Image
              source={{
                uri:
                  lesson.thumbnailUrl ??
                  "https://res.cloudinary.com/dvgmcfzhe/image/upload/v1780545856/600x400_cvsbr9.png",
              }}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
              style={{ height: 300, width: "100%", borderRadius: 16 }}
            />
          </Animated.View>
        )}
        <Animated.View
          entering={FadeInDown.delay(100)}
          layout={LinearTransition}
          className="mt-6"
        >
          <Card radius="xl" padding="lg">
            <View className="gap-4">
              <Badge
                label={isCompleted ? "Completed" : "In Progress"}
                variant={isCompleted ? "success" : "warning"}
                leftIcon={
                  <Clock2
                    size={12}
                    color={getBadgeIconColor(isCompleted ? "success" : "warning")}
                  />
                }
              />
              <Text className="text-2xl font-bold dark:text-white">{lesson.title}</Text>
              <Text className="text-muted-foreground dark:text-white">
                {lesson.course.title}
              </Text>
              <View className="flex-row flex-wrap gap-3">
                <Badge
                  label={lesson.difficulty}
                  variant={difficultyVariant}
                  leftIcon={
                    <Layers3 size={12} color={getBadgeIconColor(difficultyVariant)} />
                  }
                />
                <Badge
                  label={`${lesson.duration} min`}
                  variant="secondary"
                  leftIcon={<Clock3 size={14} color={getBadgeIconColor("secondary")} />}
                />
                <Badge
                  label={`${readingTime.minutes} min read`}
                  variant="secondary"
                  leftIcon={<BookOpen size={14} color={getBadgeIconColor("secondary")} />}
                />
                {lesson.aiGenerated && <Badge label="AI Generated" variant="primary" />}
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
            <View className="gap-3">
              <Text className="text-lg font-semibold dark:text-white">
                Lesson Content
              </Text>
              <LessonMarkdown content={lesson.content} />
            </View>
          </Card>
        </Animated.View>
      </ScrollView>
      <Animated.View
        entering={FadeInUp}
        className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950"
      >
        <Button
          title={isCompleted ? "Lesson Completed" : "Complete Lesson"}
          variant={isCompleted ? "success" : "primary"}
          disabled={isCompleted || updateProgress.isPending}
          loading={updateProgress.isPending}
          onPress={handleComplete}
          leftIcon={
            <CheckCircle2
              size={18}
              color={getButtonIconColor(isCompleted ? "success" : "primary")}
            />
          }
        />
        <View style={{ height: insets.bottom > 0 ? insets.bottom : 0 }} />
      </Animated.View>
    </View>
  );
};

export default LessonScreen;
