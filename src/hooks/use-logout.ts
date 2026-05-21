import { useClerk } from "@clerk/expo";
import { router } from "expo-router";
import { queryClient } from "@/lib/react-query";

export function useLogout() {
  const { signOut } = useClerk();

  async function logout() {
    await signOut();

    queryClient.clear();

    router.replace("/(auth)/sign-in");
  }

  return {
    logout,
  };
}
