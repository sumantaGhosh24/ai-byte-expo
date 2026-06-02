import { ScrollView, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import CourseCardSkeleton from "./course-card-skeleton";

const CategorySkeleton = () => {
  return (
    <View className="mr-3">
      <Skeleton width={90} height={36} radius={999} />
    </View>
  );
};

const TrendingCardSkeleton = () => {
  return (
    <View className="mr-4 w-[300px]">
      <Skeleton width={300} height={160} radius={24} />
      <View className="mt-4">
        <Skeleton width={80} height={28} radius={999} />
      </View>
      <View className="mt-3">
        <Skeleton width={220} height={20} radius={8} />
      </View>
      <View className="mt-2">
        <Skeleton width={140} height={16} radius={8} />
      </View>
    </View>
  );
};

const ExploreSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View className="px-4 pb-8 pt-4">
        <Skeleton width={180} height={36} radius={12} />
        <View className="mt-3">
          <Skeleton width={260} height={18} radius={8} />
        </View>
        <View className="mt-6">
          <Skeleton width="100%" height={52} radius={16} />
        </View>
        <View className="mt-6 flex-row gap-3">
          <Skeleton width={100} height={80} radius={24} />
          <Skeleton width={100} height={80} radius={24} />
          <Skeleton width={100} height={80} radius={24} />
        </View>
        <View className="mt-8">
          <Skeleton width={120} height={24} radius={8} />
          <View className="mt-4 flex-row">
            {Array.from({ length: 5 }).map((_, index) => (
              <CategorySkeleton key={index} />
            ))}
          </View>
        </View>
        <View className="mt-8">
          <Skeleton width={180} height={24} radius={8} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <TrendingCardSkeleton key={index} />
            ))}
          </ScrollView>
        </View>
        <View className="mt-8">
          <Skeleton width={220} height={24} radius={8} />
          <View className="mt-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExploreSkeleton;
