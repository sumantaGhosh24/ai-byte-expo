import { useEffect } from "react";
import { View, useColorScheme, ViewStyle, DimensionValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  className?: string;
  style?: ViewStyle;
};

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = ({
  width = "100%",
  height = 20,
  radius = 12,
  className,
  style,
}: SkeletonProps) => {
  const colorScheme = useColorScheme();

  const translateX = useSharedValue(-300);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(600, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const baseColor = colorScheme === "dark" ? "rgb(38,38,38)" : "rgb(229,229,229)";

  const highlightColor = colorScheme === "dark" ? "rgb(64,64,64)" : "rgb(245,245,245)";

  return (
    <View
      className={className}
      style={[
        {
          width,
          height,
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: baseColor,
        },
        style,
      ]}
    >
      <AnimatedGradient
        pointerEvents="none"
        colors={["transparent", highlightColor, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "60%",
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default Skeleton;
