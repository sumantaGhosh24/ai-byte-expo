import { QuizDifficulty } from "./quiz.type";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type AttemptStatus = "pending" | "processing" | "completed" | "failed";

export type AnswerResult = "correct" | "wrong";

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
  quizAttemptId: string;
}

export interface QuizAttemptQuiz {
  id: string;
  title: string;
  difficulty: QuizDifficulty;
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

export interface QuizAttemptQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttemptQuestion {
  id: string;
  question: string;
  explanation: string | null;
  correctAnswer: string;
  difficulty: QuizDifficulty;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
  options: QuizAttemptQuestionOption[];
}

export interface QuizAttemptSelectedOption {
  id: string;
  text: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
  questionId: string;
}

export interface QuizAttemptAnswer {
  id: string;
  quizAttemptId: string;
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  result: AnswerResult;
  createdAt: string;
  selectedOption: QuizAttemptSelectedOption;
  question: QuizAttemptQuestion;
}

export interface QuizAttemptUser {
  id: string;
  email: string;
  profile: {
    name: string | null;
    username: string | null;
    avatarUrl: string | null;
  } | null;
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
  user: QuizAttemptUser;
  quiz: {
    id: string;
    title: string;
    description: string;
  };
  summary: QuizSummary | null;
  answers: QuizAttemptAnswer[];
}

export interface QuizAttemptResponse {
  success: boolean;
  quizAttempt: QuizAttemptDetails;
}

export interface CreateQuizAttemptData {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  status: AttemptStatus;
  submittedAt: string;
}

export interface CreateQuizAttemptResponse {
  success: boolean;
  message: string;
  attempt: CreateQuizAttemptData;
}
