import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { QuestionsResponse, UseQuestionsParams } from "@/types/question.type";

import { useApi } from "./use-api";

export function useQuestions({
  quizId,
  page = 1,
  limit = 10,
  search = "",
}: UseQuestionsParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuestionsResponse>({
    queryKey: ["questions", quizId, page, limit, search],
    queryFn: async () => {
      const response: AxiosResponse<QuestionsResponse> = await api.get(
        `/questions/public/${quizId}`,
        {
          params: {
            page,
            limit,
            search,
          },
        }
      );
      return response.data;
    },
    enabled: !!quizId && isLoaded && isSignedIn,
    retry: false,
  });
}
