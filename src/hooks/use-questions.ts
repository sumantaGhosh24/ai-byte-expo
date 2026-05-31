import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type {
  QuestionResponse,
  QuestionsResponse,
  UseQuestionsParams,
} from "@/types/question.type";

import { useApi } from "./use-api";

export function useQuestions({
  quizId,
  page = 1,
  limit = 10,
  search = "",
  difficulty,
}: UseQuestionsParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuestionsResponse>({
    queryKey: ["questions", quizId, page, limit, search, difficulty],
    queryFn: async () => {
      const response: AxiosResponse<QuestionsResponse> = await api.get(
        `/questions/public/${quizId}`,
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
    enabled: !!quizId && isLoaded && isSignedIn,
    retry: false,
  });
}

export function useQuestion(questionId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuestionResponse>({
    queryKey: ["question", questionId],
    queryFn: async () => {
      const response: AxiosResponse<QuestionResponse> = await api.get(
        `/question/public/${questionId}`
      );
      return response.data;
    },
    enabled: !!questionId && isLoaded && isSignedIn,
    retry: false,
  });
}
