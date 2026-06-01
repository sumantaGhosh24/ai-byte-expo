import { memo } from "react";
import { View, Pressable, Text, useWindowDimensions } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

import { ProfileResponse, PublicProfileResponse } from "@/types/profile.type";

import AccountInformation from "./account-information";
import XPBreakdown from "./xp-breakdown";
import UserActivity from "./user-activity";
import QuizPerformance from "./quiz-performance";

type Tab = "overview" | "xp" | "activity";

interface ProfileTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  stats: PublicProfileResponse["user"]["stats"];
  xp: PublicProfileResponse["user"]["xp"];
  profile: ProfileResponse["user"]["profile"];
  user: PublicProfileResponse["user"]["user"];
  publicData: PublicProfileResponse["user"];
}

const tabs: {
  label: string;
  value: Tab;
}[] = [
  {
    label: "Overview",
    value: "overview",
  },
  {
    label: "XP",
    value: "xp",
  },
  {
    label: "Activity",
    value: "activity",
  },
];

const ProfileTabs = memo(
  ({
    activeTab,
    onTabChange,
    stats,
    xp,
    profile,
    user,
    publicData,
  }: ProfileTabsProps) => {
    const { width } = useWindowDimensions();

    const isTablet = width >= 768;

    return (
      <View className="mt-8">
        <View className="rounded-3xl bg-neutral-100 p-1 dark:bg-neutral-900">
          <View className="flex-row">
            {tabs.map((tab) => {
              const active = activeTab === tab.value;

              return (
                <Pressable
                  key={tab.value}
                  onPress={() => onTabChange(tab.value)}
                  className="flex-1"
                >
                  <View className="relative items-center py-3">
                    {active && (
                      <Animated.View
                        layout={FadeIn.duration(200)}
                        className="absolute inset-0 rounded-2xl bg-white dark:bg-neutral-800"
                      />
                    )}
                    <Text
                      className={`z-10 font-semibold ${
                        active ? "text-primary" : "text-neutral-500"
                      }`}
                    >
                      {tab.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Animated.View entering={FadeIn.duration(200)} className="mt-6">
          {activeTab === "overview" && (
            <Animated.View entering={FadeInUp.duration(250)}>
              <View className={isTablet ? "flex-row gap-4" : "gap-4"}>
                <View className="flex-1">
                  <QuizPerformance stats={stats} />
                </View>
                <View className="flex-1">
                  <UserActivity publicData={publicData} stats={stats} />
                </View>
              </View>
            </Animated.View>
          )}
          {activeTab === "xp" && (
            <Animated.View entering={FadeInUp.duration(250)}>
              <XPBreakdown xp={xp} />
            </Animated.View>
          )}
          {activeTab === "activity" && (
            <Animated.View entering={FadeInUp.duration(250)}>
              <AccountInformation profile={profile} user={user} xp={xp} />
            </Animated.View>
          )}
        </Animated.View>
      </View>
    );
  }
);

ProfileTabs.displayName = "ProfileTabs";

export default ProfileTabs;
