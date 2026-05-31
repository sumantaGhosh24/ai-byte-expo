import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { UserAchievementsResponse } from "@/types/achievement.type";

import { useApi } from "./use-api";

export function useUserAchievements(userId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<UserAchievementsResponse>({
    queryKey: ["user-achievements", userId],
    queryFn: async () => {
      const response: AxiosResponse<UserAchievementsResponse> = await api.get(
        `/users/${userId}/achievements`
      );
      return response.data;
    },
    retry: false,
    enabled: !!userId && isLoaded && isSignedIn,
  });
}
