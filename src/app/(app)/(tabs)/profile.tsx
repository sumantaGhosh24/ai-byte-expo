import { useMemo, useState, useCallback } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";

import { useProfile, usePublicProfile } from "@/hooks/use-profile";
import LevelCard from "@/components/profile/level-card";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileSkeleton from "@/components/profile/profile-skeleton";
import ProfileTabs from "@/components/profile/profile-tabs";
import QuickActions from "@/components/profile/quick-actions";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "xp" | "activity">("overview");

  const {
    data: profileData,
    isLoading: profileLoading,
    isRefetching: profileRefetching,
    refetch: profileRefetch,
  } = useProfile();

  const userId = profileData?.user?.id;

  const {
    data: publicData,
    isLoading: publicLoading,
    isRefetching: publicRefetching,
    refetch: publicRefetch,
  } = usePublicProfile(userId ?? "");

  const loading = profileLoading || publicLoading;

  const isRefetching = profileRefetching || publicRefetching;

  const handleRefresh = useCallback(() => {
    profileRefetch();
    publicRefetch();
  }, [profileRefetch, publicRefetch]);

  const profile = profileData?.user?.profile;
  const stats = publicData?.user?.stats;
  const xp = publicData?.user?.xp;

  const level = useMemo(() => Math.floor((xp?.totalXP ?? 0) / 1000) + 1, [xp]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile || !stats || !xp) {
    return null;
  }

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
    >
      <View className="mt-6 px-4">
        <Animated.View entering={FadeInDown.duration(400)}>
          <ProfileHeader
            profile={profile}
            email={profileData?.user?.email ?? ""}
            role={profileData?.user?.role ?? "user"}
            streak={stats.currentStreak}
            level={level}
            totalXP={xp.totalXP}
          />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(100)}>
          <LevelCard
            totalXP={xp.totalXP}
            currentStreak={stats.currentStreak}
            level={level}
          />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200)}>
          <QuickActions />
        </Animated.View>
        <Animated.View
          layout={LinearTransition.springify()}
          entering={FadeInUp.delay(300)}
        >
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            stats={stats}
            xp={xp}
            profile={profile}
            user={profileData.user}
            publicData={publicData.user}
          />
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
