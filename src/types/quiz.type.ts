export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type QuizDifficulty = "beginner" | "intermediate" | "expert";

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
  aiGenerated: boolean;
  passingScore: number;
  courseId: string;
  questionsCount: number;
  attemptsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizDetails extends Omit<QuizItem, "questionsCount" | "attemptsCount"> {
  _count: {
    questions: number;
    attempts: number;
  };
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
  quiz: QuizDetails;
}
