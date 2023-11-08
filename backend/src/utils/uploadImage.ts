import { HttpException } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as path from 'path';

export const uploadImage = async (
  imageFile: Express.Multer.File,
  folder?: string,
) => {
  const imageBase64 = imageFile.buffer.toString('base64');

  const imageDataUri = `data:image/${path
    .extname(imageFile.originalname)
    .slice(1)};base64,${imageBase64}`;

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: folder || 'avatar',
  };

  try {
    const result = await cloudinary.v2.uploader.upload(imageDataUri, options);
    return {
      success: true,
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message,
    };
    // throw new HttpException('Upload image failed', 500);
  }
};

type TImage = {
  success: boolean;
  public_id?: string;
  url?: string;
  error?: string;
};

export const uploadMultipleImages = async (
  imageFiles: Array<Express.Multer.File>,
) => {
  const images: TImage[] = [];

  for (const imageFile of imageFiles) {
    const imageBase64 = imageFile.buffer.toString('base64');

    const imageDataUri = `data:image/${path
      .extname(imageFile.originalname)
      .slice(1)};base64,${imageBase64}`;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'products',
    };

    try {
      const result = await cloudinary.v2.uploader.upload(imageDataUri, options);
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
        success: true,
      });
    } catch (error) {
      console.error(error);
      images.push({
        success: false,
        error: error.message,
      });
    }
  }
  return images;
};

export const deleteImage = async (public_id: string) => {
  try {
    await cloudinary.v2.uploader.destroy(public_id);
  } catch (error) {
    console.error(error);
    throw new HttpException('Delete image failed', 500);
  }
};
