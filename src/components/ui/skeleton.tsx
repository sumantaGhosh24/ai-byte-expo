import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";

import { cn } from "@/lib/cn";

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: "sm" | "md" | "lg" | "full";
  className?: string;
  style?: StyleProp<ViewStyle>;
  animated?: boolean;
}

const radiusStyles = {
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
};

const Skeleton = ({
  width = "100%",
  height = 20,
  radius = "md",
  className,
  style,
  animated = true,
}: SkeletonProps) => {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      pointerEvents="none"
      className={cn(
        "overflow-hidden bg-neutral-200 dark:bg-neutral-800",
        animated && "animate-pulse",
        radiusStyles[radius],
        className
      )}
      style={[
        {
          width,
          height,
        },
        style,
      ]}
    />
  );
};

export default Skeleton;
