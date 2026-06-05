import { memo } from "react";
import { Text, View } from "react-native";
import { User } from "lucide-react-native";

import { QuizAttemptDetails } from "@/types/quiz-attempt.type";

import Card from "../ui/card";

type UserCardProps = {
  attempt: QuizAttemptDetails;
};

const UserCard = memo(({ attempt }: UserCardProps) => {
  return (
    <Card padding="lg" radius="xl" shadow="sm">
      <View className="flex-row items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <User size={24} color="#1447e6" />
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-neutral-900 dark:text-white">
            {attempt.user.profile?.name ?? "Anonymous User"}
          </Text>
          <Text className="text-neutral-500">{attempt.user.email}</Text>
        </View>
      </View>
    </Card>
  );
});

UserCard.displayName = "UserCard";

export default UserCard;
