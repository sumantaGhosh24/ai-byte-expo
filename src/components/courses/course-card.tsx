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

interface CourseCardProps {
  course: CourseItem;
}

const CourseCard = memo(({ course }: CourseCardProps) => {
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

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

  return (
    <Animated.View entering={FadeInDown.duration(400)} className="px-4 pb-4">
      <Pressable onPress={() => router.push(`/course/${course.id}`)}>
        <Card padding="none" radius="xl">
          <Image
            source={{ uri: course.thumbnailUrl }}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={300}
            style={{ width: "100%", height: 220 }}
          />
          <View className="gap-4 p-4">
            <View className="flex-row flex-wrap items-center justify-between gap-3">
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
              {course.aiGenerated && (
                <Badge
                  label="AI-Generated"
                  leftIcon={<Sparkles size={12} color={getBadgeIconColor()} />}
                />
              )}
            </View>
            <Text numberOfLines={2} className="text-xl font-bold dark:text-white">
              {course.title.charAt(0).toUpperCase() + course.title.slice(1)}
            </Text>
            <Text numberOfLines={4} className="text-neutral-500">
              {course.description.charAt(0).toUpperCase() + course.description.slice(1)}
            </Text>
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
                icon={<Bookmark size={16} color={isDark ? "white" : "black"} />}
                label={`${course.bookmarksCount} Bookmarks`}
              />
              <StatItem
                icon={<Users size={16} color={isDark ? "white" : "black"} />}
                label={`${course.enrollsCount}`}
              />
              <StatItem
                icon={<Star size={16} color={isDark ? "white" : "black"} />}
                label={`${course.averageReview}(${course.reviewsCount})`}
              />
            </View>
          </View>
        </Card>
      </Pressable>
    </Animated.View>
  );
});

CourseCard.displayName = "CourseCard";

export default CourseCard;
