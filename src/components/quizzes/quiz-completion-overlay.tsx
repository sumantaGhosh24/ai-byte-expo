import { memo } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, ZoomIn } from "react-native-reanimated";
import { CheckCircle2 } from "lucide-react-native";

import Card from "../ui/card";
import Spinner from "../ui/spinner";

const QuizCompletionOverlay = memo(({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className="absolute inset-0 z-50 items-center justify-center bg-black/60"
    >
      <Animated.View entering={ZoomIn.springify()}>
        <Card radius="2xl" padding="2xl" shadow="md" className="items-center gap-4">
          <View className="rounded-full bg-green-100 p-5">
            <CheckCircle2 size={60} color="#22c55e" />
          </View>
          <Text className="text-xl font-bold dark:text-white">Quiz Submitted</Text>
          <Text className="text-muted-foreground text-center dark:text-white">
            Calculating your results...
          </Text>
          <Spinner size="small" />
        </Card>
      </Animated.View>
    </Animated.View>
  );
});

QuizCompletionOverlay.displayName = "QuizCompletionOverlay";

export default QuizCompletionOverlay;
