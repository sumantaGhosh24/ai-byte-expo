import { memo, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { CheckCircle2, Clock3, Layers3, PlayCircle, Sparkles } from "lucide-react-native";

import { LessonItem } from "@/types/lesson.type";

import Card from "../ui/card";
import Badge, { getBadgeIconColor } from "../ui/badge";

interface LessonCardProps {
  lesson: LessonItem;
  onPress?: () => void;
}

const LessonCard = memo(({ lesson, onPress }: LessonCardProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const difficultyVariant = useMemo(() => {
    switch (lesson.difficulty) {
      case "beginner":
        return "success";

      case "intermediate":
        return "warning";

      case "expert":
        return "danger";

      default:
        return "secondary";
    }
  }, [lesson.difficulty]);

  const lessonStatus = useMemo(() => {
    if (lesson.isCompleted) {
      return "completed";
    }

    if (lesson.progress) {
      return "in-progress";
    }

    return "not-started";
  }, [lesson.isCompleted, lesson.progress]);

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
    >
      <Animated.View style={animatedStyle}>
        <Card padding="lg" radius="xl" shadow="sm">
          <View className="flex-row gap-4">
            <View className="relative">
              <Image
                source={{
                  uri:
                    lesson.thumbnailUrl ??
                    "https://res.cloudinary.com/dvgmcfzhe/image/upload/v1780545856/600x400_cvsbr9.png",
                }}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 20,
                }}
              />
              <View className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1">
                <Text className="text-xs font-semibold text-white">
                  #{lesson.orderIndex}
                </Text>
              </View>
            </View>
            <View className="flex-1 gap-3">
              <View className="flex-row flex-wrap gap-2">
                {lessonStatus === "completed" && (
                  <Badge size="sm" label="Completed" variant="success" />
                )}
                {lessonStatus === "in-progress" && (
                  <Badge size="sm" label="In Progress" variant="warning" />
                )}
              </View>
              <Text
                numberOfLines={2}
                className="text-base font-bold text-neutral-900 dark:text-white"
              >
                {lesson.title}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                <Badge
                  size="sm"
                  label={lesson.duration}
                  variant="secondary"
                  leftIcon={<Clock3 size={12} color={getBadgeIconColor("secondary")} />}
                />
                <Badge
                  size="sm"
                  label={lesson.difficulty}
                  variant={difficultyVariant}
                  leftIcon={
                    <Layers3 size={12} color={getBadgeIconColor(difficultyVariant)} />
                  }
                />
                {lesson.aiGenerated && (
                  <Badge
                    size="sm"
                    label="AI"
                    leftIcon={<Sparkles size={12} color={getBadgeIconColor()} />}
                  />
                )}
                {!!lesson.videoUrl && (
                  <Badge
                    size="sm"
                    label="Video"
                    variant="primary"
                    leftIcon={
                      <PlayCircle size={12} color={getBadgeIconColor("primary")} />
                    }
                  />
                )}
              </View>
              <View className="flex-row items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
                <Text className="text-xs text-neutral-500">
                  {lesson.progressCount.toLocaleString()} learners completed
                </Text>
                {lesson.progress?.startedAt && !lesson.isCompleted && (
                  <Text className="text-xs font-medium text-[#1447e6]">Continue →</Text>
                )}
                {lesson.isCompleted && (
                  <View>
                    <CheckCircle2 size={22} color="#22c55e" fill="#74ffa7" />
                  </View>
                )}
              </View>
            </View>
          </View>
        </Card>
      </Animated.View>
    </Pressable>
  );
});

LessonCard.displayName = "LessonCard";

export default LessonCard;
