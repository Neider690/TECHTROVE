//const bcryptjs = require("bcryptjs");
const db = require("../../db");
const { uploadImgUser } = require("../../utils/helpers/Cloudinary/cloudinary");

const updateUser = async (clientId, data, url, public_id) => {
  const user = await db.User.findByPk(clientId);

  if (!user) throw new Error("User not found");

  let updateProduct = { ...data, image: {url:url, public_id:public_id} };

  await user.update({ ...user, ...updateProduct });

  return user;
};

module.exports = updateUser;
