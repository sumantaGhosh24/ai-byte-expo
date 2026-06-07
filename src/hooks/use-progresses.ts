import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  UpdateProgressPayload,
  UpdateProgressResponse,
} from "@/types/progress.type";

import { useApi } from "./use-api";

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
      await queryClient.invalidateQueries({ queryKey: ["course"] });
      await queryClient.invalidateQueries({ queryKey: ["lesson", variables.lessonId] });
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
