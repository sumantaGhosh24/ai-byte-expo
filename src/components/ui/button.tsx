import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  GestureResponderEvent,
} from "react-native";
import { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "warning" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  textClassName?: string;
  accessibilityLabel?: string;
  children?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-primary",
  secondary: "bg-[#111827] border border-border",
  outline: "border border-primary bg-transparent",
  warning: "bg-amber-500/90",
  danger: "bg-red-500/90",
  success: "bg-green-500/90",
};

const textStyles = {
  primary: "text-white",
  secondary: "text-primary",
  outline: "text-primary",
  warning: "text-white",
  danger: "text-white",
  success: "text-white",
};

const sizeStyles = {
  sm: "h-9 px-4",
  md: "h-12 px-5",
  lg: "h-14 px-6",
};

const spinnerColors = {
  primary: "#ffffff",
  secondary: "#6366f1",
  outline: "#6366f1",
  warning: "#ffffff",
  danger: "#ffffff",
  success: "#ffffff",
};

const Button = ({
  title,
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
  children,
  fullWidth = true,
}: ButtonProps) => {
  const spinnerColor = spinnerColors[variant];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      disabled={disabled || loading}
      className={cn(
        "flex-row items-center justify-center rounded-xl",
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && "opacity-50",
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <View className="flex-row items-center justify-center">
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          {children ? (
            children
          ) : (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className={cn(
                "text-base font-semibold",
                textStyles[variant],
                textClassName
              )}
            >
              {title}
            </Text>
          )}
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

export default Button;
