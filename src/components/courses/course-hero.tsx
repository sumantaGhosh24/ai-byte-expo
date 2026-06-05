import { memo } from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { Layers3, Sparkles, Tag } from "lucide-react-native";

import { CourseItem } from "@/types/course.type";

import Card from "../ui/card";
import Badge, { getBadgeIconColor } from "../ui/badge";

interface CourseHeroProps {
  course: CourseItem;
}

const CourseHero = memo(({ course }: CourseHeroProps) => {
  return (
    <Card radius="xl" padding="none" shadow="md">
      <Image
        source={{
          uri: course.thumbnailUrl,
        }}
        contentFit="cover"
        transition={300}
        style={{
          height: 220,
          width: "100%",
        }}
      />
      <View className="gap-4 p-5">
        <View className="flex-row flex-wrap gap-2">
          <Badge
            label={course.category.name}
            leftIcon={<Tag size={12} color={getBadgeIconColor()} />}
          />
          <Badge
            label={course.difficulty}
            variant="secondary"
            leftIcon={<Layers3 size={12} color={getBadgeIconColor("secondary")} />}
          />
          {course?.aiGenerated && (
            <Badge
              label="AI Generated"
              leftIcon={<Sparkles size={12} color={getBadgeIconColor()} />}
            />
          )}
        </View>
        <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
          {course.title.charAt(0).toUpperCase() + course.title.slice(1)}
        </Text>
        <Text numberOfLines={4} className="text-neutral-500">
          {course.description.charAt(0).toUpperCase() + course.description.slice(1)}
        </Text>
        <View className="flex-row gap-4">
          <Text className="text-neutral-500">📚 {course.lessonsCount}</Text>
          <Text className="text-neutral-500">
            ⭐ {course.averageReview.toFixed(1)} ({course.reviewsCount})
          </Text>
          <Text className="text-neutral-500">👨‍🎓 {course.enrollsCount}</Text>
        </View>
      </View>
    </Card>
  );
});

CourseHero.displayName = "CourseHero";

export default CourseHero;
