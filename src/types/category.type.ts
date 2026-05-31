export type Visibility = "public" | "private";

export interface CategoryItem {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility: Visibility;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  categories: CategoryItem[];
}
