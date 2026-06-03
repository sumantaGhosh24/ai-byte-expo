import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

import Card from "../ui/card";

export const ReviewCardSkeleton = () => {
  return (
    <Card>
      <View className="gap-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 gap-2">
            <Skeleton height={18} width="60%" radius={8} />
            <Skeleton height={12} width="35%" radius={8} />
          </View>
          <Skeleton height={28} width={60} radius={999} />
        </View>
        <View className="gap-2">
          <Skeleton height={14} width="100%" radius={8} />
          <Skeleton height={14} width="95%" radius={8} />
          <Skeleton height={14} width="75%" radius={8} />
        </View>
        <Skeleton height={12} width="30%" radius={8} />
      </View>
    </Card>
  );
};

export const ReviewsSkeleton = () => {
  return (
    <View className="gap-4 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <ReviewCardSkeleton key={index} />
      ))}
    </View>
  );
};
