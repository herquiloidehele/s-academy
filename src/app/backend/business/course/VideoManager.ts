import Logger from "@/utils/Logger";
import VimeoService from "@/app/backend/services/VimeoService";
import { sleep } from "@/lib/utils";

export interface IUploadResponse {
  videoId: number;
  thumbnailUrl: string;
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

      const videoThumbnail = await this.getVideoThumbnail(uploadResponse.videoId);

      onProgress(100);
      return { videoId: uploadResponse.videoId, thumbnailUrl: videoThumbnail };
    } catch (error) {
      Logger.error(this.LOG_TAG, "uploadVideoFile", error);
      return Promise.reject(error);
    }
  }

  public async getVideoThumbnail(videoId: number, retryCount = 0): Promise<string> {
    Logger.log(this.LOG_TAG, "Get video thumbnail", [retryCount]);
    const MAX_RETRY = 20;

    const retryOperation = async () => {
      Logger.log(this.LOG_TAG, "Retry get video thumbnail");
      await sleep(2000);
      ++retryCount;

      if (retryCount >= MAX_RETRY) {
        return "";
      }
      return this.getVideoThumbnail(videoId, retryCount);
    };

    try {
      const videoDetails: any = await VimeoService.getVideoDetails(videoId);

      if (!videoDetails || !videoDetails.pictures) {
        Logger.log(this.LOG_TAG, "Unable to get video data", [videoDetails]);
        return retryOperation();
      }

      if (videoDetails.pictures.default_picture) {
        Logger.warn(this.LOG_TAG, "Thumbnail not available yet", [videoDetails.pictures.default_picture]);
        return retryOperation();
      }

      Logger.log(this.LOG_TAG, "Get video thumbnail", [videoDetails.pictures.base_link]);
      return videoDetails.pictures.base_link;
    } catch (error) {
      Logger.error(this.LOG_TAG, "getVideoThumbnail", error);
      return Promise.reject(error);
    }
  }
}

export default new VideoManager();
