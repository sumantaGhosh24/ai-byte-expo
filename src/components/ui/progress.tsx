import { memo, useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/lib/cn";

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  height?: number;
  color?: string;
  backgroundColor?: string;
  rounded?: boolean;
  className?: string;
  labelClassName?: string;
}

const ProgressBar = memo(
  ({
    progress,
    showLabel = false,
    height = 12,
    color = "#3B82F6",
    backgroundColor = "#E5E7EB",
    rounded = true,
    className,
    labelClassName,
  }: ProgressBarProps) => {
    const width = useSharedValue(0);

    const pct = Math.max(0, Math.min(100, progress));
    const radius = rounded ? height / 2 : 4;

    useEffect(() => {
      width.value = withTiming(pct, {
        duration: 500,
      });
    }, [pct, width]);

    const animatedStyle = useAnimatedStyle(() => ({
      width: `${width.value}%`,
    }));

    return (
      <View className="w-full gap-2">
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{
            min: 0,
            max: 100,
            now: pct,
          }}
          className={cn("overflow-hidden", className)}
          style={{
            height,
            backgroundColor,
            borderRadius: radius,
          }}
        >
          <Animated.View
            style={[
              animatedStyle,
              {
                height: "100%",
                backgroundColor: color,
                borderRadius: radius,
              },
            ]}
          />
        </View>
        {showLabel && (
          <Text
            className={cn(
              "text-xs font-medium text-neutral-600 dark:text-neutral-300",
              labelClassName
            )}
          >
            {pct}%
          </Text>
        )}
      </View>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
