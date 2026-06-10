import { memo } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";
import { Star, Tag, Trash2 } from "lucide-react-native";
import { formatDistanceToNowStrict } from "date-fns";

import { ReviewItem } from "@/types/review.type";

import Card from "../ui/card";
import Badge, { getBadgeIconColor } from "../ui/badge";
import Button, { getButtonIconColor } from "../ui/button";

type MyReviewCardProps = {
  review: ReviewItem;
  onDelete: () => void;
};

const MyReviewCard = memo(({ review, onDelete }: MyReviewCardProps) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      layout={LinearTransition.springify()}
      className="px-2 pb-4"
    >
      <Card>
        <View className="gap-4">
          <Image
            source={{
              uri: review.course.thumbnailUrl,
            }}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
            style={{
              width: "100%",
              height: 180,
              borderRadius: 16,
            }}
          />
          <View className="gap-3">
            <Text
              numberOfLines={2}
              className="text-lg font-semibold text-neutral-900 dark:text-white"
            >
              {review.course.title}
            </Text>
            <View className="flex-row items-center justify-between">
              <Badge
                label={review.course.category.name}
                leftIcon={<Tag size={12} color={getBadgeIconColor()} />}
              />
              <View className="flex-row items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    color="#f59e0b"
                    fill={index < review.rating ? "#f59e0b" : "transparent"}
                  />
                ))}
              </View>
            </View>
            <Text className="leading-6 text-neutral-600 dark:text-neutral-300">
              {review.message}
            </Text>
            <Text className="text-xs text-neutral-400">
              {formatDistanceToNowStrict(review.createdAt, { addSuffix: true })}
            </Text>
            <Button
              variant="danger"
              title="Delete Review"
              leftIcon={<Trash2 size={18} color={getButtonIconColor("danger")} />}
              onPress={onDelete}
            />
          </View>
        </View>
      </Card>
    </Animated.View>
  );
});

MyReviewCard.displayName = "MyReviewCard";

export default MyReviewCard;
