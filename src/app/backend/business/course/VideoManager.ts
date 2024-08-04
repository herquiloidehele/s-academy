import Logger from "@/utils/Logger";
import VimeoService from "@/app/backend/services/VimeoService";

export interface IUploadResponse {
  videoId: string;
  thumbnailUrl: string;
}

class VideoManager {
  private readonly LOG_TAG = "VideoManager";

  public async uploadVideoFile(file: File, onProgress: (percentage: number) => void): Promise<IUploadResponse> {
    Logger.log(this.LOG_TAG, "Start uploading video file", [file]);

    try {
      onProgress(0);
      const uploadLink = await VimeoService.createVideo(file.size);
      await VimeoService.uploadVideoFile(uploadLink, file, onProgress);
      const isUploadComplete = await VimeoService.verifyVideoUpload(uploadLink);

      if (!isUploadComplete) {
        return Promise.reject("Failed to upload video");
      }

      return { videoId: "", thumbnailUrl: "" };
    } catch (error) {
      Logger.error(this.LOG_TAG, "uploadVideoFile", error);
      return Promise.reject(error);
    }
  }
}

export default new VideoManager();
