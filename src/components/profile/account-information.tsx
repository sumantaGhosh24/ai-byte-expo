import { memo } from "react";
import { View, Text } from "react-native";
import { Bell, Mail, Target, Brain } from "lucide-react-native";

import { ProfileResponse, PublicProfileResponse } from "@/types/profile.type";

import Badge from "../ui/badge";
import Card from "../ui/card";

interface AccountInformationProps {
  profile: ProfileResponse["user"]["profile"];
  user: PublicProfileResponse["user"]["user"];
  xp: PublicProfileResponse["user"]["xp"];
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text className="text-neutral-500 dark:text-neutral-400">{label}</Text>
      <Text className="mt-1 font-semibold dark:text-white">{value}</Text>
    </View>
  );
}

function SettingRow({ title, enabled }: { title: string; enabled: boolean }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="dark:text-white">{title}</Text>
      <Badge
        label={enabled ? "Enabled" : "Disabled"}
        variant={enabled ? "success" : "secondary"}
      />
    </View>
  );
}

const AccountInformation = memo(({ profile, user, xp }: AccountInformationProps) => {
  return (
    <View className="gap-4">
      <Card radius="xl">
        <Text className="mb-5 text-lg font-bold dark:text-white">
          Account Information
        </Text>
        <View className="gap-4">
          <InfoRow label="Full Name" value={profile?.name ?? "Unknown"} />
          <InfoRow label="Username" value={`@${profile?.username ?? "unknown"}`} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Role" value={user.role} />
          <InfoRow label="Total XP" value={xp.totalXP.toLocaleString()} />
        </View>
      </Card>
      <Card radius="xl">
        <View className="mb-4 flex-row items-center gap-2">
          <Brain size={20} color="#1447e6" />
          <Text className="text-lg font-bold dark:text-white">Interests</Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {profile?.interests?.map((interest: string) => (
            <Badge key={interest} label={interest} variant="primary" />
          ))}
        </View>
      </Card>
      <Card radius="xl">
        <View className="mb-4 flex-row items-center gap-2">
          <Target size={20} color="#1447e6" />
          <Text className="text-lg font-bold dark:text-white">Learning Goals</Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {profile?.goals?.map((goal: string) => (
            <Badge key={goal} label={goal.replaceAll("_", " ")} variant="success" />
          ))}
        </View>
      </Card>
      <Card radius="xl">
        <View className="mb-4 flex-row items-center gap-2">
          <Bell size={20} color="#1447e6" />
          <Text className="text-lg font-bold dark:text-white">Notifications</Text>
        </View>
        <View className="gap-3">
          <SettingRow
            title="Push Notifications"
            enabled={profile?.pushNotificationsEnabled as boolean}
          />
          <SettingRow
            title="Daily Reminder"
            enabled={profile?.dailyReminderEnabled as boolean}
          />
          <SettingRow
            title="Lesson Reminder"
            enabled={profile?.lessonReminderEnabled as boolean}
          />
          <SettingRow
            title="Streak Reminder"
            enabled={profile?.streakReminderEnabled as boolean}
          />
          <SettingRow
            title="Email Notifications"
            enabled={profile?.emailNotificationsEnabled as boolean}
          />
        </View>
      </Card>
      <Card radius="xl">
        <View className="flex-row items-center gap-2">
          <Mail size={20} color="#1447e6" />
          <Text className="font-semibold dark:text-white">Reminder Time</Text>
        </View>
        <Text className="mt-3 text-2xl font-bold capitalize dark:text-white">
          {profile?.dailyReminderTime}
        </Text>
      </Card>
    </View>
  );
});

AccountInformation.displayName = "AccountInformation";

export default AccountInformation;
