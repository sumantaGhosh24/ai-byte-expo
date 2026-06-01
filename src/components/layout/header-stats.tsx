import { View, Text } from "react-native";
import { Flame, Trophy } from "lucide-react-native";

import { useUserGamification } from "@/hooks/use-profile";

const HeaderStats = () => {
  const { level, streak } = useUserGamification();

  return (
    <View className="mr-4 flex-row items-center gap-2">
      <View className="flex-row items-center rounded-full bg-orange-100 px-3 py-1 dark:bg-orange-950">
        <Flame size={14} color="#f97316" />
        <Text className="ml-1 text-xs font-semibold text-orange-600">{streak}</Text>
      </View>
      <View className="flex-row items-center rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-950">
        <Trophy size={14} color="#1447e6" />
        <Text className="ml-1 text-xs font-semibold text-blue-600">Lv.{level}</Text>
      </View>
    </View>
  );
};

export default HeaderStats;
