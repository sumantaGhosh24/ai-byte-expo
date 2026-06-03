import { useAuth } from "@clerk/expo";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  CreateReviewPayload,
  DeleteReviewPayload,
  ReviewResponse,
  ReviewsResponse,
  UseReviewsParams,
} from "@/types/review.type";

import { useApi } from "./use-api";

export function useUserReviews({
  page = 1,
  limit = 10,
  search = "",
}: UseReviewsParams = {}) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<ReviewsResponse>({
    queryKey: ["user-reviews", page, limit, search],
    queryFn: async () => {
      const response: AxiosResponse<ReviewsResponse> = await api.get("/reviews", {
        params: {
          page,
          limit,
          search,
        },
      });
      return response.data;
    },
    enabled: isLoaded && isSignedIn,
    retry: false,
  });
}

export function useCourseReviews({
  limit = 10,
  search = "",
  courseId,
}: UseReviewsParams = {}) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useInfiniteQuery<ReviewsResponse>({
    queryKey: ["course-reviews", courseId, limit, search],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response: AxiosResponse<ReviewsResponse> = await api.get(
        `/reviews/course/${courseId}`,
        {
          params: {
            page: pageParam,
            limit,
            search,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.result.paginations.nextPage ?? undefined;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!courseId && isLoaded && isSignedIn,
    retry: false,
  });
}

export function useCreateReview() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const response: AxiosResponse<ReviewResponse> = await api.post("/reviews", payload);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["course-reviews"] });
    },
  });
}

export function useDeleteReview() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id, courseId }: DeleteReviewPayload) => {
      const response: AxiosResponse<ReviewResponse> = await api.delete(`/reviews/${id}`, {
        data: {
          courseId,
        },
      });
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["course-reviews"] });
    },
  });
}
