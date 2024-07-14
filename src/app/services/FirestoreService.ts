import { FirebaseCollections } from "@/utils/Constants";
import Logger from "@/utils/Logger";
import { IQuery } from "@/app/services/ServiceDaos";
import FirebaseConfig from "@/app/services/FirebaseConfig";

class FirestoreService {
  private readonly LOG_TAG = "FirestoreService";

  public async getDocumentById(collection: FirebaseCollections, id?: string | null) {
    await this.waitForFirestore();
    Logger.info(this.LOG_TAG, `Getting document by id: ${id}`);

    try {
      if (!id) {
        Logger.error(this.LOG_TAG, "Document id is required");
        return null;
      }

      const documentReference = FirebaseConfig.firestoreDB.collection(collection).doc(id);
      const documentSnapshot = await documentReference.get();

      if (!documentSnapshot.exists) {
        Logger.error(this.LOG_TAG, `Document not found by id:`, [id, collection]);
        return null;
      }

      return documentSnapshot.data();
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting document by id:`, [id, error]);
      return null;
    }
  }

  public async getDocumentsByQuery<T>(collection: FirebaseCollections, query: IQuery): Promise<T[]> {
    await this.waitForFirestore();
    Logger.info(this.LOG_TAG, `Getting documents by query:`, [query]);

    try {
      const collectionReference = FirebaseConfig.firestoreDB.collection(collection);
      const querySnapshot = await collectionReference.where(query.field, query.operator, query.value).get();

      if (querySnapshot.empty) {
        Logger.error(this.LOG_TAG, `Documents not found by query`, [query, collectionReference, querySnapshot]);
        return [];
      }

      return querySnapshot.docs.map((doc) => doc.data()) as T[];
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting documents by query: ${query}`, error);
      return Promise.reject(error);
    }
  }

  public async saveDocument<T>(collection: FirebaseCollections, data: T, id?: string) {
    await this.waitForFirestore();
    Logger.info(this.LOG_TAG, `Saving document to collection: ${collection}`);

    try {
      const collectionReference = FirebaseConfig.firestoreDB.collection(collection);

      const documentId = id || collectionReference.doc().id;

      await collectionReference.doc(documentId).set({
        ...data,
        createdAt: new Date().toISOString(),
      });

      Logger.info(this.LOG_TAG, `Document saved to collection: ${collection}`);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error saving document to collection: ${collection}`, error);
      return Promise.reject(error);
    }
  }

  public async getDocumentRefById(collection: FirebaseCollections, id: string | null) {
    await this.waitForFirestore();
    Logger.info(this.LOG_TAG, `Getting document reference by id: ${id}`);

    try {
      if (!id) {
        Logger.error(this.LOG_TAG, "Document id is required");
        return null;
      }

      return FirebaseConfig.firestoreDB.collection(collection).doc(id);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting document reference by id: ${id}`, error);
      return null;
    }
  }

  private async waitForFirestore() {
    if (!FirebaseConfig.checkFirestoreDB()) {
      Logger.debug(this.LOG_TAG, "Waiting for Firestore to initialize");
      await FirebaseConfig.initialize();
    }
  }
}

export default new FirestoreService();
