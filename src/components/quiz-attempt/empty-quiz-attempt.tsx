import { Text, View } from "react-native";
import { Brain } from "lucide-react-native";

const EmptyQuizAttempts = () => {
  return (
    <View className="items-center px-8 py-20">
      <Brain size={64} color="#9ca3af" />
      <Text className="mt-5 text-xl font-bold text-neutral-900 dark:text-white">
        No Quiz Attempts Yet
      </Text>
      <Text className="mt-2 text-center text-neutral-500">
        Complete quizzes and track your performance here.
      </Text>
    </View>
  );
};

export default EmptyQuizAttempts;
