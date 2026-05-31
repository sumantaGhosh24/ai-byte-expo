import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  CreateEnrollPayload,
  DeleteEnrollPayload,
  EnrollMutationResponse,
  EnrollResponse,
  UpdateEnrollPayload,
} from "@/types/enroll.type";

import { useApi } from "./use-api";

export function useEnroll(enrollId?: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<EnrollResponse>({
    queryKey: ["enroll", enrollId],
    queryFn: async () => {
      const response: AxiosResponse<EnrollResponse> = await api.get(
        `/enroll/${enrollId}`
      );
      return response.data;
    },
    retry: false,
    enabled: !!enrollId && isLoaded && isSignedIn,
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
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      await queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
    },
  });
}

export function useUpdateEnroll() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ courseId }: UpdateEnrollPayload) => {
      const response: AxiosResponse<EnrollMutationResponse> = await api.put(
        `/enrolls/${courseId}`
      );
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
      await queryClient.invalidateQueries({ queryKey: ["my-courses"] });
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      await queryClient.invalidateQueries({ queryKey: ["enrolls"] });
    },
  });
}
