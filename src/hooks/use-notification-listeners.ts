import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";

import { navigateFromNotification } from "@/lib/deep-links";

export function useNotificationListeners() {
  useEffect(() => {
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
  }, []);
}
