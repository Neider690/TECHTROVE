const db = require("../../db");

const generateSKU = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;
  let sku = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters.charAt(randomIndex);
  }
  return sku;
};

const createProduct = async (data, imageProfile, imageInfoArray, prueba) => {
  //console.log(prueba, "prueeee")
  const product = {
    ...data,
    id: data.SKU ? data.SKU : generateSKU(),
    //image: {url: imageProfile.url, public_id: imageProfile.public_id},
    imageCloudinary: imageInfoArray
  };
  //console.log(product, "ololololo-----------------------------------")

  let {
    id,
    name,
    category,
    description,
    price,
    stock,
    SKU,
    brand,
    discount,
    rating,
    averageRating,
    isAvailable,
    imageCloudinary
  } = product;

  const newProduct = await db.Product.create({
    id,
    name,
    brand,
    category,
    description,
    price,
    stock,
    SKU,
    discount,
    rating,
    averageRating,
    isAvailable,
    imageCloudinary
  });
  //console.log(newProduct, "newwwwww----")
  return newProduct;
};

module.exports = createProduct;
