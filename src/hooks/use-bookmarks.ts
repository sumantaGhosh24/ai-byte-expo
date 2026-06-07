import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  CreateBookmarkPayload,
  CreateBookmarkResponse,
  DeleteBookmarkPayload,
  DeleteBookmarkResponse,
} from "@/types/bookmark.type";

import { useApi } from "./use-api";

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
    onSuccess: async (data) => {
      const deletedBookmark = data?.bookmark;
      if (!deletedBookmark) return;

      await queryClient.invalidateQueries({
        queryKey: ["course", deletedBookmark.courseId],
      });
    },
  });
}
