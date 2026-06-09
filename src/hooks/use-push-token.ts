import { useEffect } from "react";
import { Platform } from "react-native";
import { useAuth } from "@clerk/expo";

import { registerForPushNotifications } from "@/lib/notifications";

import { useRegisterNotificationToken } from "./use-notifications";
import { useAuthStore } from "@/store/auth-store";

export function usePushToken() {
  const { isSignedIn, isLoaded } = useAuth();

  const registerNotificationToken = useRegisterNotificationToken();

  const { registeredPushToken, setRegisteredPushToken, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !_hasHydrated || Platform.OS === "web") {
      return;
    }

    let mounted = true;

    async function setup() {
      try {
        const token = await registerForPushNotifications();

        if (!mounted || !token) {
          return;
        }

        if (registeredPushToken === token) {
          return;
        }

        await registerNotificationToken.mutateAsync({
          token,
          platform: Platform.OS as "android" | "ios",
        });

        setRegisteredPushToken(token);
      } catch (error) {
        console.log("Failed to register push token:", error);
      }
    }

    setup();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, isLoaded, _hasHydrated, registeredPushToken]);
}
