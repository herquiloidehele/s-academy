import FirestoreService from "@/app/backend/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import { IQuery } from "@/app/backend/services/ServiceDaos";

export async function getDocumentById<T>(
  collection: FirebaseCollections | string,
  id?: string | null,
): Promise<T | null> {
  return await FirestoreService.getDocumentById(collection, id);
}

export async function getDocuments<T>(collection: FirebaseCollections | string) {
  return await FirestoreService.getDocuments<T>(collection);
}

export async function getDocumentsByQuery<T>(collection: FirebaseCollections, query: IQuery): Promise<T[]> {
  return await FirestoreService.getDocumentsByQuery<T>(collection, query);
}

export async function getDocumentSubCollection<T>(
  collection: FirebaseCollections,
  docId: string,
  subCollection: FirebaseCollections,
) {
  return await FirestoreService.getDocumentSubCollection<T>(collection, docId, subCollection);
}

export async function addDocumentToSubCollection<T>(
  collection: FirebaseCollections | string,
  docId: string,
  subCollection: FirebaseCollections | string,
  data: T,
) {
  return await FirestoreService.addDocumentToSubCollection<T>(collection, docId, subCollection, data);
}

export async function saveDocument<T>(collection: FirebaseCollections | string, data: T, id?: string) {
  return await FirestoreService.saveDocument<T>(collection, data, id);
}

export async function getDocumentRefById(collection: FirebaseCollections, id: string | null) {
  return await FirestoreService.getDocumentRefById(collection, id);
}
