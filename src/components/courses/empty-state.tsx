import { BookOpen } from "lucide-react-native";
import { Text, View } from "react-native";

import Card from "../ui/card";
import Button from "../ui/button";

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState = ({ onReset }: EmptyStateProps) => {
  return (
    <View className="px-6 py-20">
      <Card className="items-center gap-4">
        <BookOpen size={48} color="#9ca3af" />
        <Text className="text-xl font-bold">No Courses Found</Text>
        <Text className="text-center text-neutral-500">Try changing filters.</Text>
        <Button title="Reset Filters" onPress={onReset} />
      </Card>
    </View>
  );
};

export default EmptyState;
