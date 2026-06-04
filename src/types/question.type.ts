export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type QuestionDifficulty = "beginner" | "intermediate" | "expert";

export interface UseQuestionsParams {
  quizId: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionItem {
  id: string;
  question: string;
  explanation: string;
  difficulty: QuestionDifficulty;
  aiGenerated: boolean;
  quizId: string;
  answersCount: number;
  options: QuestionOption[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionsResponse {
  success: boolean;
  result: {
    items: QuestionItem[];
    paginations: Pagination;
  };
}
