import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  Bell,
  Award,
  BookOpen,
  ClipboardCheck,
  Clock3,
  Shield,
} from "lucide-react-native";

import { NotificationItem } from "@/types/notification.type";

import Card from "../ui/card";
import Badge from "../ui/badge";

interface NotificationItemCardProps {
  item: NotificationItem;
  onPress: () => void;
}

const getIcon = (type: NotificationItem["type"]) => {
  switch (type) {
    case "achievement":
      return Award;
    case "course":
      return BookOpen;
    case "lesson":
      return BookOpen;
    case "quiz":
      return ClipboardCheck;
    case "reminder":
      return Clock3;
    case "system":
      return Shield;
    default:
      return Bell;
  }
};

const NotificationItemCard = memo(({ item, onPress }: NotificationItemCardProps) => {
  const Icon = getIcon(item.type);

  return (
    <Animated.View entering={FadeInUp.duration(300)} className="px-4 pb-4">
      <Pressable onPress={onPress}>
        <Card className={item.read ? "mb-3" : "mb-3 border-primary/20 bg-primary/5"}>
          <View className="flex-row gap-4">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Icon size={22} color="#1447e6" />
            </View>
            <View className="flex-1">
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="flex-1 font-semibold dark:text-white">{item.title}</Text>
                {!item.read && <Badge label="New" variant="primary" />}
              </View>
              <Text className="text-neutral-500">{item.message}</Text>
              <Text className="mt-3 text-xs text-neutral-400">
                {new Date(item.sentAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </Card>
      </Pressable>
    </Animated.View>
  );
});

NotificationItemCard.displayName = "NotificationItemCard";

export default NotificationItemCard;
