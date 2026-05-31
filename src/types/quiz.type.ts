export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type QuizDifficulty = "easy" | "medium" | "hard";

export interface UsePublicQuizzesParams {
  courseId: string;
  page?: number;
  limit?: number;
  search?: string;
  difficulty?: QuizDifficulty;
}

export interface QuizItem {
  id: string;
  title: string;
  description: string | null;
  difficulty: QuizDifficulty;
  visibility: "public" | "private";
  status: string;
  courseId: string;
  questionsCount: number;
  attemptsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublicQuizzesResponse {
  success: boolean;
  result: {
    items: QuizItem[];
    paginations: Pagination;
  };
}

export interface PublicQuizResponse {
  success: boolean;
  quiz: QuizItem;
}
