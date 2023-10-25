//const bcryptjs = require("bcryptjs");
const db = require("../../db");
const { uploadImgUser } = require("../../utils/helpers/Cloudinary/cloudinary");

const updateUser = async (clientId, data, fileUrl, filePath) => {
  const user = await db.User.findOne({
    where: { clientId },
  });

  if (!user) throw new Error("User not found");

  let updateProduct = { ...data };

  if (filePath || fileUrl) {
    const result = filePath
      ? await uploadImgUser(filePath)
      : await uploadImgUser(fileUrl);
    updateProduct = {
      ...updateProduct,
      photo: result.photo,
    };
  }

  await user.update({ ...user, ...updateProduct });

  return user;
};

module.exports = updateUser;
