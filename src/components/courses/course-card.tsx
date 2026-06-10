import { memo, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  Bookmark,
  BookOpen,
  ClipboardList,
  Clock3,
  Layers3,
  Sparkles,
  Star,
  Tag,
  Users,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";

import { CourseItem } from "@/types/course.type";

import StatItem from "./stat-item";
import Card from "../ui/card";
import Badge, { getBadgeIconColor } from "../ui/badge";
import Button from "../ui/button";
import ProgressBar from "../ui/progress";

interface CourseCardProps {
  course: CourseItem;
}

const CourseCard = memo(({ course }: CourseCardProps) => {
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const difficultyVariant = useMemo(() => {
    switch (course.difficulty) {
      case "beginner":
        return "success";

      case "intermediate":
        return "warning";

      case "expert":
        return "danger";

      default:
        return "secondary";
    }
  }, [course.difficulty]);

  const progress = useMemo(() => {
    if (!course.enrollment || course.lessonsCount === 0) {
      return 0;
    }

    return parseInt(
      ((course.enrollment.finishedLessons / course.lessonsCount) * 100).toFixed(2)
    );
  }, [course.enrollment, course.lessonsCount]);

  return (
    <Animated.View entering={FadeInDown.duration(400)} className="px-4 pb-4">
      <Card padding="none" radius="xl">
        <Pressable
          onPress={() => router.push(`/course/${course.id}`)}
          accessibilityRole="button"
          accessibilityLabel={`Open ${course.title}`}
        >
          <View className="relative">
            <Image
              source={{ uri: course.thumbnailUrl }}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={300}
              style={{
                width: "100%",
                height: 220,
              }}
            />
            {course.isBookmarked && (
              <View className="absolute right-3 top-3 rounded-full bg-white/95 p-2 dark:bg-neutral-900/95">
                <Bookmark size={18} fill="#1447e6" color="#1447e6" />
              </View>
            )}
          </View>
          <View className="gap-4 p-4">
            <View className="flex-row flex-wrap items-center gap-2">
              <Badge
                label={course.category.name}
                leftIcon={<Tag size={12} color={getBadgeIconColor()} />}
              />
              <Badge
                label={course.difficulty}
                variant={difficultyVariant}
                leftIcon={
                  <Layers3 size={12} color={getBadgeIconColor(difficultyVariant)} />
                }
              />
              <Badge
                label={course.duration}
                variant="secondary"
                leftIcon={<Clock3 size={12} color={getBadgeIconColor("secondary")} />}
              />
              {course.isEnrolled && <Badge label="Enrolled" variant="success" />}
              {course.aiGenerated && (
                <Badge
                  label="AI Course"
                  leftIcon={<Sparkles size={12} color={getBadgeIconColor()} />}
                />
              )}
            </View>
            <Text
              numberOfLines={2}
              className="text-xl font-bold text-neutral-900 dark:text-white"
            >
              {course.title.charAt(0).toUpperCase() + course.title.slice(1)}
            </Text>
            <Text numberOfLines={3} className="leading-6 text-neutral-500">
              {course.description.charAt(0).toUpperCase() + course.description.slice(1)}
            </Text>
            {course.enrollment && (
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-medium text-neutral-900 dark:text-white">
                    Learning Progress
                  </Text>
                  <Text className="text-xs text-neutral-500">
                    {course.enrollment.finishedLessons}/{course.lessonsCount} lessons
                  </Text>
                </View>
                <ProgressBar progress={progress} showLabel />
              </View>
            )}
            <View className="flex-row flex-wrap gap-4">
              <StatItem
                icon={<BookOpen size={16} color={isDark ? "white" : "black"} />}
                label={`${course.lessonsCount} Lessons`}
              />
              <StatItem
                icon={<ClipboardList size={16} color={isDark ? "white" : "black"} />}
                label={`${course.quizzesCount} Quizzes`}
              />
              <StatItem
                icon={<Star size={16} color="#f59e0b" fill="#f59e0b" />}
                label={`${course.averageReview.toFixed(1)} (${course.reviewsCount})`}
              />
            </View>
            <View className="flex-row items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
              <View className="flex-row items-center gap-2">
                <Users size={16} color={isDark ? "white" : "black"} />
                <Text className="text-sm text-neutral-500">
                  {course.enrollsCount.toLocaleString()} enrolled
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Bookmark size={16} color={isDark ? "white" : "black"} />
                <Text className="text-sm text-neutral-500">
                  {course.bookmarksCount.toLocaleString()} saved
                </Text>
              </View>
            </View>
            <View className="pt-2">
              {course.isEnrolled ? (
                <View className="rounded-xl bg-primary p-3">
                  <Text className="text-center font-semibold text-white">
                    Continue Learning
                  </Text>
                </View>
              ) : (
                <Button
                  title="View Course"
                  variant="outline"
                  onPress={() => router.push(`/course/${course.id}`)}
                />
              )}
            </View>
          </View>
        </Pressable>
      </Card>
    </Animated.View>
  );
});

CourseCard.displayName = "CourseCard";

export default CourseCard;
