export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface UseQuestionsParams {
  quizId: string;
  page?: number;
  limit?: number;
  search?: string;
  difficulty?: Difficulty;
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
  quizId: string;
  question: string;
  difficulty: Difficulty;
  visibility: "public" | "private";
  status: string;
  options: QuestionOption[];
  answersCount: number;
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

export interface QuestionResponse {
  success: boolean;
  question: QuestionItem;
}
