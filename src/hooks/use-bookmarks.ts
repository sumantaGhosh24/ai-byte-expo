import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  BookmarkResponse,
  CreateBookmarkPayload,
  CreateBookmarkResponse,
  DeleteBookmarkPayload,
  DeleteBookmarkResponse,
} from "@/types/bookmark.type";

import { useApi } from "./use-api";

export function useBookmark(bookmarkId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<BookmarkResponse>({
    queryKey: ["bookmark", bookmarkId],
    queryFn: async () => {
      const response: AxiosResponse<BookmarkResponse> = await api.get(
        `/bookmark/${bookmarkId}`
      );
      return response.data;
    },
    retry: false,
    enabled: !!bookmarkId && isLoaded && isSignedIn,
  });
}

export function useCreateBookmark() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ courseId }: CreateBookmarkPayload) => {
      const response: AxiosResponse<CreateBookmarkResponse> = await api.post(
        `/bookmarks/${courseId}`
      );
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      await queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
    },
  });
}

export function useDeleteBookmark() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ bookmarkId }: DeleteBookmarkPayload) => {
      const response: AxiosResponse<DeleteBookmarkResponse> = await api.delete(
        `/bookmarks/${bookmarkId}`
      );
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      await queryClient.invalidateQueries({
        queryKey: ["bookmark", variables.bookmarkId],
      });
    },
  });
}
