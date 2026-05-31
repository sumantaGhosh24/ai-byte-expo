import { useAuth } from "@clerk/expo";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  GetProgressResponse,
  UpdateProgressPayload,
  UpdateProgressResponse,
} from "@/types/progress.type";

import { useApi } from "./use-api";

export function useProgress(lessonId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<GetProgressResponse>({
    queryKey: ["progress", lessonId],
    queryFn: async () => {
      const response: AxiosResponse<GetProgressResponse> = await api.get(
        `/progress/${lessonId}`
      );
      return response.data;
    },
    retry: false,
    enabled: !!lessonId && isLoaded && isSignedIn,
  });
}

export function useUpdateProgress() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: UpdateProgressPayload) => {
      const response: AxiosResponse<UpdateProgressResponse> = await api.post(
        "/progress",
        payload
      );
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["progress", variables.lessonId] });
      await queryClient.invalidateQueries({ queryKey: ["course"] });
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
