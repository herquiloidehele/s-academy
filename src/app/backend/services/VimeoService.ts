import Logger from "@/utils/Logger";
import { HttpMethods, HttpStatus, IHttpRequestConfig } from "@/app/backend/services/rest/IHttpInterface";
import { Constants } from "@/utils/Constants";
import ApiInterface from "@/app/backend/services/rest/ApiInterface";
import { Upload } from "tus-js-client";

interface IUploadResponse {
  videoId: number;
  uploadLink: string;
}

class VimeoService {
  private readonly LOG_TAG = "VimeoService";

  private readonly VIMEO_API_URL = "https://api.vimeo.com";
  private readonly UPLOAD_APPROACH = "tus";

  /**
   * Create video upload intent on Vimeo
   * @param videoSize
   * @private
   */
  public async createVideo(videoSize: number): Promise<IUploadResponse> {
    Logger.log(this.LOG_TAG, "Start creating video", videoSize);

    try {
      const request: IHttpRequestConfig = {
        url: `${this.VIMEO_API_URL}/me/videos`,
        httpMethod: HttpMethods.POST,
        headers: {
          Authorization: `bearer ${Constants.EXTERNAL_CONFIGS.VIMEO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
        data: {
          upload: {
            approach: this.UPLOAD_APPROACH,
            size: videoSize,
          },
        },
      };

      const response = await ApiInterface.send(request);
      Logger.log(this.LOG_TAG, "Create video response", response);

      if (!response || response.status !== HttpStatus.OK) {
        return Promise.reject("Failed to create video");
      }

      const { upload } = response.data;

      if (upload.approach !== this.UPLOAD_APPROACH || !upload.upload_link) {
        return Promise.reject("Invalid upload link");
      }

      return {
        videoId: this.getVideoIdFromUrl(response.data.uri),
        uploadLink: upload.upload_link,
      };
    } catch (error) {
      Logger.error(this.LOG_TAG, "createVideo", error);
      return Promise.reject(error);
    }
  }

  public async uploadVideoFile(uploadLink: string, videoFile: File, onProgress: (progress: number) => void) {
    Logger.log(this.LOG_TAG, "Start uploading video file", [uploadLink, videoFile]);

    try {
      return new Promise((resolve, reject) => {
        const upload = new Upload(videoFile, {
          endpoint: uploadLink,
          uploadUrl: `${uploadLink}?fields=id,uri,upload.upload_link`,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: videoFile.name,
            filetype: videoFile.type,
          },
          onError: function (error) {
            Logger.error(this.LOG_TAG, "Error uploading video", [error]);
            reject(error);
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            Logger.log(this.LOG_TAG, "Upload progress", percentage);
            onProgress(Number(percentage));
          },
          onSuccess: function () {
            Logger.log(this.LOG_TAG, "Upload success", upload);
            resolve(upload);
          },
        });

        upload.start();
      });
    } catch (error) {
      Logger.error(this.LOG_TAG, "Upload Generic error", error);
      return Promise.reject(error);
    }
  }

  public async verifyVideoUpload(uploadLink: string) {
    Logger.log(this.LOG_TAG, "verifyVideoUpload");

    try {
      const request: IHttpRequestConfig = {
        url: uploadLink,
        httpMethod: HttpMethods.HEAD,
        headers: {
          "Tus-Resumable": "1.0.0",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Verify video upload response", response);

      if (!response || response.status !== HttpStatus.OK) {
        return Promise.reject("Failed to verify video upload");
      }

      const uploadLength = response.headers["upload-length"];
      const uploadOffset = response.headers["upload-offset"];

      if (uploadLength !== uploadOffset) {
        Logger.log(this.LOG_TAG, "Upload not completed", [uploadLength, uploadOffset]);
        return Promise.reject("Upload not completed");
      }

      Logger.log(this.LOG_TAG, "Upload completed Successfully", [uploadLength, uploadOffset]);

      return Promise.resolve(true);
    } catch (error) {
      Logger.error(this.LOG_TAG, "verifyVideoUpload", error);
      return Promise.reject(error);
    }
  }

  private getVideoIdFromUrl(url: string) {
    const videoIdMatch = url.match(/videos\/(\d+)/);
    return Number(videoIdMatch ? videoIdMatch[1] : "");
  }
}

export default new VimeoService();
