import { useTranslation } from "react-i18next";
import { uploadFileInS3Bucket } from "../Services/FileUploadService/FileUploadService";
import { toastMessage } from "./toastMessages";
import axios from "axios";

export const handleFileUploadToS3Bucket = async (file) => {
  const payload = {
    fileName: file.name,
    contentType: file.type,
  };
  try {
    const res = await uploadFileInS3Bucket(payload);
    const uploadResponse = await axios.put(res.data.signedUrl, file, {
      headers: {
        "content-type": file.type,
      },
    });
    if (uploadResponse.status !== 200) {
      toastMessage("Error in uploading the file");
      return {
        error: true,
        uploadedUrl: res.data.url,
        uploadResponse,
      };
    }
    return {
      error: false,
      uploadedUrl: res.data.url,
      uploadResponse,
    };
  } catch (err) {
    console.log(err);
    toastMessage("Error in uploading the file");
    return {
      error: true,
    };
  }
};
