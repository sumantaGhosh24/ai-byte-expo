import { PropsWithChildren } from "react";

import { usePushToken } from "@/hooks/use-push-token";
import { useNotificationListeners } from "@/hooks/use-notification-listeners";

export function NotificationProvider({ children }: PropsWithChildren) {
  usePushToken();
  useNotificationListeners();

  return children;
}
