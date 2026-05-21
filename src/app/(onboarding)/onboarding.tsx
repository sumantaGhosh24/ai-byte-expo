import { View, Text } from "react-native";

import { useLogout } from "@/hooks/use-logout";
import Button from "@/components/ui/button";

const OnboardingScreen = () => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View>
      <Text>OnboardingScreen</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default OnboardingScreen;
