import { useAuthStore } from "@/store/auth-store";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const { isSignedIn, isLoaded } = useAuth();

  const { hasUserCompletedOnboarding } = useAuthStore();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Protected guard={!hasUserCompletedOnboarding}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={hasUserCompletedOnboarding}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(stacks)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
