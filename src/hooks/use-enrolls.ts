import { useAuth } from "@clerk/expo";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  CreateEnrollPayload,
  DeleteEnrollPayload,
  EnrollMutationResponse,
  EnrollResponse,
} from "@/types/enroll.type";

import { useApi } from "./use-api";

export function useEnroll(courseId?: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<EnrollResponse | null>({
    queryKey: ["enroll", courseId],
    queryFn: async () => {
      try {
        const response: AxiosResponse<EnrollResponse> = await api.get(
          `/enroll/${courseId}`
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
      await queryClient.invalidateQueries({ queryKey: ["enroll", variables.courseId] });
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
    onSuccess: async (data, variables) => {
      const deleteEnroll = data?.enroll;
      if (!deleteEnroll) return;

      queryClient.setQueryData(["enroll", deleteEnroll.courseId], null);

      await queryClient.invalidateQueries({
        queryKey: ["enroll", deleteEnroll.courseId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["course", deleteEnroll.courseId],
      });
    },
  });
}
