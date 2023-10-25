const db = require("../../db");

const getUser = async (clientId) => {
  try {
    console.log(db.User)
    const user = await db.User.findOne({ where: { clientId } });
    console.log(user)
    if (!user) {
      throw new Error("User not found");
    }else{
      return user;
    }
    
  } catch (error) {
    throw error;
  }
};

module.exports = {getUser};
