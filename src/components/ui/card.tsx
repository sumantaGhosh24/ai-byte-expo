import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

import { cn } from "@/lib/cn";

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
  shadow?: boolean;
  bordered?: boolean;
  padding?: number;
  radius?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const radiusStyles = {
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-[32px]",
};

const paddingStyles = {
  0: "p-0",
  8: "p-2",
  12: "p-3",
  16: "p-4",
  20: "p-5",
  24: "p-6",
};

const Card = ({
  children,
  className,
  shadow = true,
  bordered = true,
  padding = 16,
  radius = "lg",
  ...props
}: CardProps) => {
  return (
    <View
      className={cn(
        "w-full bg-white dark:bg-neutral-900",
        radiusStyles[radius],
        bordered && "border border-neutral-200 dark:border-neutral-800",
        shadow && "shadow-sm shadow-black/10 dark:shadow-black/40",
        paddingStyles[padding as keyof typeof paddingStyles],
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
