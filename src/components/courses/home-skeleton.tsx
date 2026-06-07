import { View } from "react-native";

import CourseCardSkeleton from "./course-card-skeleton";
import Skeleton from "../ui/skeleton";

const CategorySkeleton = () => <Skeleton width={90} height={36} radius={999} />;

const HomeSkeleton = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-2 dark:bg-black">
      <View className="gap-2">
        <Skeleton width={220} height={34} />
        <Skeleton width={180} height={18} />
      </View>
      <View className="mt-6">
        <Skeleton width="100%" height={52} radius={16} />
      </View>
      <View className="mt-6 flex-row gap-3">
        <Skeleton width={100} height={80} radius={20} />
        <Skeleton width={100} height={80} radius={20} />
        <Skeleton width={100} height={80} radius={20} />
      </View>
      <View className="mt-8">
        <Skeleton width={100} height={24} />
        <View className="mt-4 flex-row gap-3">
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
        </View>
      </View>
      <View className="mt-8 flex-row items-center justify-between">
        <Skeleton width={140} height={24} />
        <Skeleton width={90} height={36} radius={16} />
      </View>
      <View className="mt-4 gap-4">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </View>
    </View>
  );
};

export default HomeSkeleton;
