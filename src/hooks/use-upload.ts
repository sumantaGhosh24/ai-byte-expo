import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type {
  DeleteFilePayload,
  DeleteFileResponse,
  UploadImageResponse,
} from "@/types/upload.type";

import { useApi } from "./use-api";

export function useUploadImage() {
  const api = useApi();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response: AxiosResponse<UploadImageResponse> = await api.post(
        "/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    retry: false,
  });
}

export function useDeleteFile() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: DeleteFilePayload) => {
      const response: AxiosResponse<DeleteFileResponse> = await api.post(
        "/destroy",
        payload
      );
      return response.data;
    },
    retry: false,
  });
}
