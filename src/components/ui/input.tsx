import { memo, ReactNode, useCallback, useMemo, useState } from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

import { cn } from "@/lib/cn";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  required?: boolean;
  style?: StyleProp<TextStyle>;
}

const Input = memo(
  ({
    label,
    error,
    hint,
    secureTextEntry,
    leftIcon,
    rightIcon,
    containerClassName,
    inputClassName,
    disabled = false,
    required = false,
    style,
    multiline = false,
    maxLength,
    value,
    ...props
  }: InputProps) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = Boolean(secureTextEntry);

    const handleFocus = useCallback(() => {
      setFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setFocused(false);
    }, []);

    const togglePassword = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const containerClasses = useMemo(
      () =>
        cn(
          "flex-row rounded-xl border bg-white px-4 dark:bg-neutral-900",
          multiline ? "min-h-28 items-start py-3" : "h-14 items-center",
          focused ? "border-primary" : "border-neutral-200 dark:border-neutral-800",
          error && "border-red-500",
          disabled && "opacity-50"
        ),
      [multiline, focused, error, disabled]
    );

    return (
      <View className={cn("gap-1.5", containerClassName)}>
        {label ? (
          <Text className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {label}
            {required && <Text className="text-red-500"> *</Text>}
          </Text>
        ) : null}
        <View className={containerClasses}>
          {leftIcon ? <View className="mr-3">{leftIcon}</View> : null}
          <TextInput
            {...props}
            value={value}
            editable={!disabled}
            multiline={multiline}
            maxLength={maxLength}
            placeholderTextColor="#94A3B8"
            secureTextEntry={isPassword && !showPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "flex-1 text-base text-neutral-900 dark:text-white",
              multiline && "min-h-24",
              inputClassName
            )}
            style={style}
          />
          {isPassword ? (
            <Pressable hitSlop={10} onPress={togglePassword} className="ml-3">
              {showPassword ? (
                <EyeOff size={20} color="#737373" />
              ) : (
                <Eye size={20} color="#737373" />
              )}
            </Pressable>
          ) : rightIcon ? (
            <View className="ml-3">{rightIcon}</View>
          ) : null}
        </View>
        {maxLength && typeof value === "string" ? (
          <Text className="self-end text-xs text-neutral-400">
            {value.length}/{maxLength}
          </Text>
        ) : null}
        {error ? (
          <Text className="text-xs text-red-500">{error}</Text>
        ) : hint ? (
          <Text className="text-xs text-neutral-500">{hint}</Text>
        ) : null}
      </View>
    );
  }
);

Input.displayName = "Input";

export default Input;
