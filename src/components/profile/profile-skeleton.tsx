import { ScrollView, View } from "react-native";

import Skeleton from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="h-40 bg-neutral-200 dark:bg-neutral-900" />
      <View className="px-4">
        <View className="-mt-16">
          <Skeleton radius={10} width={120} height={120} />
        </View>
        <View className="mt-4">
          <Skeleton width={"60%"} height={30} />
        </View>
        <View className="mt-3">
          <Skeleton width={"40%"} height={18} />
        </View>
        <View className="mt-3">
          <Skeleton width={"90%"} height={16} />
        </View>
        <View className="mt-2">
          <Skeleton width={"75%"} height={16} />
        </View>
        <View className="mt-8">
          <Skeleton width={"100%"} height={170} radius={24} />
        </View>
        <View className="mt-6 flex-row flex-wrap justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} className="mb-4 w-[31%]">
              <Skeleton width={"100%"} height={90} radius={24} />
            </View>
          ))}
        </View>
        <View className="mt-6">
          <Skeleton width={"100%"} height={52} radius={24} />
        </View>
        <View className="mt-6 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} width={"100%"} height={160} radius={24} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSkeleton;
