import { memo, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Bookmark, Layers3, Sparkles, Star, Tag, Users } from "lucide-react-native";

import { CourseItem } from "@/types/course.type";

import Card from "../ui/card";
import Badge, { getBadgeIconColor } from "../ui/badge";

interface TrendingCourseCardProps {
  course: CourseItem;
}

const TrendingCourseCard = memo(({ course }: TrendingCourseCardProps) => {
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

  return (
    <Animated.View entering={FadeInRight.duration(400)} className="mr-4">
      <Pressable
        onPress={() => router.push(`/course/${course.id}`)}
        accessibilityRole="button"
        accessibilityLabel={`Open ${course.title}`}
      >
        <Card className="h-[450px] w-[300px]" radius="xl" shadow="md" padding="none">
          <View className="relative">
            <Image
              source={{
                uri: course.thumbnailUrl,
              }}
              style={{
                height: 180,
                width: "100%",
              }}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
            />
            {course.isBookmarked && (
              <View className="absolute right-3 top-3 rounded-full bg-white/95 p-2 dark:bg-neutral-900/95">
                <Bookmark size={16} fill="#1447e6" color="#1447e6" />
              </View>
            )}
          </View>
          <View className="flex-1 gap-3 p-4">
            <View className="min-h-[56px] flex-row flex-wrap gap-2">
              <Badge
                label={course.category.name}
                leftIcon={<Tag size={12} color={getBadgeIconColor()} />}
              />
              {course.isEnrolled && <Badge label="Continue Learning" variant="success" />}
              {course.aiGenerated && (
                <Badge
                  label="AI"
                  leftIcon={<Sparkles size={12} color={getBadgeIconColor()} />}
                />
              )}
              <Badge
                label={course.difficulty}
                variant={difficultyVariant}
                leftIcon={
                  <Layers3 size={12} color={getBadgeIconColor(difficultyVariant)} />
                }
              />
            </View>
            <Text
              numberOfLines={2}
              className="text-lg font-bold text-neutral-900 dark:text-white"
            >
              {course.title.charAt(0).toUpperCase() + course.title.slice(1)}
            </Text>
            <Text numberOfLines={2} className="text-sm text-neutral-500">
              {course.description.charAt(0).toUpperCase() + course.description.slice(1)}
            </Text>
            <View className="mt-auto flex-row items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
              <View className="flex-row items-center gap-1">
                <Users size={14} color="#737373" />
                <Text className="text-xs text-neutral-500">
                  {course.enrollsCount.toLocaleString()}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <Text className="text-xs text-neutral-500">
                  {course.averageReview.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>
    </Animated.View>
  );
});

TrendingCourseCard.displayName = "TrendingCourseCard";

export default TrendingCourseCard;
