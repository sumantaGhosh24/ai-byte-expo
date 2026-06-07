import { ScrollView, View } from "react-native";

import Skeleton from "../ui/skeleton";

export const LessonCardSkeleton = () => {
  return (
    <View className="overflow-hidden rounded-3xl bg-white p-4 dark:bg-neutral-900">
      <View className="flex-row items-center gap-4">
        <Skeleton width={64} height={64} radius={16} />
        <View className="flex-1">
          <Skeleton width="80%" height={18} radius={6} />
          <View className="mt-3 flex-row flex-wrap gap-2">
            <Skeleton width={70} height={24} radius={999} />
            <Skeleton width={90} height={24} radius={999} />
            <Skeleton width={110} height={24} radius={999} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const LessonsScreenSkeleton = () => {
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
      <View className="mb-4 overflow-hidden rounded-3xl">
        <Skeleton height={120} width="100%" radius={24} />
      </View>
      <View className="mb-6 overflow-hidden rounded-2xl">
        <Skeleton height={52} width="100%" radius={16} />
      </View>
      <View className="mb-4">
        <Skeleton height={24} width={120} radius={8} />
      </View>
      {Array.from({ length: 8 }).map((_, index) => (
        <View key={index} className="mb-4">
          <LessonCardSkeleton />
        </View>
      ))}
    </ScrollView>
  );
};

export const LessonScreenSkeleton = () => {
  return (
    <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
      <Skeleton height={240} width="100%" radius={24} />
      <View className="mt-5 gap-4">
        <Skeleton height={32} width="80%" />
        <Skeleton height={120} width="100%" radius={24} />
        <Skeleton height={400} width="100%" radius={24} />
      </View>
    </ScrollView>
  );
};
