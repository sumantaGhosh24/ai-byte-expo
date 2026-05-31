import { useClerk } from "@clerk/expo";
import { router } from "expo-router";

import { queryClient } from "@/lib/react-query";
import { useAuthStore } from "@/store/auth-store";

export function useLogout() {
  const { signOut } = useClerk();

  const { resetUserOnboarding } = useAuthStore();

  async function logout() {
    await signOut();

    resetUserOnboarding();

    queryClient.clear();

    router.replace("/(auth)/sign-in");
  }

  return {
    logout,
  };
}
