import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";


export const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {folder: "event-ticket-api",
          public_id: uuidv4(),
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        }
      )
      .end(fileBuffer);
  });
};