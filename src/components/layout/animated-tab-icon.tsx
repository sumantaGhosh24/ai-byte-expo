import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

interface AnimatedTabIconsProps {
  focused: boolean;
  children: React.ReactNode;
}

const AnimatedTabIcon = ({ focused, children }: AnimatedTabIconsProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(focused ? 1.15 : 1),
        },
      ],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default AnimatedTabIcon;
