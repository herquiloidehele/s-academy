import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "@firebase/storage";

export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
export function getCategoryLabel(value: string): string {
  const category = useCourseStore.getState?.().categoriesOptions.find((option) => option.value === value);
  return category ? category.label : "Categoria desconhecida";
}

export async function uploadFile(file: File): Promise<string> {
  const storage = getStorage();
  const storageRef = ref(storage, "uploads/" + file.name);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload error: ", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      },
    );
  });
}
