import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

import Card from "@/components/ui/card";

const CourseCardSkeleton = () => {
  return (
    <Card padding="none" radius="xl" shadow="sm" className="overflow-hidden">
      <Skeleton width="100%" height={180} radius={0} />
      <View className="gap-4 p-4">
        <Skeleton width={90} height={28} radius={999} />
        <View className="gap-2">
          <Skeleton width="90%" height={22} radius={8} />
          <Skeleton width="65%" height={22} radius={8} />
        </View>
        <View className="gap-2">
          <Skeleton width="100%" height={14} radius={8} />
          <Skeleton width="85%" height={14} radius={8} />
        </View>
        <View className="flex-row items-center justify-between">
          <Skeleton width={70} height={16} radius={8} />
          <Skeleton width={60} height={16} radius={8} />
          <Skeleton width={50} height={16} radius={8} />
        </View>
        <View className="flex-row items-center justify-between">
          <Skeleton width={80} height={18} radius={8} />
          <Skeleton width={90} height={18} radius={8} />
        </View>
        <Skeleton width="100%" height={48} radius={16} />
      </View>
    </Card>
  );
};

export default CourseCardSkeleton;
