import { Fragment, useEffect } from "react";
import { LogBox, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { ClerkLoaded, ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";

import { queryClient } from "@/lib/react-query";
import { useAuthStore } from "@/store/auth-store";
import AuthenticatedApiProvider from "@/providers/authenticated-api-provider";

import "../../global.css";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}
LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys."]);

const InitialLayout = () => {
  const { hasCompletedOnboarding, hasUserCompletedOnboarding, _hasHydrated } =
    useAuthStore();

  const user = useUser();

  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  useEffect(() => {
    if (user && user.user) {
      Sentry.setUser({
        email: user.user.emailAddresses[0].emailAddress,
        id: user.user.id,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [user]);

  if (!_hasHydrated) {
    return null;
  }

  return (
    <Fragment>
      <Stack>
        <Stack.Protected guard={Boolean(isSignedIn)}>
          <Stack.Protected guard={!hasUserCompletedOnboarding}>
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={hasUserCompletedOnboarding}>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn && hasCompletedOnboarding}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style="inverted" />
    </Fragment>
  );
};

export default Sentry.wrap(function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <AuthenticatedApiProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <InitialLayout />
              </ThemeProvider>
            </GestureHandlerRootView>
          </AuthenticatedApiProvider>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
});
