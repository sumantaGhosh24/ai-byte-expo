import { useAuth } from "@clerk/expo";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import {
  CreateQuizAttemptPayload,
  CreateQuizAttemptResponse,
  QuizAttemptResponse,
  QuizAttemptsResponse,
} from "@/types/quiz-attempt.type";

import { useApi } from "./use-api";

export function useUserQuizAttempts(limit = 10) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useInfiniteQuery<QuizAttemptsResponse>({
    queryKey: ["user-quiz-attempts", limit],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response: AxiosResponse<QuizAttemptsResponse> = await api.get(
        "/attempts/users",
        {
          params: {
            page: pageParam,
            limit,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.result.paginations.nextPage ?? undefined;
    },
    staleTime: 1000 * 60 * 5,
    enabled: isLoaded && isSignedIn,
    retry: false,
  });
}

export function useQuizAttempt(attemptId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuizAttemptResponse>({
    queryKey: ["quiz-attempt", attemptId],
    queryFn: async () => {
      const response: AxiosResponse<QuizAttemptResponse> = await api.get(
        `/attempts/${attemptId}`
      );
      return response.data;
    },
    enabled: !!attemptId && isLoaded && isSignedIn,
    retry: false,
  });
}

export function useCreateQuizAttempt() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateQuizAttemptPayload) => {
      const response: AxiosResponse<CreateQuizAttemptResponse> = await api.post(
        "/quiz-attempts",
        payload
      );
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quiz-attempts"] });
      await queryClient.invalidateQueries({ queryKey: ["user-quiz-attempts"] });
    },
  });
}
