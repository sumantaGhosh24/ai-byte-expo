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

const Spinner = ({
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
      accessibilityLabel={label || "Loading"}
      className={cn(
        "flex-row items-center justify-center gap-3",
        fullscreen && "flex-1",
        className
      )}
      style={style}
    >
      <ActivityIndicator size={size} color={color} />
      {label ? (
        <Text
          className={cn(
            "text-base font-medium text-neutral-700 dark:text-neutral-300",
            textClassName
          )}
        >
          {label}
        </Text>
      ) : null}
    </View>
  );
};

export default Spinner;
