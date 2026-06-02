import { useAuth } from "@clerk/expo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type {
  CoursesResponse,
  CourseResponse,
  UseCoursesParams,
} from "@/types/course.type";

import { useApi } from "./use-api";

export function usePublicCourses({
  limit = 10,
  search = "",
  categoryId,
  difficulty,
}: UseCoursesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useInfiniteQuery<CoursesResponse>({
    queryKey: ["public-courses", limit, search, categoryId, difficulty],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response: AxiosResponse<CoursesResponse> = await api.get("/courses/public", {
        params: {
          page: pageParam,
          limit,
          search,
          categoryId,
          difficulty,
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.result.paginations.nextPage ?? undefined;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useMyCourses({
  page = 1,
  limit = 10,
  search = "",
  categoryId,
  difficulty,
}: UseCoursesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CoursesResponse>({
    queryKey: ["my-courses", page, limit, search, categoryId, difficulty],
    queryFn: async () => {
      const response: AxiosResponse<CoursesResponse> = await api.get("/courses/my", {
        params: {
          page,
          limit,
          search,
          categoryId,
          difficulty,
        },
      });
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useRecommendedCourses({
  page = 1,
  limit = 10,
  search = "",
  categoryId,
  difficulty,
}: UseCoursesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CoursesResponse>({
    queryKey: ["recommended-courses", page, limit, search, categoryId, difficulty],
    queryFn: async () => {
      const response: AxiosResponse<CoursesResponse> = await api.get(
        "/courses/recommended",
        {
          params: {
            page,
            limit,
            search,
            categoryId,
            difficulty,
          },
        }
      );
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useBookmarkCourses({
  page = 1,
  limit = 10,
  search = "",
  categoryId,
  difficulty,
}: UseCoursesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CoursesResponse>({
    queryKey: ["bookmark-courses", page, limit, search, categoryId, difficulty],
    queryFn: async () => {
      const response: AxiosResponse<CoursesResponse> = await api.get(
        "/courses/bookmark",
        {
          params: {
            page,
            limit,
            search,
            categoryId,
            difficulty,
          },
        }
      );
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useTrendingCourses({
  page = 1,
  limit = 10,
  search = "",
  categoryId,
  difficulty,
}: UseCoursesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CoursesResponse>({
    queryKey: ["trending-courses", page, limit, search, categoryId, difficulty],
    queryFn: async () => {
      const response: AxiosResponse<CoursesResponse> = await api.get(
        "/courses/trending",
        {
          params: {
            page,
            limit,
            search,
            categoryId,
            difficulty,
          },
        }
      );
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useMyCourse(courseId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CourseResponse>({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const response: AxiosResponse<CourseResponse> = await api.get(
        `/courses/my/${courseId}`
      );
      return response.data;
    },
    retry: false,
    enabled: !!courseId && isLoaded && isSignedIn,
  });
}
