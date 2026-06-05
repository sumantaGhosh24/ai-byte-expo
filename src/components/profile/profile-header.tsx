import { memo } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Flame, Shield, Zap } from "lucide-react-native";

import { ProfileResponse } from "@/types/profile.type";

import Badge, { getBadgeIconColor } from "../ui/badge";
import Card from "../ui/card";
import ToggleThemeIcon from "../global/toggle-theme-icon";

interface ProfileHeaderProps {
  profile: ProfileResponse["user"]["profile"];
  email: string;
  role: string;
  streak: number;
  level: number;
  totalXP: number;
}

const ProfileHeader = memo(
  ({ profile, email, role, streak, level, totalXP }: ProfileHeaderProps) => {
    return (
      <Card padding="none" className="overflow-hidden">
        <View className="h-40 bg-primary">
          <View className="absolute right-4 top-14">
            <ToggleThemeIcon />
          </View>
        </View>
        <View className="px-5 pb-5">
          <View className="-mt-16">
            <Image
              source={{
                uri:
                  profile?.avatarUrl ??
                  "https://res.cloudinary.com/dvgmcfzhe/image/upload/v1780288334/149071_k18vcn.png",
              }}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
              style={{
                width: 120,
                height: 120,
                borderRadius: 999,
              }}
            />
          </View>
          <View className="mt-4 gap-2">
            <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
              {profile?.name ?? "Unknown"}
            </Text>
            <Text className="text-neutral-500 dark:text-neutral-400">
              @{profile?.username ?? "unknown"}
            </Text>
            <Text className="text-neutral-500 dark:text-neutral-400">{email}</Text>
            {profile?.bio && (
              <Text className="leading-6 text-neutral-700 dark:text-neutral-300">
                {profile?.bio}
              </Text>
            )}
            <View className="mt-2 flex-row flex-wrap gap-2">
              <Badge
                label={role}
                variant={role === "admin" ? "danger" : "secondary"}
                leftIcon={
                  role === "admin" ? (
                    <Shield
                      size={12}
                      color={getBadgeIconColor(role === "admin" ? "danger" : "secondary")}
                    />
                  ) : undefined
                }
              />
              <Badge
                label={`Level ${level}`}
                leftIcon={<Zap size={12} color={getBadgeIconColor()} />}
              />
              <Badge
                label={`${streak} Day Streak`}
                variant="warning"
                leftIcon={<Flame size={12} color={getBadgeIconColor("warning")} />}
              />
              <Badge label={`${totalXP.toLocaleString()} XP`} variant="success" />
            </View>
          </View>
        </View>
      </Card>
    );
  }
);

ProfileHeader.displayName = "ProfileHeader";

export default ProfileHeader;
