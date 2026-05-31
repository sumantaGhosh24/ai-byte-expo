import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/lib/react-query";
import type {
  ProfileResponse,
  PublicProfileResponse,
  UpdateProfilePayload,
  UpdateProfilePreferencesPayload,
  UpdateProfileResponse,
} from "@/types/profile.type";

import { useApi } from "./use-api";

export function useProfile() {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response: AxiosResponse<ProfileResponse> = await api.get("/profile");

      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function usePublicProfile(userId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<PublicProfileResponse>({
    queryKey: ["public-profile", userId],
    queryFn: async () => {
      const response: AxiosResponse<PublicProfileResponse> = await api.get(
        `/profile/${userId}`
      );
      return response.data;
    },
    retry: false,
    enabled: !!userId && isLoaded && isSignedIn,
  });
}

export function useUpdateProfile() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const response: AxiosResponse<UpdateProfileResponse> = await api.patch(
        "/profile",
        payload
      );
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      await queryClient.invalidateQueries({ queryKey: ["public-profile"] });
    },
  });
}

export function useUpdateProfilePreferences() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePreferencesPayload) => {
      const response: AxiosResponse<UpdateProfileResponse> = await api.patch(
        "/profile/preferences",
        payload
      );
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      await queryClient.invalidateQueries({ queryKey: ["public-profile"] });
    },
  });
}
