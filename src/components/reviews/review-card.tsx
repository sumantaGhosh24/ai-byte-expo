import { memo } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";
import { Star } from "lucide-react-native";
import { formatDistanceToNowStrict } from "date-fns";

import Card from "../ui/card";

import { ReviewItem } from "@/types/review.type";

type ReviewCardProps = {
  review: ReviewItem;
};

const ReviewCard = memo(({ review }: ReviewCardProps) => {
  const profile = review.user.profile;

  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      layout={LinearTransition.springify()}
      className="px-4 pb-4"
    >
      <Card>
        <View className="gap-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 flex-row items-center gap-3">
              <Image
                source={{
                  uri:
                    profile?.avatarUrl ??
                    "https://res.cloudinary.com/dvgmcfzhe/image/upload/v1780288334/149071_k18vcn.png",
                }}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                }}
              />
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="font-semibold text-neutral-900 dark:text-white"
                >
                  {profile?.name ?? "Anonymous"}
                </Text>
                <View className="mt-1 flex-row items-center gap-2">
                  <Text numberOfLines={1} className="text-xs text-neutral-500">
                    @{profile?.username ?? "user"}
                  </Text>
                  <Text className="text-xs text-neutral-400">•</Text>
                  <Text className="text-xs text-neutral-400">
                    {formatDistanceToNowStrict(review.createdAt, { addSuffix: true })}
                  </Text>
                </View>
              </View>
            </View>
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
        </View>
      </Card>
    </Animated.View>
  );
});

ReviewCard.displayName = "ReviewCard";

export default ReviewCard;
