import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  courseId,
}: UseReviewsParams = {}) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<ReviewsResponse>({
    queryKey: ["user-reviews", page, limit, search, courseId],
    queryFn: async () => {
      const response: AxiosResponse<ReviewsResponse> = await api.get("/reviews", {
        params: {
          page,
          limit,
          search,
          courseId,
        },
      });
      return response.data;
    },
    enabled: isLoaded && isSignedIn,
    retry: false,
  });
}

export function useCourseReviews(
  courseId: string,
  { page = 1, limit = 10, search = "" }: UseReviewsParams = {}
) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<ReviewsResponse>({
    queryKey: ["course-reviews", courseId, page, limit, search],
    queryFn: async () => {
      const response: AxiosResponse<ReviewsResponse> = await api.get(
        `/reviews/course/${courseId}`,
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
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["user-reviews"] });
      await queryClient.invalidateQueries({
        queryKey: ["course-reviews", variables.courseId],
      });
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
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["user-reviews"] });
      await queryClient.invalidateQueries({
        queryKey: ["course-reviews", variables.courseId],
      });
    },
  });
}
