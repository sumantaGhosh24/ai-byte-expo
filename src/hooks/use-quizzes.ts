import { useAuth } from "@clerk/expo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type {
  PublicQuizResponse,
  PublicQuizzesResponse,
  UsePublicQuizzesParams,
} from "@/types/quiz.type";

import { useApi } from "./use-api";

export function usePublicQuizzes({
  courseId,
  limit = 10,
  search = "",
  difficulty,
}: UsePublicQuizzesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useInfiniteQuery<PublicQuizzesResponse>({
    queryKey: ["public-quizzes", courseId, limit, search, difficulty],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response: AxiosResponse<PublicQuizzesResponse> = await api.get(
        `/quizzes/public/${courseId}`,
        {
          params: {
            page: pageParam,
            limit,
            search,
            difficulty,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.result.paginations.nextPage ?? undefined;
    },
    staleTime: 1000 * 60 * 5,
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
