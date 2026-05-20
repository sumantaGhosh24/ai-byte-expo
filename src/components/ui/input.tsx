import { useState } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

import { cn } from "@/lib/cn";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
}

const Input = ({
  label,
  error,
  hint,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  containerClassName,
  inputClassName,
  disabled = false,
  style,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordHidden = secureTextEntry && !showPassword;

  return (
    <View className={cn("gap-1.5", containerClassName)}>
      {label ? (
        <Text className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </Text>
      ) : null}
      <View
        className={cn(
          "min-h-14 flex-row items-center rounded-xl border bg-white px-4 dark:bg-neutral-900",
          isFocused ? "border-primary" : "border-neutral-200 dark:border-neutral-800",
          error && "border-red-500 dark:border-red-500",
          disabled && "opacity-50"
        )}
      >
        {leftIcon ? <View className="mr-3">{leftIcon}</View> : null}
        <TextInput
          placeholderTextColor="#94A3B8"
          editable={!disabled}
          secureTextEntry={isPasswordHidden}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "flex-1 py-4 text-base text-neutral-900 dark:text-white",
            inputClassName
          )}
          style={style}
          {...props}
        />
        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            className="ml-3"
          >
            <Text className="text-xs font-medium text-neutral-500">
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <View className="ml-3">{rightIcon}</View>
        ) : null}
      </View>
      {!error && hint ? <Text className="text-xs text-neutral-500">{hint}</Text> : null}
      {error ? <Text className="text-xs text-red-500">{error}</Text> : null}
    </View>
  );
};

export default Input;
