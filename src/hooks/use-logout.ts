import { useClerk } from "@clerk/expo";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { queryClient } from "@/lib/react-query";
import { useAuthStore } from "@/store/auth-store";

export function useLogout() {
  const { signOut } = useClerk();

  const { resetUserOnboarding, clearRegisteredPushToken } = useAuthStore();

  async function logout() {
    try {
      await queryClient.cancelQueries();

      queryClient.clear();

      resetUserOnboarding();

      clearRegisteredPushToken();

      await signOut();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged out successfully",
      });

      router.replace("/(auth)/sign-in");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error instanceof Error ? error?.message : "Failed to logout",
      });
    }
  }

  return {
    logout,
  };
}
