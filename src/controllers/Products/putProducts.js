const db = require("../../db");

const putProduct = async (id, data, imageInfoArray, prueba) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("Product not found");

  // if(!url){
  //   let updateProduct = {...data,
  //     image: product.image
  //   };
  //   await product.update(updateProduct);

  //   return product;
  // }
  if(!imageInfoArray){
    let updateProduct = { ...data, image:product.image};
    await product.update(updateProduct);

    return product;
  }

  let updateProduct = { ...data, image:null, imageCloudinary: imageInfoArray };

  await product.update(updateProduct);

  return product;
};

module.exports = putProduct;
