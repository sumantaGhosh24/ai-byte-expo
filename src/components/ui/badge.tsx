import { memo, ReactNode, useMemo } from "react";
import { Text, View, ViewProps } from "react-native";

import { cn } from "@/lib/cn";

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
} as const;

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
} as const;

interface BadgeProps extends ViewProps {
  label: string;
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof sizeStyles;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  textClassName?: string;
  outline?: boolean;
  numberOfLines?: number;
}

const Badge = memo(
  ({
    label,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    className,
    textClassName,
    outline = true,
    numberOfLines = 1,
    ...props
  }: BadgeProps) => {
    const currentVariant = badgeVariants[variant];
    const currentSize = sizeStyles[size];

    const containerClass = useMemo(
      () =>
        cn(
          "flex-row items-center self-start rounded-full",
          currentSize.container,
          currentSize.gap,
          outline ? currentVariant.soft : currentVariant.solid,
          className
        ),
      [currentSize, currentVariant, outline, className]
    );

    const labelClass = useMemo(
      () =>
        cn(
          "font-semibold tracking-wide",
          currentSize.text,
          outline ? currentVariant.text : currentVariant.solidText,
          textClassName
        ),
      [currentSize, currentVariant, outline, textClassName]
    );

    return (
      <View accessible accessibilityLabel={label} className={containerClass} {...props}>
        {leftIcon}
        <Text numberOfLines={numberOfLines} className={labelClass}>
          {label}
        </Text>
        {rightIcon}
      </View>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
