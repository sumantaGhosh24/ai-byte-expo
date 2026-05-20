import { ReactNode } from "react";
import { Text, View, ViewProps } from "react-native";

import { cn } from "@/lib/cn";

interface BadgeProps extends ViewProps {
  label: string;
  variant?: "primary" | "success" | "warning" | "danger" | "secondary";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  textClassName?: string;
  outline?: boolean;
}

const badgeVariants = {
  primary: {
    solid: "bg-primary",
    soft: "bg-primary/10 border border-primary/20",
    text: "text-primary",
    solidText: "text-white",
  },
  success: {
    solid: "bg-green-500",
    soft: "bg-green-500/10 border border-green-500/20",
    text: "text-green-600",
    solidText: "text-white",
  },
  warning: {
    solid: "bg-amber-500",
    soft: "bg-amber-500/10 border border-amber-500/20",
    text: "text-amber-600",
    solidText: "text-white",
  },
  danger: {
    solid: "bg-red-500",
    soft: "bg-red-500/10 border border-red-500/20",
    text: "text-red-600",
    solidText: "text-white",
  },
  secondary: {
    solid: "bg-neutral-800",
    soft: "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700",
    text: "text-neutral-700 dark:text-neutral-300",
    solidText: "text-white",
  },
};

const sizeStyles = {
  sm: {
    container: "px-2 py-1",
    text: "text-[10px]",
    gap: "gap-1",
  },
  md: {
    container: "px-3 py-1.5",
    text: "text-xs",
    gap: "gap-1.5",
  },
  lg: {
    container: "px-4 py-2",
    text: "text-sm",
    gap: "gap-2",
  },
};

const Badge = ({
  label,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  textClassName,
  outline = true,
  ...props
}: BadgeProps) => {
  const currentVariant = badgeVariants[variant];
  const currentSize = sizeStyles[size];

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={label}
      className={cn(
        "flex-row items-center self-start rounded-full",
        currentSize.container,
        currentSize.gap,
        outline ? currentVariant.soft : currentVariant.solid,
        className
      )}
      {...props}
    >
      {leftIcon}
      <Text
        numberOfLines={1}
        className={cn(
          "font-semibold tracking-wide",
          currentSize.text,
          outline ? currentVariant.text : currentVariant.solidText,
          textClassName
        )}
      >
        {label}
      </Text>
      {rightIcon}
    </View>
  );
};

export default Badge;
