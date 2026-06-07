export interface CreateBookmarkPayload {
  courseId: string;
}

export interface DeleteBookmarkPayload {
  bookmarkId: string;
}

export interface BookmarkItem {
  id: string;
  userId: string;
  courseId: string;
  createdAt: string;
}

export interface CreateBookmarkResponse {
  success: boolean;
  message: string;
}

export interface DeleteBookmarkResponse {
  success: boolean;
  bookmark: BookmarkItem;
  message: string;
}
