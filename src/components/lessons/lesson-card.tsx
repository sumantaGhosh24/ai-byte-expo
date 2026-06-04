import { memo, useMemo } from "react";
import { Pressable, View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Image } from "expo-image";

import { LessonItem } from "@/types/lesson.type";

import Card from "../ui/card";
import Badge from "../ui/badge";

interface LessonCardProps {
  lesson: LessonItem;
  onPress?: () => void;
}

const LessonCard = memo(({ lesson, onPress }: LessonCardProps) => {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

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

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
    >
      <Animated.View style={style}>
        <Card padding="lg" radius="xl" shadow="sm">
          <View className="flex-row items-center gap-4">
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
                width: 64,
                height: 64,
                borderRadius: 16,
              }}
            />
            <View className="flex-1 gap-2">
              <Text
                numberOfLines={2}
                className="font-semibold text-neutral-900 dark:text-white"
              >
                {lesson.title}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                <Badge size="sm" label={lesson.duration} variant="secondary" />
                <Badge label={lesson.difficulty} variant={difficultyVariant} />
                {lesson.aiGenerated && (
                  <Badge size="sm" label="AI Generated" variant="primary" />
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
