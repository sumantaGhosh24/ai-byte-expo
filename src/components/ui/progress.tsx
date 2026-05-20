import { DimensionValue, StyleProp, Text, View, ViewStyle } from "react-native";

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
  style?: StyleProp<ViewStyle>;
}

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

const ProgressBar = ({
  progress,
  showLabel = false,
  height = 12,
  color = "#3B82F6",
  backgroundColor = "#E5E7EB",
  rounded = true,
  className,
  labelClassName,
  style,
}: ProgressBarProps) => {
  const pct = clamp(progress);

  const radius = rounded ? height / 2 : 4;

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
        style={[
          {
            height,
            backgroundColor,
            borderRadius: radius,
          },
          style,
        ]}
      >
        <View
          style={{
            width: `${pct}%` as DimensionValue,
            height: "100%",
            backgroundColor: color,
            borderRadius: radius,
          }}
        />
      </View>
      {showLabel ? (
        <Text
          className={cn(
            "text-xs font-medium text-neutral-600 dark:text-neutral-300",
            labelClassName
          )}
        >
          {pct}%
        </Text>
      ) : null}
    </View>
  );
};

export default ProgressBar;
