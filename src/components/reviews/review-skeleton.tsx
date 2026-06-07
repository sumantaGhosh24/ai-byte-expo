import { View } from "react-native";

import Card from "../ui/card";
import Skeleton from "../ui/skeleton";

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

export const MyReviewCardSkeleton = () => {
  return (
    <Card>
      <View className="gap-4">
        <Skeleton height={180} width="100%" radius={16} />
        <View className="gap-2">
          <Skeleton height={20} width="80%" radius={8} />
          <Skeleton height={20} width="55%" radius={8} />
        </View>
        <View className="flex-row items-center justify-between">
          <Skeleton height={28} width={90} radius={999} />
          <Skeleton height={20} width={40} radius={8} />
        </View>
        <View className="gap-2">
          <Skeleton height={14} width="100%" radius={8} />
          <Skeleton height={14} width="95%" radius={8} />
          <Skeleton height={14} width="70%" radius={8} />
        </View>
        <Skeleton height={12} width="35%" radius={8} />
        <Skeleton height={48} width="100%" radius={16} />
      </View>
    </Card>
  );
};

export const MyReviewsSkeleton = () => {
  return (
    <View className="gap-4 p-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <MyReviewCardSkeleton key={index} />
      ))}
    </View>
  );
};
