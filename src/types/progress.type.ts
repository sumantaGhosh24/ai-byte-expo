export interface ProgressItem {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  startedAt: string | null;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetProgressResponse {
  success: boolean;
  progress: ProgressItem;
}

export interface UpdateProgressPayload {
  lessonId: string;
  completed?: boolean;
  startedAt?: string;
  finishedAt?: string;
}

export interface UpdateProgressResponse {
  success: boolean;
  result: ProgressItem;
  message: string;
}
