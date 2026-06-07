import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  CreateEnrollPayload,
  DeleteEnrollPayload,
  EnrollMutationResponse,
} from "@/types/enroll.type";

import { useApi } from "./use-api";

export function useCreateEnroll() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ courseId }: CreateEnrollPayload) => {
      const response: AxiosResponse<EnrollMutationResponse> = await api.post(
        `/enrolls/${courseId}`
      );
      return response.data;
    },
    retry: false,
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
    },
  });
}

export function useDeleteEnroll() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ enrollId }: DeleteEnrollPayload) => {
      const response: AxiosResponse<EnrollMutationResponse> = await api.delete(
        `/enrolls/${enrollId}`
      );
      return response.data;
    },
    retry: false,
    onSuccess: async (data) => {
      const deleteEnroll = data?.enroll;
      if (!deleteEnroll) return;

      await queryClient.invalidateQueries({
        queryKey: ["course", deleteEnroll.courseId],
      });
    },
  });
}
