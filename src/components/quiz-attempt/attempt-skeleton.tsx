import { ScrollView, View } from "react-native";
import { Skeleton } from "moti/skeleton";

const QuestionReviewSkeleton = () => {
  return (
    <View className="mt-4 rounded-3xl p-6">
      <View className="flex-row items-center justify-between">
        <Skeleton height={18} width={100} radius={6} />
        <Skeleton height={28} width={90} radius={999} />
      </View>
      <View className="mt-5">
        <Skeleton height={18} width="100%" radius={6} />
      </View>
      <View className="mt-2">
        <Skeleton height={18} width="80%" radius={6} />
      </View>
      <View className="mt-6 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={56} radius={18} />
        ))}
      </View>
      <View className="mt-5">
        <Skeleton height={90} width="100%" radius={20} />
      </View>
    </View>
  );
};

const AttemptSkeleton = () => {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-5 rounded-3xl bg-white p-6 dark:bg-neutral-900">
        <Skeleton height={28} width="70%" radius={8} />
        <View className="mt-3">
          <Skeleton height={16} width="95%" radius={6} />
        </View>
        <View className="mt-2">
          <Skeleton height={16} width="60%" radius={6} />
        </View>
        <View className="mt-6 flex-row justify-between">
          <Skeleton height={28} width={90} radius={999} />
          <Skeleton height={16} width={120} radius={6} />
        </View>
      </View>
      <View className="mb-5 rounded-3xl p-6">
        <Skeleton height={20} width={140} radius={6} />
        <View className="mt-6 items-center">
          <Skeleton height={60} width={120} radius={10} />
        </View>
        <View className="mt-2 items-center">
          <Skeleton height={16} width={100} radius={6} />
        </View>
        <View className="mt-6">
          <Skeleton height={12} width="100%" radius={999} />
        </View>
        <View className="mt-6 flex-row gap-3">
          <Skeleton height={90} width="48%" radius={20} />
          <Skeleton height={90} width="48%" radius={20} />
        </View>
      </View>
      <View className="mb-5 rounded-3xl p-6">
        <Skeleton height={20} width={140} radius={6} />
        <View className="mt-5">
          <Skeleton height={16} width={100} radius={6} />
          <View className="mt-3">
            <Skeleton height={14} width="100%" radius={6} />
          </View>
          <View className="mt-2">
            <Skeleton height={14} width="90%" radius={6} />
          </View>
        </View>
        <View className="mt-6">
          <Skeleton height={16} width={120} radius={6} />
          <View className="mt-3">
            <Skeleton height={14} width="100%" radius={6} />
          </View>
          <View className="mt-2">
            <Skeleton height={14} width="85%" radius={6} />
          </View>
        </View>
      </View>
      <View className="mb-8 rounded-3xl p-6">
        <View className="flex-row items-center">
          <Skeleton height={56} width={56} radius={999} />
          <View className="ml-4 flex-1">
            <Skeleton height={18} width="55%" radius={6} />
            <View className="mt-2">
              <Skeleton height={14} width="80%" radius={6} />
            </View>
          </View>
        </View>
      </View>
      <Skeleton height={24} width={180} radius={6} />
      {Array.from({ length: 4 }).map((_, index) => (
        <QuestionReviewSkeleton key={index} />
      ))}
    </ScrollView>
  );
};

export default AttemptSkeleton;
