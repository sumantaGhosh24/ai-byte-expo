import { memo } from "react";
import { View, Text } from "react-native";

type StatBoxProps = {
  title: string;
  value: number | string;
  success?: boolean;
  danger?: boolean;
};

const StatBox = memo(({ title, value, success, danger }: StatBoxProps) => {
  return (
    <View className="flex-1 rounded-2xl bg-neutral-100 p-4 dark:bg-neutral-900">
      <Text className="text-sm text-neutral-500">{title}</Text>
      <Text
        className={`mt-1 text-2xl font-bold ${
          success ? "text-green-600" : danger ? "text-red-600" : "text-primary"
        }`}
      >
        {value}
      </Text>
    </View>
  );
});

StatBox.displayName = "StatBox";

export default StatBox;
