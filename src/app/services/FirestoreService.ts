import { FirebaseCollections } from "@/utils/Constants";
import Logger from "@/utils/Logger";
import { firestoreDB } from "@/utils/firebaseConfig";

class FirestoreService {
  private readonly LOG_TAG = "FirestoreService";

  public async getDocumentById(collection: FirebaseCollections, id?: string | null) {
    Logger.info(this.LOG_TAG, `Getting document by id: ${id}`);

    try {
      if (!id) {
        Logger.error(this.LOG_TAG, "Document id is required");
        return null;
      }

      const documentReference = firestoreDB.collection(collection).doc(id);
      const documentSnapshot = await documentReference.get();

      if (!documentSnapshot.exists) {
        Logger.error(this.LOG_TAG, `Document not found by id: ${id}`);
        return null;
      }

      return documentSnapshot.data();
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting document by id: ${id}`, error);
      return null;
    }
  }

  public async saveDocument<T>(collection: FirebaseCollections, data: T, id?: string) {
    Logger.info(this.LOG_TAG, `Saving document to collection: ${collection}`);

    try {
      const collectionReference = firestoreDB.collection(collection);

      const documentId = id || collectionReference.doc().id;

      await collectionReference.doc(documentId).set({
        ...data,
        createdAt: new Date().toISOString(),
      });

      Logger.info(this.LOG_TAG, `Document saved to collection: ${collection}`);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error saving document to collection: ${collection}`, error);
    }
  }
}

export default new FirestoreService();
