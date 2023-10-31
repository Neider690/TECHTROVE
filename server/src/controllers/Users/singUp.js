const db = require("../../db");
const { sendRegistrationEmail } = require("../../utils/email");

const signUp = async (clientId, name, email, imageProfile) => {
  const newUser = await db.User.create({
    clientId,
    name,
    email,
    image:{url: imageProfile.url, public_id: imageProfile.public_id},
  });

  sendRegistrationEmail(newUser.clientId);

  return newUser;
};

module.exports = signUp;
