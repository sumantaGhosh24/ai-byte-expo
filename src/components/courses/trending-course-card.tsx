import { memo } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";

import { CourseItem } from "@/types/course.type";

import Card from "../ui/card";
import Badge from "../ui/badge";

interface TrendingCourseCardProps {
  course: CourseItem;
}

const TrendingCourseCard = memo(({ course }: TrendingCourseCardProps) => {
  return (
    <Card className="mr-4 w-[300px]" radius="xl" shadow="md">
      <Image
        source={{
          uri: course.thumbnailUrl,
        }}
        style={{ height: 160, width: "100%", borderRadius: 16 }}
        contentFit="cover"
        transition={300}
      />
      <View className="mt-4 gap-2">
        <Badge label={course.category.name} variant="primary" />
        <Text numberOfLines={2} className="text-lg font-bold dark:text-white">
          {course.title}
        </Text>
        <Text className="text-sm text-neutral-500">
          {course.enrollsCount.toLocaleString()} students
        </Text>
      </View>
    </Card>
  );
});

TrendingCourseCard.displayName = "TrendingCourseCard";

export default TrendingCourseCard;
