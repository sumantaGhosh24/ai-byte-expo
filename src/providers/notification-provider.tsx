import { useEffect, PropsWithChildren } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useAuth } from "@clerk/expo";
import Toast from "react-native-toast-message";

import { useRegisterNotificationToken } from "@/hooks/use-notifications";
import { useAuthStore } from "@/store/auth-store";
import { registerForPushNotificationsAsync } from "@/lib/registerForPushNotificationsAsync";
import { navigateFromNotification } from "@/lib/deep-links";

export function NotificationProvider({ children }: PropsWithChildren) {
  const { isSignedIn, isLoaded } = useAuth();

  const registerNotificationToken = useRegisterNotificationToken();

  const { registeredPushToken, setRegisteredPushToken } = useAuthStore();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || Platform.OS === "web") {
      return;
    }

    registerForPushNotificationsAsync().then(
      async (token) => {
        if (registeredPushToken === token) {
          return;
        }

        await registerNotificationToken.mutateAsync({
          token,
          platform: Platform.OS as "android" | "ios",
        });

        setRegisteredPushToken(token);
      },
      (error) =>
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message,
        })
    );

    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        Toast.show({
          type: "success",
          text1: notification.request.content.title ?? "",
          text2: notification.request.content.body ?? "",
        });
      }
    );

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        navigateFromNotification(response.notification.request.content.data as any);
      }
    );

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, [
    isSignedIn,
    isLoaded,
    registeredPushToken,
    registerNotificationToken,
    setRegisteredPushToken,
  ]);

  return children;
}
