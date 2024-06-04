import { FILE_EXTENSIONS } from "@/constants/file";

export const getFileExtension = (fileName) => {
  if (fileName) {
    return fileName.split(".").pop();
  }
  return null;
};

export const checkIsPDForImage = (fileName) => {
  const fileExtension = getFileExtension(fileName);

  if (fileExtension === FILE_EXTENSIONS.pdf) return true;
  if (Object.keys(FILE_EXTENSIONS.images).includes(fileExtension)) return true;

  return false;
};

export const downloadFile = (url) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

export const imageUrlToBlob = (imageUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
      const file = new File([blob], "cropped.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
      resolve(file);
    } catch (error) {
      reject(error);
    }
  });
};
