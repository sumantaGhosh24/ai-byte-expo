import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

import Card from "../ui/card";

export const NotificationCardSkeleton = () => {
  return (
    <Card className="mb-3">
      <View className="flex-row gap-4">
        <Skeleton width={48} height={48} radius={16} />
        <View className="flex-1 gap-3">
          <Skeleton width="65%" height={18} radius={8} />
          <Skeleton width="100%" height={14} radius={8} />
          <Skeleton width="80%" height={14} radius={8} />
          <Skeleton width={80} height={12} radius={8} />
        </View>
      </View>
    </Card>
  );
};

export const NotificationsSkeleton = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-2 dark:bg-black">
      <View className="gap-6 px-4 pb-4 pt-2">
        <View className="gap-3">
          <Skeleton width={220} height={34} radius={10} />
          <Skeleton width={260} height={16} radius={8} />
        </View>
        <Card>
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Skeleton width={70} height={14} radius={8} />
              <Skeleton width={50} height={32} radius={8} />
            </View>
            <Skeleton width={130} height={40} radius={16} />
          </View>
        </Card>
        <Skeleton width={180} height={22} radius={8} />
      </View>
      <NotificationCardSkeleton />
      <NotificationCardSkeleton />
      <NotificationCardSkeleton />
      <NotificationCardSkeleton />
      <NotificationCardSkeleton />
    </View>
  );
};
