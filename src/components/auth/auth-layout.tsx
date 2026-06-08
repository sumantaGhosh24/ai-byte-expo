import { ReactNode, memo } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "../ui/card";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const AuthLayout = memo(({ title, description, children }: AuthLayoutProps) => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <View>
                <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {title}
                </Text>
                <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </Text>
              </View>
              {children}
            </Card>
          </Animated.View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
});

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
