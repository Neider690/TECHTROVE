const db = require("../../db");

const getUser = async (clientId) => {
  try {
    //const user = await db.User.findOne({ where: { clientId } });
    const user = await db.User.findByPk(clientId);
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
