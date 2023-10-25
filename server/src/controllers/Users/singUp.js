const db = require("../../db");
const { sendRegistrationEmail } = require("../../utils/email");

const signUp = async (clientId, name, email, photo) => {
  const newUser = await db.User.create({
    clientId,
    name,
    email,
    photo,
  });

  sendRegistrationEmail(newUser.clientId);

  return newUser;
};

module.exports = signUp;
