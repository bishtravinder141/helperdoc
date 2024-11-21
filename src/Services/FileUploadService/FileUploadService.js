import { APIAxios, FormAxios } from "../../Config/APIConfig";
import { UPLOAD_FILE_IN_S3 } from "../../Config/APIUrls";

// Upload file in s3 bucket
export const uploadFileInS3Bucket = async (payload) =>
  await APIAxios.post(UPLOAD_FILE_IN_S3, payload);
