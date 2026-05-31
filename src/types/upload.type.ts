export interface UploadedFile {
  public_id: string;
  url: string;
}

export interface UploadImageResponse {
  success: boolean;
  message: string;
  file: UploadedFile;
}

export interface DeleteFilePayload {
  public_id: string;
}

export interface DeleteFileResponse {
  success: boolean;
  message: string;
}
