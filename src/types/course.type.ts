import { CategoryItem } from "./category.type";

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

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailPublicId: string;
  difficulty: CourseDifficulty;
  visibility: "public" | "private";
  duration: string;
  aiGenerated: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryItem;
  lessonsCount: number;
  quizzesCount: number;
  enrollsCount: number;
  bookmarksCount: number;
  reviewsCount: number;
  averageReview: number;
  isEnrolled: boolean;
  isBookmarked: boolean;
  enrollment: {
    id: string;
    completed: boolean;
    finishedLessons: number;
    startedAt: Date;
    finishedAt: Date | null;
  } | null;
  bookmark: {
    id: string;
  } | null;
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
