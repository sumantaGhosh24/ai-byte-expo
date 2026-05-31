import { memo, ReactNode, useCallback } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  Text,
  View,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { cn } from "@/lib/cn";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PRESS_SPRING = {
  damping: 18,
  stiffness: 300,
} as const;

const variantStyles = {
  primary: "bg-primary",
  secondary: "bg-neutral-100 border border-neutral-200",
  outline: "border border-primary bg-transparent",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  success: "bg-green-500",
} as const;

const textStyles = {
  primary: "text-white",
  secondary: "text-neutral-900",
  outline: "text-primary",
  warning: "text-white",
  danger: "text-white",
  success: "text-white",
} as const;

const sizeStyles = {
  sm: "min-h-10 px-4",
  md: "min-h-12 px-5",
  lg: "min-h-14 px-6",
} as const;

const spinnerColors = {
  primary: "#FFFFFF",
  secondary: "#171717",
  outline: "#1447e6",
  warning: "#FFFFFF",
  danger: "#FFFFFF",
  success: "#FFFFFF",
} as const;

export interface ButtonProps {
  title?: string;
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  textClassName?: string;
  accessibilityLabel?: string;
  fullWidth?: boolean;
}

const Button = memo(
  ({
    title,
    children,
    onPress,
    loading = false,
    disabled = false,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    className,
    textClassName,
    accessibilityLabel,
    fullWidth = true,
  }: ButtonProps) => {
    const isDisabled = disabled || loading;

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePressIn = useCallback(() => {
      scale.value = withSpring(0.97, PRESS_SPRING);
    }, [scale]);

    const handlePressOut = useCallback(() => {
      scale.value = withSpring(1, PRESS_SPRING);
    }, [scale]);

    return (
      <AnimatedPressable
        onPress={onPress}
        disabled={isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={animatedStyle}
        hitSlop={{
          top: 8,
          bottom: 8,
          left: 8,
          right: 8,
        }}
        android_ripple={{
          borderless: false,
        }}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityState={{
          disabled: isDisabled,
          busy: loading,
        }}
        className={cn(
          "overflow-hidden rounded-xl",
          "flex-row items-center justify-center",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          isDisabled && "opacity-60",
          className
        )}
      >
        {loading ? (
          <ActivityIndicator color={spinnerColors[variant]} />
        ) : (
          <>
            {leftIcon && (
              <View className={cn("items-center justify-center", title && "mr-2")}>
                {leftIcon}
              </View>
            )}
            {children ?? (
              <Text
                numberOfLines={1}
                className={cn(
                  "shrink text-base font-semibold",
                  textStyles[variant],
                  textClassName
                )}
              >
                {title}
              </Text>
            )}
            {rightIcon && (
              <View className="ml-2 items-center justify-center">{rightIcon}</View>
            )}
          </>
        )}
      </AnimatedPressable>
    );
  }
);

Button.displayName = "Button";

export default Button;
