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
