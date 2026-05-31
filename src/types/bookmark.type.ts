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
  updatedAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility: "public" | "private";
  createdAt: string;
  updatedAt: string;
}

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailPublicId: string;
  visibility: "public" | "private";
  status: "pending" | "processing" | "completed" | "failed";
  categoryId: string;
  category: CategoryItem;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkWithCourse extends BookmarkItem {
  course: CourseItem;
}

export interface BookmarkResponse {
  success: boolean;
  bookmark: BookmarkItem;
}

export interface CreateBookmarkResponse {
  success: boolean;
  bookmark: BookmarkWithCourse;
  message: string;
}

export interface DeleteBookmarkResponse {
  success: boolean;
  bookmark: BookmarkItem;
  message: string;
}
