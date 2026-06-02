import { useMemo, useState } from "react";
import { View, Pressable, useWindowDimensions, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";

import { useUserAchievements } from "@/hooks/use-achievements";
import { useProfile } from "@/hooks/use-profile";
import { AchievementRarity } from "@/types/achievement.type";
import Badge from "@/components/ui/badge";
import AchievementSkeleton from "@/components/achievement/achievement-skeleton";
import AchievementCard from "@/components/achievement/achievement-card";
import AchievementStatsCard from "@/components/achievement/achievement-stats-card";
import FeaturedAchievementCard from "@/components/achievement/featured-achievement-card";

const filters: ("all" | AchievementRarity)[] = [
  "all",
  "legendary",
  "epic",
  "rare",
  "common",
];

const AchievementsScreen = () => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const [filter, setFilter] = useState<"all" | AchievementRarity>("all");

  const { data: user, isLoading: profileLoading } = useProfile();

  const userId = user?.user?.id;

  const { data, isLoading, isRefetching, refetch } = useUserAchievements(userId ?? "");

  const achievements = useMemo(() => data?.achievements ?? [], [data]);

  const filteredAchievements = useMemo(() => {
    if (filter === "all") return achievements;

    return achievements.filter((item) => item.achievement.achievementRarity === filter);
  }, [filter, achievements]);

  const latestAchievement = achievements?.[0];

  if (isLoading || profileLoading) {
    return <AchievementSkeleton />;
  }

  return (
    <FlashList
      data={filteredAchievements}
      numColumns={isTablet ? 3 : 2}
      key={isTablet ? "tablet" : "mobile"}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      ListHeaderComponent={
        <View className="mb-6">
          <Animated.Text
            entering={FadeInUp}
            className="text-3xl font-bold text-neutral-900 dark:text-white"
          >
            All Achievements
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(100)} className="mt-2 text-neutral-500">
            Celebrate your learning milestones.
          </Animated.Text>
          {!!latestAchievement && (
            <Animated.View entering={FadeInDown.delay(200)} className="mt-6">
              <FeaturedAchievementCard achievement={latestAchievement} />
            </Animated.View>
          )}
          <Animated.View entering={FadeInDown.delay(300)} className="mt-4">
            <AchievementStatsCard achievements={achievements} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="mt-6 flex-row flex-wrap gap-2"
          >
            {filters.map((item) => (
              <Pressable key={item} onPress={() => setFilter(item)}>
                <Badge variant={filter === item ? "primary" : "secondary"} label={item} />
              </Pressable>
            ))}
          </Animated.View>
        </View>
      }
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInDown.delay(index * 50)}
          layout={LinearTransition.springify()}
          className="flex-1 p-2"
        >
          <AchievementCard achievement={item} />
        </Animated.View>
      )}
    />
  );
};

export default AchievementsScreen;
