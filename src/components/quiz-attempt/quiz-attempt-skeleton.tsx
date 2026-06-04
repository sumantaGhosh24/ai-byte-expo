import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

import Card from "../ui/card";

export const QuizAttemptCardSkeleton = () => {
  return (
    <View className="flex-1 p-2">
      <Card shadow="sm" radius="xl">
        <View className="gap-5">
          <View className="flex-row justify-between">
            <View className="flex-1 gap-2">
              <Skeleton width="80%" height={20} radius={8} />
              <Skeleton width={90} height={28} radius={999} />
            </View>
            <View className="items-end gap-2">
              <Skeleton width={28} height={28} radius={14} />
              <Skeleton width={50} height={28} radius={8} />
            </View>
          </View>
          <Skeleton width="100%" height={10} radius={999} />
          <View className="flex-row justify-between">
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} className="items-center gap-2">
                <Skeleton width={18} height={18} radius={9} />
                <Skeleton width={30} height={16} radius={6} />
              </View>
            ))}
          </View>
          <Skeleton width="100%" height={52} radius={16} />
          <Skeleton width="45%" height={14} radius={6} />
          <Skeleton width="100%" height={48} radius={16} />
        </View>
      </Card>
    </View>
  );
};

export const QuizAttemptsSkeleton = () => {
  return (
    <View className="flex-1">
      <View className="gap-5 px-4 py-4">
        <View className="gap-2">
          <View className="h-8 w-52 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <View className="h-4 w-40 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        </View>
        <View className="h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
        <View className="flex-row gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              className="h-9 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800"
            />
          ))}
        </View>
        <View className="h-5 w-28 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </View>
      <View className="px-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <QuizAttemptCardSkeleton key={index} />
        ))}
      </View>
    </View>
  );
};
