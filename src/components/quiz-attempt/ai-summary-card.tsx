import { memo } from "react";
import { Text, View } from "react-native";
import { Brain } from "lucide-react-native";

import Card from "../ui/card";

type AISummaryCardProps = {
  strength: string;
  weaknesses: string;
};

const AISummaryCard = memo(({ strength, weaknesses }: AISummaryCardProps) => {
  return (
    <Card padding="lg" radius="xl" shadow="sm" className="mb-5">
      <View className="mb-5 flex-row items-center gap-2">
        <Brain size={20} color="#1447e6" />
        <Text className="text-lg font-semibold dark:text-white">AI Analysis</Text>
      </View>
      <View className="gap-5">
        <View>
          <Text className="mb-2 font-semibold text-green-600">Strengths</Text>
          <Text className="leading-6 text-neutral-600 dark:text-neutral-300">
            {strength}
          </Text>
        </View>
        <View>
          <Text className="mb-2 font-semibold text-red-500">Weaknesses</Text>
          <Text className="leading-6 text-neutral-600 dark:text-neutral-300">
            {weaknesses}
          </Text>
        </View>
      </View>
    </Card>
  );
});

AISummaryCard.displayName = "AISummaryCard";

export default AISummaryCard;
