import { memo, useMemo } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Brain,
  Bookmark,
  BookOpen,
  Flame,
  GraduationCap,
  Trophy,
  Zap,
  LucideIcon,
} from "lucide-react-native";

import { PublicProfileResponse } from "@/types/profile.type";

import Card from "../ui/card";
import ProgressBar from "../ui/progress";

interface XPBreakdownProps {
  xp: PublicProfileResponse["user"]["xp"];
}

const XPBreakdown = memo(({ xp }: XPBreakdownProps) => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const xpItems = useMemo(
    () => [
      {
        title: "Lesson XP",
        value: xp.lessonXP,
        icon: BookOpen,
      },
      {
        title: "Course XP",
        value: xp.courseXP,
        icon: GraduationCap,
      },
      {
        title: "Quiz XP",
        value: xp.quizXP,
        icon: Brain,
      },
      {
        title: "Achievement XP",
        value: xp.achievementXP,
        icon: Trophy,
      },
      {
        title: "Streak XP",
        value: xp.streakXP,
        icon: Flame,
      },
      {
        title: "Bookmark XP",
        value: xp.bookmarkXP,
        icon: Bookmark,
      },
    ],
    [xp]
  );

  return (
    <View className="gap-4">
      <Card radius="xl">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-neutral-500 dark:text-neutral-400">Total XP</Text>
            <Text className="mt-1 text-4xl font-bold dark:text-white">
              {xp.totalXP.toLocaleString()}
            </Text>
          </View>
          <View className="rounded-3xl bg-primary/10 p-4">
            <Zap size={30} color="#1447e6" />
          </View>
        </View>
        <View className="mt-6">
          <ProgressBar progress={(xp.totalXP % 1000) / 10} showLabel />
        </View>
      </Card>
      <Text className="text-lg font-bold dark:text-white">XP Sources</Text>
      <FlashList
        data={xpItems}
        scrollEnabled={false}
        numColumns={isTablet ? 2 : 1}
        renderItem={({
          item,
        }: {
          item: { title: string; value: number; icon: LucideIcon };
        }) => {
          const Icon = item.icon;

          const percentage = (item.value / xp.totalXP) * 100;

          return (
            <Card className="mb-4" radius="xl">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-neutral-500 dark:text-neutral-400">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-2xl font-bold dark:text-white">
                    {item.value}
                  </Text>
                </View>
                <View className="rounded-2xl bg-primary/10 p-3">
                  <Icon size={22} color="#1447e6" />
                </View>
              </View>
              <View className="mt-4">
                <ProgressBar progress={percentage} showLabel={false} />
              </View>
              <Text className="mt-2 text-sm text-neutral-500">
                {percentage.toFixed(1)}% of total XP
              </Text>
            </Card>
          );
        }}
      />
    </View>
  );
});

XPBreakdown.displayName = "XPBreakdown";

export default XPBreakdown;
