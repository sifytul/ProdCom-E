import { HttpException } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as path from 'path';

export const uploadImage = async (imageFile) => {
  const imageBase64 = imageFile.buffer.toString('base64');

  const imageDataUri = `data:image/${path
    .extname(imageFile.originalname)
    .slice(1)};base64,${imageBase64}`;

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.v2.uploader.upload(imageDataUri, options);
    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error(error);
    throw new HttpException('Upload image failed', 500);
  }
};
