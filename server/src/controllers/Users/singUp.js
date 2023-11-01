const db = require("../../db");
const { sendRegistrationEmail } = require("../../utils/email");

const signUp = async (user) => {
  // const newUser = await db.User.create({
  //   // clientId,
  //   // name,
  //   // email,
  //   // image:{url: imageProfile.url, public_id: imageProfile.public_id},
  //     name: user.name,
  //     username: user.nickname,
  //     email: user.email,
  //     image: user.picture 
     
  // });

  const [userFound, userCreated] = await db.User.findOrCreate({
    where: { email: user.email, },
    defaults: {
      name: user.name,
      username: user.nickname,
      email: user.email,
      image: user.picture 
    }
  });

  //sendRegistrationEmail(newUser.clientId);

  return (userFound ? userFound : userCreated);
};

module.exports = signUp;
