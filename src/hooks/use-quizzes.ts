import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type {
  PublicQuizResponse,
  PublicQuizzesResponse,
  UsePublicQuizzesParams,
} from "@/types/quiz.type";

import { useApi } from "./use-api";

export function usePublicQuizzes({
  courseId,
  page = 1,
  limit = 10,
  search = "",
  difficulty,
}: UsePublicQuizzesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<PublicQuizzesResponse>({
    queryKey: ["public-quizzes", courseId, page, limit, search, difficulty],
    queryFn: async () => {
      const response: AxiosResponse<PublicQuizzesResponse> = await api.get(
        `/quizzes/public/${courseId}`,
        {
          params: {
            page,
            limit,
            search,
            difficulty,
          },
        }
      );
      return response.data;
    },
    retry: false,
    enabled: !!courseId && isLoaded && isSignedIn,
  });
}

export function usePublicQuiz(quizId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<PublicQuizResponse>({
    queryKey: ["public-quiz", quizId],
    queryFn: async () => {
      const response: AxiosResponse<PublicQuizResponse> = await api.get(
        `/quiz/public/${quizId}`
      );
      return response.data;
    },
    retry: false,
    enabled: !!quizId && isLoaded && isSignedIn,
  });
}
