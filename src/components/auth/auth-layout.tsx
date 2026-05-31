import { ReactNode, memo } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeInDown } from "react-native-reanimated";

import Card from "../ui/card";
import ToggleThemeIcon from "../global/toggle-theme-icon";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const AuthLayout = memo(({ title, description, children }: AuthLayoutProps) => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View className="px-5 py-8">
        <Animated.View entering={FadeInDown.duration(500)}>
          <Card
            className="gap-6 self-center"
            style={{
              width: "100%",
              maxWidth: isTablet ? 520 : undefined,
            }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1 gap-2">
                <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {title}
                </Text>
                <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </Text>
              </View>
              <ToggleThemeIcon />
            </View>
            {children}
          </Card>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
});

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
