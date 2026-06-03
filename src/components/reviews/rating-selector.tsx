import { memo } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Star } from "lucide-react-native";

type RatingSelectorProps = {
  value: number;
  onChange: (rating: number) => void;
};

function RatingStar({ active, onPress }: { active: boolean; onPress: () => void }) {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={() => {
        scale.value = withSpring(1.2, {}, () => {
          scale.value = withSpring(1);
        });

        onPress();
      }}
    >
      <Animated.View style={style}>
        <Star size={32} fill={active ? "#f59e0b" : "transparent"} color="#f59e0b" />
      </Animated.View>
    </Pressable>
  );
}

const RatingSelector = memo(({ value, onChange }: RatingSelectorProps) => {
  return (
    <View className="flex-row gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <RatingStar key={star} active={star <= value} onPress={() => onChange(star)} />
      ))}
    </View>
  );
});

RatingSelector.displayName = "RatingSelector";

export default RatingSelector;
