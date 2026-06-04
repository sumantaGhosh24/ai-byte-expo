import { BookOpen } from "lucide-react-native";
import { Text, View } from "react-native";

import Card from "../ui/card";

const EmptyLessons = () => {
  return (
    <View className="px-6 py-20">
      <Card className="items-center gap-4">
        <BookOpen size={48} color="#9ca3af" />
        <Text className="text-xl font-bold dark:text-white">No Lessons Found</Text>
        <Text className="text-center text-neutral-500">Try again later.</Text>
      </Card>
    </View>
  );
};

export default EmptyLessons;
