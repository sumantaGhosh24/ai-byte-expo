import { memo, ReactNode } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Award, BookOpen, CheckCircle2, Flame } from "lucide-react-native";

import { PublicProfileResponse } from "@/types/profile.type";

import Card from "../ui/card";
import Badge from "../ui/badge";

interface UserActivityProps {
  publicData: PublicProfileResponse["user"];
  stats: PublicProfileResponse["user"]["stats"];
}

function ActivityItem({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <View className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <View className="flex-row gap-3">
        {icon}
        <View className="flex-1">
          <Text className="font-semibold dark:text-white">{title}</Text>
          <Text className="mt-1 text-neutral-500 dark:text-neutral-400">{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

const UserActivity = memo(({ publicData, stats }: UserActivityProps) => {
  const lastEnroll = publicData?.lastEnroll;
  const lastProgress = publicData?.lastProgress;

  return (
    <View className="gap-4">
      <Card radius="xl" shadow="sm">
        <Text className="mb-4 text-lg font-bold dark:text-white">Recent Activity</Text>
        <View className="gap-4">
          {lastEnroll?.course && (
            <ActivityItem
              icon={
                <View className="rounded-xl bg-primary/10 p-2">
                  <BookOpen size={20} color="#1447e6" />
                </View>
              }
              title={lastEnroll.course.title}
              subtitle={`${lastEnroll.finishedLessons} lessons completed`}
            />
          )}
          {lastProgress?.lesson && (
            <ActivityItem
              icon={
                <View className="rounded-xl bg-primary/10 p-2">
                  <CheckCircle2 size={20} color="#1447e6" />
                </View>
              }
              title={lastProgress.lesson.title}
              subtitle={`${lastProgress.lesson.duration} completed`}
            />
          )}
        </View>
      </Card>
      <Card radius="xl" shadow="sm">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold dark:text-white">Learning Streak</Text>
            <Text className="text-neutral-500 dark:text-neutral-400">Keep it going</Text>
          </View>
          <Flame size={26} color="#f97316" />
        </View>
        <Text className="mt-4 text-4xl font-bold text-orange-500">
          {stats.currentStreak}
        </Text>
        <Text className="text-neutral-500 dark:text-neutral-400">Current Days</Text>
        <View className="mt-5 rounded-2xl bg-orange-50 p-4 dark:bg-orange-950">
          <Text className="font-semibold text-orange-600">
            Best Streak: {stats.longestStreak} Days
          </Text>
        </View>
      </Card>
      <Card radius="xl" shadow="sm">
        <View className="flex-row items-center gap-3">
          <Award size={24} color="#eab308" />
          <View>
            <Text className="font-bold dark:text-white">Achievements</Text>
            <Text className="text-neutral-500 dark:text-neutral-400">
              Unlocked rewards
            </Text>
          </View>
        </View>
        <View className="mt-4">
          <Badge label={`${stats.achievementsCount} Achievements`} variant="success" />
        </View>
      </Card>
      {!!lastEnroll?.course?.thumbnailUrl && (
        <Card radius="xl" padding="none" className="overflow-hidden">
          <Image
            source={{
              uri: lastEnroll.course.thumbnailUrl,
            }}
            style={{
              width: "100%",
              height: 180,
            }}
            contentFit="cover"
          />
          <View className="p-4">
            <Text className="font-bold dark:text-white">{lastEnroll.course.title}</Text>
            <Text className="mt-2 text-neutral-500 dark:text-neutral-400">
              Continue where you left off
            </Text>
          </View>
        </Card>
      )}
    </View>
  );
});

UserActivity.displayName = "UserActivity";

export default UserActivity;
