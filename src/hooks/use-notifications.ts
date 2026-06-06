import { useAuth } from "@clerk/expo";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  NotificationResponse,
  NotificationsResponse,
  NotificationTokenResponse,
  RegisterNotificationTokenPayload,
  MarkNotificationReadPayload,
  MarkAllNotificationsReadResponse,
  UseNotificationsParams,
  NotificationItem,
} from "@/types/notification.type";

import { useApi } from "./use-api";

export function updateNotificationCache(
  updater: (notification: NotificationItem) => NotificationItem,
  unreadCountUpdater?: (count: number) => number
) {
  queryClient.setQueriesData(
    {
      queryKey: ["notifications"],
    },
    (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          result: {
            ...page.result,
            unreadCount: unreadCountUpdater
              ? unreadCountUpdater(page.result.unreadCount)
              : page.result.unreadCount,
            items: page.result.items.map(updater),
          },
        })),
      };
    }
  );
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

export function useNotifications({ limit = 20, type }: UseNotificationsParams = {}) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useInfiniteQuery<NotificationsResponse>({
    queryKey: ["notifications", limit, type],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response: AxiosResponse<NotificationsResponse> = await api.get(
        "/notifications",
        {
          params: {
            page: pageParam,
            limit,
            type,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.result.paginations.nextPage ?? undefined;
    },
    staleTime: 1000 * 60 * 5,
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
    onMutate: async ({ id }) => {
      updateNotificationCache(
        (item) => (item.id === id ? { ...item, read: true } : item),
        (count) => Math.max(0, count - 1)
      );
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
    onMutate: async () => {
      updateNotificationCache(
        (item) => ({ ...item, read: true }),
        () => 0
      );
    },
  });
}
