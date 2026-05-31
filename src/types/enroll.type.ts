import type { CategoryItem } from "./category.type";

export type CourseCategory = CategoryItem;

export interface EnrollCourse {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  category: CourseCategory;
}

export interface EnrollItem {
  id: string;
  userId: string;
  courseId: string;

  completed: boolean;
  finishedLessons: number;

  startedAt: string;
  finishedAt: string | null;

  createdAt: string;
  updatedAt: string;

  course?: EnrollCourse;
}

export interface CreateEnrollPayload {
  courseId: string;
}

export interface UpdateEnrollPayload {
  courseId: string;
}

export interface DeleteEnrollPayload {
  enrollId: string;
}

export interface EnrollResponse {
  success: boolean;
  enroll: EnrollItem;
}

export interface EnrollMutationResponse {
  success: boolean;
  enroll: EnrollItem;
  message: string;
}
