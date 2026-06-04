import { ScrollView, View } from "react-native";
import { Skeleton } from "moti/skeleton";

export const QuizCardSkeleton = () => {
  return (
    <View className="overflow-hidden rounded-3xl bg-white p-5 dark:bg-neutral-900">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Skeleton width="75%" height={22} radius={8} />
          <View className="mt-3">
            <Skeleton width="100%" height={16} radius={6} />
          </View>
          <View className="mt-2">
            <Skeleton width="80%" height={16} radius={6} />
          </View>
        </View>
        <Skeleton width={48} height={48} radius={16} />
      </View>
      <View className="mt-4 flex-row flex-wrap gap-2">
        <Skeleton width={90} height={26} radius={999} />
        <Skeleton width={120} height={26} radius={999} />
        <Skeleton width={100} height={26} radius={999} />
      </View>
      <View className="mt-5 flex-row items-center justify-between">
        <Skeleton width={90} height={16} radius={6} />
        <Skeleton width={120} height={40} radius={16} />
      </View>
    </View>
  );
};

export const QuizzesScreenSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white dark:bg-neutral-950"
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 120,
      }}
    >
      <View className="mb-4 overflow-hidden rounded-3xl">
        <Skeleton height={220} width="100%" radius={24} />
      </View>
      <View className="mb-6 overflow-hidden rounded-2xl">
        <Skeleton height={52} width="100%" radius={16} />
      </View>
      <View className="mb-6">
        <Skeleton width={90} height={18} radius={6} />
        <View className="mt-3 flex-row flex-wrap gap-2">
          <Skeleton width={70} height={32} radius={999} />
          <Skeleton width={100} height={32} radius={999} />
          <Skeleton width={120} height={32} radius={999} />
          <Skeleton width={80} height={32} radius={999} />
        </View>
      </View>
      <View className="mb-4 flex-row items-center justify-between">
        <Skeleton width={120} height={24} radius={8} />
        <Skeleton width={70} height={16} radius={6} />
      </View>
      {Array.from({ length: 8 }).map((_, index) => (
        <View key={index} className="mb-4">
          <QuizCardSkeleton />
        </View>
      ))}
    </ScrollView>
  );
};
