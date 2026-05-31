import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="terms" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
