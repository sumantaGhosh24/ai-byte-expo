export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type LessonDifficulty = "beginner" | "intermediate" | "expert";

export interface UseLessonsParams {
  courseId: string;
  page?: number;
  limit?: number;
  search?: string;
  difficulty?: LessonDifficulty;
}

export interface CourseSummary {
  id: string;
  title: string;
}

export interface LessonItem {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string | null;
  thumbnailPublicId: string | null;
  videoUrl: string | null;
  videoPublicId: string | null;
  duration: string;
  difficulty: LessonDifficulty;
  aiGenerated: boolean;
  orderIndex: number;
  courseId: string;
  progressCount: number;
  isCompleted: boolean;
  progress: {
    id: string;
    completed: boolean;
    startedAt: Date;
    finishedAt: Date | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface LessonDetails extends Omit<LessonItem, "progressCount"> {
  course: CourseSummary;
  _count: {
    progress: number;
  };
}

export interface LessonsResponse {
  success: boolean;
  result: {
    items: LessonItem[];
    paginations: Pagination;
  };
}

export interface LessonResponse {
  success: boolean;
  lesson: LessonDetails;
}
