import { View } from "react-native";

import Skeleton from "../ui/skeleton";

const AchievementSkeleton = () => {
  return (
    <View className="flex-1 px-5 pt-5">
      <Skeleton width={180} height={30} />
      <View className="mt-6">
        <Skeleton width="100%" height={140} radius={24} />
      </View>
      <View className="mt-6 flex-row flex-wrap gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} width={160} height={220} radius={24} />
        ))}
      </View>
    </View>
  );
};

export default AchievementSkeleton;
