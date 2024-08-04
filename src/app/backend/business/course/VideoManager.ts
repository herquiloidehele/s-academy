import Logger from "@/utils/Logger";
import VimeoService from "@/app/backend/services/VimeoService";

export interface IUploadResponse {
  videoId: number;
}

class VideoManager {
  private readonly LOG_TAG = "VideoManager";

  public async uploadVideoFile(file: File, onProgress: (percentage: number) => void): Promise<IUploadResponse> {
    Logger.log(this.LOG_TAG, "Start uploading video file", [file]);

    try {
      onProgress(0);
      const uploadResponse = await VimeoService.createVideo(file.size);
      await VimeoService.uploadVideoFile(uploadResponse.uploadLink, file, onProgress);
      const isUploadComplete = await VimeoService.verifyVideoUpload(uploadResponse.uploadLink);

      if (!isUploadComplete) {
        return Promise.reject("Failed to upload video");
      }

      return { videoId: uploadResponse.videoId };
    } catch (error) {
      Logger.error(this.LOG_TAG, "uploadVideoFile", error);
      return Promise.reject(error);
    }
  }
}

export default new VideoManager();
