import { BookOpen } from "lucide-react-native";
import { Text, View } from "react-native";

import Card from "../ui/card";

const EmptyReviews = () => {
  return (
    <View className="px-6 py-20">
      <Card className="items-center gap-4">
        <BookOpen size={48} color="#9ca3af" />
        <Text className="text-xl font-bold dark:text-white">No Reviews Found</Text>
        <Text className="text-center text-neutral-500">Try creating one.</Text>
      </Card>
    </View>
  );
};

export default EmptyReviews;
