import axios from "axios";

class VimeoClientService {
  private readonly API_BASE_URL = "https://api.vimeo.com";
  private readonly ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"; // Substitua pelo seu token de acesso do Vimeo

  constructor() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${this.ACCESS_TOKEN}`;
  }

  public async uploadVideo(videoFile: File, description: string): Promise<any> {
    if (true) return 4;
    try {
      const response = await axios.post(`${this.API_BASE_URL}/me/videos`, {
        upload: {
          approach: "tus",
          size: videoFile.size,
        },
        name: videoFile.name,
        description,
      });

      const uploadUrl = response.data.upload.upload_link;
      // await this.uploadVideoToVimeo(uploadUrl, videoFilePath);
      const videoId = response.data.uri.split("/").pop();
      return { data: response.data, videoId };
    } catch (error) {
      console.error("Error uploading video:", error);
      throw error;
    }
  }

  public async getVideo(videoId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting video:", error);
      throw error;
    }
  }

  public async updateVideo(videoId: string, name: string, description: string): Promise<any> {
    try {
      const response = await axios.patch(`${this.API_BASE_URL}/videos/${videoId}`, {
        name,
        description,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating video:", error);
      throw error;
    }
  }

  public async deleteVideo(videoId: string): Promise<void> {
    try {
      await axios.delete(`${this.API_BASE_URL}/videos/${videoId}`);
    } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
    }
  }

  private async getFileSize(filePath: string): Promise<number> {
    // Implementar a lógica para obter o tamanho do arquivo em bytes
    // Isso dependerá do ambiente onde o código está sendo executado
    // Pode ser um arquivo local ou em um storage
    return 0; // Substitua por implementação real
  }

  private async uploadVideoToVimeo(uploadUrl: string, videoFilePath: string): Promise<void> {
    // Implementar a lógica para fazer upload do vídeo para a URL de upload do Vimeo
    // Utilize a biblioteca `tus-js-client` ou outra de sua escolha para realizar o upload
  }
}

export default new VimeoClientService();
