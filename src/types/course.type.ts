export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type CourseDifficulty = "beginner" | "intermediate" | "expert";

export interface UseCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  difficulty?: CourseDifficulty;
}

export interface CourseCategory {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility: "public" | "private";
}

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailPublicId: string;
  difficulty: CourseDifficulty;
  visibility: "public" | "private";
  status: string;
  createdAt: string;
  updatedAt: string;
  category: CourseCategory;
  lessonsCount: number;
  quizzesCount: number;
  enrollsCount: number;
  bookmarksCount: number;
  reviewsCount: number;
  averageReview: number;
}

export interface CoursesResponse {
  success: boolean;
  result: {
    items: CourseItem[];
    paginations: Pagination;
  };
}

export interface CourseResponse {
  success: boolean;
  course: CourseItem;
}
