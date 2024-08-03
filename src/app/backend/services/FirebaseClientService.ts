import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Logger from "@/utils/Logger";
import { firebaseClientApp } from "@/app/backend/services/FirebaseClientConfig";

class FirebaseClientService {
  private storage = getStorage(firebaseClientApp);

  public async uploadFile(file: File, folder = "files"): Promise<string> {
    const LOG_TAG = "FirebaseClientService";
    Logger.debug(LOG_TAG, `Uploading file...`, { file });

    const filename = file.name || `file_${new Date().toISOString()}`;
    const fileRef = ref(this.storage, `${folder}/${filename}`);

    try {
      const snapshot = await uploadBytes(fileRef, file);
      Logger.debug(LOG_TAG, `Uploaded file successfully!`, { filename });

      const downloadURL = await getDownloadURL(snapshot.ref);
      Logger.debug(LOG_TAG, `File download URL`, { downloadURL });

      return downloadURL;
    } catch (error) {
      Logger.error(LOG_TAG, `Error uploading file`, error);
      throw error;
    }
  }
}

export default new FirebaseClientService();
