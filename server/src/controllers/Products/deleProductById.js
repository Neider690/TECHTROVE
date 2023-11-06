const db = require('../../db');

const deleteProduct = async (productId) => {
  const product = await db.Product.findByPk(productId);

  if (!product) throw new Error('Product not found');

  if (!product.isAvailible) throw new Error('Product is already deleted');

  product.isAvailible = false;
  await product.save();
};

module.exports = deleteProduct;