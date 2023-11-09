require("dotenv").config();
const cloudinary = require('cloudinary').v2

const { CLOUD_NAME, API_CLOUDINARY_KEY, API_CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_CLOUDINARY_KEY,
  api_secret: API_CLOUDINARY_SECRET,
});

const uploadImage = async function uploadImage(filePath) {
  console.log("filePath",filePath);
  return await cloudinary.uploader.upload(filePath, {
      folder: 'techtroveimages'
  })
}

const deleteImage = async function deleteImage(public_id) {
  await cloudinary.uploader.destroy(public_id)
}

const updateImageUser = async function updateImageUser(filePath, public_id) {
  return await cloudinary.uploader.upload(filePath, {
      public_id: public_id,
      overwrite: true
  })
}

module.exports = {
  uploadImage,
  deleteImage,
  updateImageUser
}
