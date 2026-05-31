import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  NotificationResponse,
  NotificationsResponse,
  NotificationTokensResponse,
  NotificationTokenResponse,
  RegisterNotificationTokenPayload,
  MarkNotificationReadPayload,
  MarkAllNotificationsReadResponse,
  UseNotificationsParams,
} from "@/types/notification.type";

import { useApi } from "./use-api";

export function useNotificationTokens() {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<NotificationTokensResponse>({
    queryKey: ["notification-tokens"],
    queryFn: async () => {
      const response: AxiosResponse<NotificationTokensResponse> =
        await api.get("/notifications/token");

      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useRegisterNotificationToken() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: RegisterNotificationTokenPayload) => {
      const response: AxiosResponse<NotificationTokenResponse> = await api.post(
        "/notifications/token",
        payload
      );
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notification-tokens"] });
    },
  });
}

export function useNotifications({
  page = 1,
  limit = 20,
  type,
}: UseNotificationsParams = {}) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<NotificationsResponse>({
    queryKey: ["notifications", page, limit, type],
    queryFn: async () => {
      const response: AxiosResponse<NotificationsResponse> = await api.get(
        "/notifications",
        {
          params: {
            page,
            limit,
            type,
          },
        }
      );
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useMarkNotificationRead() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id }: MarkNotificationReadPayload) => {
      const response: AxiosResponse<NotificationResponse> = await api.patch(
        `/notifications/${id}/read`
      );
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
      await queryClient.invalidateQueries({ queryKey: ["notification", variables.id] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const api = useApi();

  return useMutation({
    mutationFn: async () => {
      const response: AxiosResponse<MarkAllNotificationsReadResponse> = await api.patch(
        "/notifications/read-all"
      );
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
