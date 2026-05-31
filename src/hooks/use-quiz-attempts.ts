import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import {
  CreateQuizAttemptPayload,
  CreateQuizAttemptResponse,
  QuizAttemptQueryParams,
  QuizAttemptResponse,
  QuizAttemptsResponse,
} from "@/types/quiz-attempt.type";

import { useApi } from "./use-api";

export function useQuizAttempts({
  page = 1,
  limit = 10,
  search = "",
  userId,
  quizId,
}: QuizAttemptQueryParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuizAttemptsResponse>({
    queryKey: ["quiz-attempts", page, limit, search, userId, quizId],
    queryFn: async () => {
      const response: AxiosResponse<QuizAttemptsResponse> = await api.get("/attempts", {
        params: {
          page,
          limit,
          search,
          userId,
          quizId,
        },
      });
      return response.data;
    },
    enabled: isLoaded && isSignedIn,
    retry: false,
  });
}

export function useUserQuizAttempts(userId: string, page = 1, limit = 10) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuizAttemptsResponse>({
    queryKey: ["user-quiz-attempts", userId, page, limit],
    queryFn: async () => {
      const response: AxiosResponse<QuizAttemptsResponse> = await api.get(
        `/attempts/users/${userId}`,
        {
          params: {
            page,
            limit,
          },
        }
      );
      return response.data;
    },
    enabled: !!userId && isLoaded && isSignedIn,
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
