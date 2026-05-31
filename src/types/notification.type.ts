export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export type NotificationPlatform = "android" | "ios";

export type NotificationType =
  | "general"
  | "reminder"
  | "achievement"
  | "system"
  | "course"
  | "lesson"
  | "quiz";

export interface UseNotificationsParams {
  page?: number;
  limit?: number;
  type?: NotificationType;
}

export interface RegisterNotificationTokenPayload {
  token: string;
  platform: NotificationPlatform;
}

export interface MarkNotificationReadPayload {
  id: string;
}

export interface NotificationToken {
  id: string;
  userId: string;
  token: string;
  platform: NotificationPlatform;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  relatedCourseId?: string | null;
  relatedLessonId?: string | null;
  relatedQuizId?: string | null;
  sentAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationTokenResponse {
  success: boolean;
  token: NotificationToken;
  message: string;
}

export interface NotificationTokensResponse {
  success: boolean;
  tokens: NotificationToken[];
}

export interface NotificationsResponse {
  success: boolean;
  notifications: {
    items: NotificationItem[];
    paginations: Pagination;
  };
}

export interface NotificationResponse {
  success: boolean;
  notification: NotificationItem;
  message: string;
}

export interface MarkAllNotificationsReadResponse {
  success: boolean;
  updated: {
    updatedCount: number;
  };
  message: string;
}
