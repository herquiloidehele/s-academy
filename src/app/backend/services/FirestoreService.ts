import { FirebaseCollections } from "@/utils/Constants";
import Logger from "@/utils/Logger";
import { IQuery } from "@/app/backend/services/ServiceDaos";
import FirebaseConfig from "@/app/backend/services/FirebaseConfig";

class FirestoreService {
  private readonly LOG_TAG = "FirestoreService";

  public async getDocumentById<T>(collection: FirebaseCollections | string, id?: string | null): Promise<T | null> {
    await this.waitForFirestore();
    Logger.debug(this.LOG_TAG, `Getting document by id: ${id}`);

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

      return {
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
        createdAt: documentSnapshot.createTime?.toDate()?.toISOString(),
      } as T;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting document by id:`, [id, error]);
      return null;
    }
  }

  public async getDocuments<T>(collection: FirebaseCollections | string) {
    await this.waitForFirestore();
    Logger.debug(this.LOG_TAG, `Getting documents from collection: ${collection}`);

    try {
      const collectionReference = FirebaseConfig.firestoreDB.collection(collection);
      const collectionSnapshot = await collectionReference.get();

      if (collectionSnapshot.empty) {
        Logger.warn(this.LOG_TAG, `Documents not found in collection: ${collection}`);
        return [];
      }

      return collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as T[];
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting documents from collection: ${collection}`, error);
      return [];
    }
  }

  public async getDocumentsByQuery<T>(collection: FirebaseCollections, query: IQuery): Promise<T[]> {
    await this.waitForFirestore();
    Logger.debug(this.LOG_TAG, `Getting documents by query:`, [query]);

    try {
      const collectionReference = FirebaseConfig.firestoreDB.collection(collection);
      const querySnapshot = await collectionReference.where(query.field, query.operator, query.value).get();

      if (querySnapshot.empty) {
        Logger.warn(this.LOG_TAG, `Documents not found by query`, [query, collectionReference, querySnapshot]);
        return [];
      }

      return querySnapshot.docs.map((doc) => doc.data()) as T[];
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting documents by query: ${query}`, error);
      return [];
    }
  }

  public async getDocumentSubCollection<T>(
    collection: FirebaseCollections,
    docId: string,
    subCollection: FirebaseCollections,
  ) {
    await this.waitForFirestore();
    Logger.debug(this.LOG_TAG, `Getting sub collection: ${subCollection} for document: ${docId}`);

    try {
      const documentReference = FirebaseConfig.firestoreDB.collection(collection).doc(docId);
      const subCollectionSnapshot = await documentReference.collection(subCollection).get();

      if (subCollectionSnapshot.empty) {
        Logger.warn(this.LOG_TAG, `Sub collection not found for document: ${docId}`, [
          subCollection,
          documentReference,
        ]);
        return [];
      }

      return subCollectionSnapshot.docs.map((doc) => doc.data()) as T[];
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting sub collection for document: ${docId}`, error);
      return [];
    }
  }

  public async addDocumentToSubCollection<T>(
    collection: FirebaseCollections | string,
    docId: string,
    subCollection: FirebaseCollections | string,
    data: T,
  ) {
    await this.waitForFirestore();
    Logger.debug(this.LOG_TAG, `Adding document to sub collection: ${subCollection} for document: ${docId}`);

    try {
      const documentReference = FirebaseConfig.firestoreDB.collection(collection).doc(docId);
      const subCollectionReference = documentReference.collection(subCollection);

      await subCollectionReference.add({
        ...data,
        createdAt: new Date().toISOString(),
      });

      Logger.debug(this.LOG_TAG, `Document added to sub collection: ${subCollection} for document: ${docId}`);
    } catch (error) {
      Logger.error(
        this.LOG_TAG,
        `Error adding document to sub collection: ${subCollection} for document: ${docId}`,
        error,
      );
      return Promise.reject(error);
    }
  }

  public async saveDocument<T>(collection: FirebaseCollections | string, data: T, id?: string) {
    await this.waitForFirestore();
    Logger.debug(this.LOG_TAG, `Saving document to collection: ${collection}`);

    try {
      const collectionReference = FirebaseConfig.firestoreDB.collection(collection);

      const documentId = id || collectionReference.doc().id;

      Logger.debug(this.LOG_TAG, `Document id: ${documentId}`);

      await collectionReference.doc(documentId).set({
        ...data,
        createdAt: new Date().toISOString(),
      });

      Logger.debug(this.LOG_TAG, `Document saved to collection: ${collection}`);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error saving document to collection: ${collection}`, error);
      return Promise.reject(error);
    }
  }

  public async getDocumentRefById(collection: FirebaseCollections, id: string | null) {
    await this.waitForFirestore();
    Logger.debug(this.LOG_TAG, `Getting document reference by id: ${id}`);

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
