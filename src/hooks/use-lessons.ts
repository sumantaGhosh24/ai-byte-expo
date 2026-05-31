import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type {
  LessonResponse,
  LessonsResponse,
  UseLessonsParams,
} from "@/types/lesson.type";

import { useApi } from "./use-api";

export function useLessons({
  courseId,
  page = 1,
  limit = 10,
  search = "",
  difficulty,
}: UseLessonsParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<LessonsResponse>({
    queryKey: ["lessons", courseId, page, limit, search, difficulty],
    queryFn: async () => {
      const response: AxiosResponse<LessonsResponse> = await api.get(
        `/lessons/public/${courseId}`,
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

export function useLesson(lessonId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<LessonResponse>({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const response: AxiosResponse<LessonResponse> = await api.get(
        `/lesson/public/${lessonId}`
      );
      return response.data;
    },
    retry: false,
    enabled: !!lessonId && isLoaded && isSignedIn,
  });
}
