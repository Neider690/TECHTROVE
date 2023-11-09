const db = require("../../db");

const createOrder = async (data) => {
  const { userId, paymentId, status, total, products, preferenceId } = data;
console.log("USERDID EN EL BACKKKK", userId)
console.log("TTOOOTAL  EN EL BACKKKK", total)
  const newOrder = await db.Order.create({
    paymentId,
    status,
    total,
    products,
    preferenceId,
    userId
  });

  // if (userId) {
  //   const user = await db.User.findByPk(userId);

  //   if (user) {
  //     await newOrder.setUser(userId);
  //     return newOrder;
  //   } else {
  //     throw new Error("The user was not found in the database.");
  //   }
  // } else {
     return newOrder;
  // }
};

module.exports = createOrder;
