// import * as cloudinary from 'cloudinary';

// export const uploadimages = async (file) => {
//   try {
//     cloudinary.v2.config({
//       cloud_name: process.env.cloudinary_name,
//       api_key: process.env.cloudinary_api_key,
//       api_secret: process.env.cloudinary_api_secret,
//     });
//     let cld_upload_stream: any = cloudinary.v2.uploader
//       .upload_stream({ folder: 'avatar' }, (err, result) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log('file data: ', result);
//         // if (result) {
//         //   return {
//         //     public_id: result.public_id,
//         //     url: result.secure_url,
//         //   };
//         // }
//       })
//       .end(file.buffer);
//     // console.log(cld_upload_stram);
//     // const uploadedfiles = [];
//     // for (const file of object.values(files)) {
//     //   console.log('uploading file => ', file.name);
//     //   const result = await cloudinary.v2.uploader.upload(file.tempfilepath);
//     //   uploadedfiles.push(result.secure_url);
//     // }
//     // return uploadedfiles;
//     // console.log(cld_upload_stream);
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };
