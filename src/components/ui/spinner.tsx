import { memo } from "react";
import { ActivityIndicator, StyleProp, Text, View, ViewStyle } from "react-native";

import { cn } from "@/lib/cn";

interface SpinnerProps {
  size?: "small" | "large";
  color?: string;
  label?: string;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  fullscreen?: boolean;
}

const Spinner = memo(
  ({
    size = "large",
    color = "#6366F1",
    label,
    className,
    textClassName,
    style,
    fullscreen = false,
  }: SpinnerProps) => {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={label ?? "Loading"}
        accessibilityLiveRegion="polite"
        className={cn(
          "items-center justify-center",
          label && "flex-row gap-3",
          fullscreen && "flex-1",
          className
        )}
        style={style}
      >
        <ActivityIndicator size={size} color={color} hidesWhenStopped />
        {label && (
          <Text
            className={cn(
              "text-base font-medium text-neutral-700 dark:text-neutral-300",
              textClassName
            )}
          >
            {label}
          </Text>
        )}
      </View>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
