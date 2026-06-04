import { memo, useCallback } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from "react-native-reanimated";

import { selectionHaptic } from "../../lib/haptic";

interface QuizOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const QuizOption = memo(({ label, selected, onPress }: QuizOptionProps) => {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  const handlePress = useCallback(async () => {
    await selectionHaptic();

    scale.value = withSequence(withSpring(0.97), withSpring(1));

    onPress();
  }, [onPress, scale]);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={style}
        className={`rounded-2xl border p-4 ${
          selected ? "border-primary bg-primary/10" : "border-border dark:border-white"
        }`}
      >
        <Text className="font-medium dark:text-white">{label}</Text>
      </Animated.View>
    </Pressable>
  );
});

QuizOption.displayName = "QuizOption";

export default QuizOption;
