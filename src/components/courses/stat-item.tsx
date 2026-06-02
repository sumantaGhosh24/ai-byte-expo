import { Text, View } from "react-native";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
}

const StatItem = ({ icon, label }: StatItemProps) => {
  return (
    <View className="flex-row items-center gap-2">
      {icon}
      <Text className="text-sm text-neutral-500 dark:text-white">{label}</Text>
    </View>
  );
};

export default StatItem;
