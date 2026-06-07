import { View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "../ui/card";
import Skeleton from "../ui/skeleton";

export default function OnboardingSkeleton() {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
      <View className={`flex-1 px-5 py-8 ${isTablet ? "mx-auto w-full max-w-3xl" : ""}`}>
        <View className="mb-8 flex-row items-start justify-between">
          <View className="flex-1 gap-3">
            <Skeleton height={34} width="75%" radius={16} />
            <Skeleton height={16} width="55%" radius={10} />
          </View>
          <Skeleton height={42} width={42} radius={999} />
        </View>
        <Card radius="xl" padding="lg">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Skeleton height={18} width={120} radius={10} />
              <Skeleton height={28} width={60} radius={999} />
            </View>
            <Skeleton height={10} width="100%" radius={999} />
            <Skeleton height={14} width="80%" radius={10} />
          </View>
        </Card>
        <View className="mt-6 gap-6">
          <Card radius="xl" padding="lg">
            <View className="gap-4">
              <Skeleton height={24} width={120} radius={12} />
              <View className="flex-row flex-wrap gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={`interest-${index}`}
                    height={40}
                    width={110}
                    radius={999}
                  />
                ))}
              </View>
            </View>
          </Card>
          <Card radius="xl" padding="lg">
            <View className="gap-4">
              <Skeleton height={24} width={150} radius={12} />
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={`goal-${index}`} height={72} width="100%" radius={24} />
              ))}
            </View>
          </Card>
          <Card radius="xl" padding="lg">
            <View className="gap-4">
              <Skeleton height={24} width={140} radius={12} />

              <View className="flex-row flex-wrap gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={`time-${index}`} height={40} width={100} radius={999} />
                ))}
              </View>
            </View>
          </Card>
          <Card radius="xl" padding="lg">
            <View className="gap-4">
              <Skeleton height={24} width={140} radius={12} />
              {Array.from({ length: 5 }).map((_, index) => (
                <View
                  key={`notification-${index}`}
                  className="flex-row items-center justify-between rounded-3xl border border-neutral-200 p-5 dark:border-neutral-800"
                >
                  <View className="flex-1 gap-2">
                    <Skeleton height={18} width="50%" radius={10} />
                    <Skeleton height={14} width="75%" radius={10} />
                  </View>
                  <Skeleton height={30} width={52} radius={999} />
                </View>
              ))}
            </View>
          </Card>
        </View>
        <View className="mt-8">
          <Skeleton height={56} width="100%" radius={24} />
        </View>
      </View>
    </SafeAreaView>
  );
}
