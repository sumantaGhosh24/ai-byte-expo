import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { CategoriesResponse } from "@/types/category.type";

import { useApi } from "./use-api";

export function useCategories() {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<CategoriesResponse> = await api.get("/categories");
      return response.data;
    },
    enabled: isLoaded && isSignedIn,
    retry: false,
  });
}
