import { ScrollView, View } from "react-native";

import Skeleton from "../ui/skeleton";

const CourseDetailsSkeleton = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 dark:bg-neutral-950">
      <Skeleton width="100%" height={240} />
      <View className="gap-4 p-4">
        <Skeleton width="40%" height={24} />
        <Skeleton width="90%" height={24} />
        <Skeleton width="100%" height={80} />
        <View className="flex-row flex-wrap gap-3">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} width={150} height={100} />
          ))}
        </View>
        <Skeleton width="100%" height={52} />
        <Skeleton width="100%" height={52} />
        <Skeleton width="100%" height={52} />
      </View>
    </ScrollView>
  );
};

export default CourseDetailsSkeleton;
