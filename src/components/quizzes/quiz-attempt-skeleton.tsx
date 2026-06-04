import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

export const QuizAttemptSkeleton = () => {
  return (
    <View className="flex-1 p-5">
      <Skeleton width="100%" height={70} />
      <View className="mt-6">
        <Skeleton width="100%" height={220} />
      </View>
      <View className="mt-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} width="100%" height={64} />
        ))}
      </View>
    </View>
  );
};
