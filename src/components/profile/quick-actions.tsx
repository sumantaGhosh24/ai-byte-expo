import { memo, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  BookOpen,
  Bookmark,
  Trophy,
  Star,
  Brain,
  Settings,
  User,
} from "lucide-react-native";

import Card from "../ui/card";

const actions = [
  { title: "My Courses", icon: BookOpen, route: "/my-courses" },
  { title: "Bookmarks", icon: Bookmark, route: "/bookmarks" },
  { title: "Reviews", icon: Star, route: "/my-reviews" },
  { title: "Quiz Attempts", icon: Brain, route: "/my-quiz-attempts" },
  { title: "Achievements", icon: Trophy, route: "/achievements" },
  { title: "Update", icon: User, route: "/settings/account" },
  { title: "Preferences", icon: Settings, route: "/settings/preferences" },
];

function ActionItem({ title, route, icon: Icon }: any) {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = useCallback(() => {
    router.push(route as never);
  }, [route]);

  return (
    <Animated.View style={style}>
      <Pressable onPress={handlePress} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Card className="items-center justify-center" radius="xl">
          <View className="rounded-2xl bg-primary/10 p-3">
            <Icon size={22} color="#1447e6" />
          </View>
          <Text className="mt-3 text-center font-medium dark:text-white">{title}</Text>
        </Card>
      </Pressable>
    </Animated.View>
  );
}

const QuickActions = memo(() => {
  return (
    <View className="mt-6">
      <Text className="mb-4 text-lg font-semibold dark:text-white">Quick Actions</Text>
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {actions.map((item) => (
          <View key={item.title} className="w-[31%]">
            <ActionItem {...item} />
          </View>
        ))}
      </View>
    </View>
  );
});

QuickActions.displayName = "QuickActions";

export default QuickActions;
