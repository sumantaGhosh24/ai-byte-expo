export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export interface UseReviewsParams {
  page?: number;
  limit?: number;
  search?: string;
  courseId?: string;
}

export interface CreateReviewPayload {
  courseId: string;
  rating?: number;
  message: string;
}

export interface DeleteReviewPayload {
  id: string;
  courseId: string;
}

export interface ReviewUser {
  id: string;
  email: string;
  profile: {
    name: string;
    username: string;
    avatarUrl: string | null;
  } | null;
}

export interface ReviewCategory {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility: "public" | "private";
}

export interface ReviewCourse {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  category: ReviewCategory;
}

export interface ReviewItem {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
  course: ReviewCourse;
}

export interface ReviewsResponse {
  success: boolean;
  result: {
    items: ReviewItem[];
    paginations: Pagination;
  };
}

export interface ReviewResponse {
  success: boolean;
  review: ReviewItem;
  message: string;
}
