const db = require('../../db');
const avgRating = require('../../utils/helpers/Average/ratingAvera');

const ratingProduct = async (id, rating) => {
  try {
    const product = await db.Product.findByPk(id);

    if (!product) {
      throw new Error('Product not found');
    }

    let newRating = [...product.rating, rating];

    // Limita el tamaño del array de ratings a 50
    if (newRating.length > 50) {
      newRating = newRating.slice(newRating.length - 50);
    }

    // Actualiza el producto con la nueva calificación y recalcula el averageRating
    await product.update({
      rating: newRating,
      averageRating: avgRating(newRating),
    });

    return product;
  } catch (error) {
    throw new Error('Error updating product rating');
  }
};

module.exports = ratingProduct;
