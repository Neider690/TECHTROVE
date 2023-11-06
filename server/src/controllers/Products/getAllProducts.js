const { Op } = require("sequelize");
const db = require("../../db");

const getProducts = async (name) => {

  const products = await db.Product.findAll()

  const minymayusProducts = products.map(p=>({
    name: p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    category: p.category,
    color: p.color,
    description: p.description,
    image: p.image,
    isAvailible: p.isAvailible,
    price: p.price,
    stock: p.stock,
    rating: p.rating,
    averageRating: p.averageRating,
    discount: p.discount,
  }))

  
  if (name) {
    const productName = minymayusProducts.filter(objeto => 
      objeto.name.toLowerCase().includes(name.toLowerCase()))
    // startsWith(name)

      if (productName.length===0) {
        console.log("algoooo");
        return "Product no found";
      }

    return productName;
  } 

  return products;
};

module.exports = getProducts;
