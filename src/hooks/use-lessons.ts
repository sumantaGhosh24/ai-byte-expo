import { useAuth } from "@clerk/expo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type {
  LessonResponse,
  LessonsResponse,
  UseLessonsParams,
} from "@/types/lesson.type";

import { useApi } from "./use-api";

export function useLessons({
  courseId,
  limit = 10,
  search = "",
  difficulty,
}: UseLessonsParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useInfiniteQuery<LessonsResponse>({
    queryKey: ["lessons", courseId, limit, search, difficulty],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response: AxiosResponse<LessonsResponse> = await api.get(
        `/lessons/public/${courseId}`,
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
