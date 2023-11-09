const { User, Product, Cart,  } = require("../../db");

const getCart = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (!userId) {
      return res.status(400).json({ message: "Falta el ID de usuario." });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Buscar todos los productos en el carrito del usuario con sus cantidades y tallas
    const cartProducts = await Cart.findAll({
      where: { userId },
      attributes: ["id", "productId", "quantity"], // Incluye el ID del carrito
    });

    if (!cartProducts || cartProducts.length === 0) {
      return res.status(200).json([]);
    }

    // Usar Promise.all para manejar las promesas de manera paralela
    const resultProducts = await Promise.all(
      cartProducts.map(async (cartProduct) => {
        const productId = cartProduct.productId;
        const quantity = cartProduct.quantity;

        // Buscar el producto correspondiente en la base de datos
        const product = await Product.findByPk(productId);

        if (!product) {
          return res.status(404).json({ message: "Product not found." }); // Manejo de producto no encontrado, puedes personalizar esto
        }

        // Crear una copia del producto para evitar sobrescribirlo
        const productCopy = { ...product.dataValues };

        // Agregar la cantidad y el stock al producto
        productCopy.cantidad = quantity;
        productCopy.productId = productId;

        // Agregar el ID del carrito al producto
        productCopy.id = cartProduct.id;


        return productCopy;
      })
    );

    // Filtrar los productos nulos si es necesario (productos no encontrados)
    const filteredProducts = resultProducts.filter(
      (product) => product !== null
    );

    return res.status(200).json(filteredProducts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCart;
