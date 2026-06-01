import { View } from "react-native";
import { Skeleton } from "moti/skeleton";

import Card from "../ui/card";

const ProfileFormSkeleton = () => {
  return (
    <View className="px-4">
      <Card radius="xl" padding="lg">
        <View className="items-center">
          <Skeleton width={112} height={112} radius="round" />
          <View className="mt-4">
            <Skeleton width={140} height={20} />
          </View>
          <View className="mt-2">
            <Skeleton width={100} height={16} />
          </View>
        </View>
      </Card>
      <View className="mt-6 gap-4">
        <Card radius="xl" padding="lg">
          <Skeleton width={120} height={22} />
          <View className="mt-5 gap-4">
            <Skeleton width="100%" height={56} />
            <Skeleton width="100%" height={56} />
            <Skeleton width="100%" height={120} />
          </View>
        </Card>
        <Card radius="xl" padding="lg">
          <Skeleton width={140} height={22} />
          <View className="mt-5 flex-row flex-wrap gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width={120} height={40} radius={999} />
            ))}
          </View>
        </Card>
        <Card radius="xl" padding="lg">
          <Skeleton width="100%" height={56} />
        </Card>
      </View>
    </View>
  );
};

export default ProfileFormSkeleton;
