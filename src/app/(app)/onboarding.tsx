import { View, Text, Pressable } from "react-native";

import { useLogout } from "@/hooks/use-logout";

const OnboardingScreen = () => {
  const { logout } = useLogout();

  return (
    <View>
      <Text>Onboarding</Text>
      <Pressable onPress={() => logout()}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default OnboardingScreen;
