import { useAuth } from "@clerk/expo";
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

export function useBookmark(courseId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<BookmarkResponse | null>({
    queryKey: ["bookmark", courseId],
    queryFn: async () => {
      try {
        const response: AxiosResponse<BookmarkResponse> = await api.get(
          `/bookmark/${courseId}`
        );
        return response.data;
      } catch (error: any) {
        if (error?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    enabled: !!courseId && isLoaded && isSignedIn,
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
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
      await queryClient.invalidateQueries({ queryKey: ["bookmark", variables.courseId] });
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
    onSuccess: async (data, _variables) => {
      const deletedBookmark = data?.bookmark;
      if (!deletedBookmark) return;

      queryClient.setQueryData(["bookmark", deletedBookmark.courseId], null);

      await queryClient.invalidateQueries({
        queryKey: ["bookmark", deletedBookmark.courseId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["course", deletedBookmark.courseId],
      });
    },
  });
}
