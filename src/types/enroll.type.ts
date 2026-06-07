export interface EnrollItem {
  id: string;
  completed: boolean;
  finishedLessons: number;
  startedAt: string;
  finishedAt: string | null;
  userId: string;
  courseId: string;
}

export interface CreateEnrollPayload {
  courseId: string;
}

export interface DeleteEnrollPayload {
  enrollId: string;
}

export interface EnrollMutationResponse {
  success: boolean;
  enroll: EnrollItem;
  message: string;
}
