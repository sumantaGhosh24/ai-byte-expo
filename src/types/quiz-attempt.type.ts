export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type AttemptStatus = "processing" | "completed";

export type AnswerResult = "correct" | "wrong";

export interface QuizAttemptQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  userId?: string;
  quizId?: string;
}

export interface CreateQuizAttemptPayload {
  quizId: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

export interface QuizSummary {
  id: string;
  strength: string;
  weaknesses: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttemptQuiz {
  id: string;
  title: string;
  difficulty: string;
}

export interface QuizAttemptItem {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  status: AttemptStatus;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  quiz: QuizAttemptQuiz;
  summary: QuizSummary | null;
}

export interface QuizAttemptsResponse {
  success: boolean;
  result: {
    items: QuizAttemptItem[];
    paginations: Pagination;
  };
}

export interface QuizAttemptAnswer {
  id: string;
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  result: AnswerResult;
  selectedOption: {
    id: string;
    text: string;
    isCorrect: boolean;
  };
  question: {
    id: string;
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  };
}

export interface QuizAttemptDetails {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  status: AttemptStatus;
  submittedAt: string;
  user: {
    id: string;
    email: string;
    profile: {
      name: string;
      username: string;
      avatarUrl: string | null;
    };
  };
  quiz: {
    id: string;
    title: string;
    description: string | null;
  };
  summary: QuizSummary | null;
  answers: QuizAttemptAnswer[];
}

export interface QuizAttemptResponse {
  success: boolean;
  quizAttempt: QuizAttemptDetails;
}

export interface CreateQuizAttemptResponse {
  success: boolean;
  message: string;
  attempt: {
    id: string;
    userId: string;
    quizId: string;
    score: number;
    correctAnswers: number;
    wrongAnswers: number;
    status: AttemptStatus;
    submittedAt: string;
  };
}
