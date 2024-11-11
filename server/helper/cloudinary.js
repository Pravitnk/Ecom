import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const storage = new multer.memoryStorage();

const imageUpload = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};

const upload = multer({ storage });

export { imageUpload, upload };
