import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";
dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadFile = async (file, fileName) => {
  try {
    const response = await imagekit.files.upload({
      file,
      fileName,
    });
    return response;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Image upload failed: " + error.message);
  }
};