const db = require("../../db");

const putProduct = async (id, data, url, public_id) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("Product not found");

  let updateProduct = { ...data, image: {url:url, public_id:public_id} };

  await product.update(updateProduct);

  return product;
};

module.exports = putProduct;
