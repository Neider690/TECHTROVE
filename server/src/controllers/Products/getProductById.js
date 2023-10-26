const db = require("../../db");

const getProductById = async (id) => {
  const products = await db.Product.findByPk(id);

  return products;
};

module.exports = getProductById;
