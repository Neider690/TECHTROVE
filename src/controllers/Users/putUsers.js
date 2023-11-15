//const bcryptjs = require("bcryptjs");
const db = require("../../db");
const { uploadImgUser } = require("../../utils/helpers/Cloudinary/cloudinary");

const updateUser = async (clientId, data, url, public_id) => {
  const user = await db.User.findByPk(clientId);

  if (!user) throw new Error("User not found");

  

  if (data.wishlist) {
    const elementosWishlist = data.wishlist.split(",");

    const watchlist = []; // Esto debería ser recuperado de tu base de datos, no creado cada vez
  
    elementosWishlist.forEach((elemento) => {
      const id = elemento.trim();
  
      // Agregar cada elemento al array watchlist como un objeto con la propiedad 'id'
      watchlist.push({
        id: id,
        // Puedes agregar más propiedades según tus necesidades
      });
    });
  
    // Suponiendo que 'user' es tu objeto que representa un usuario y tiene el campo 'watchlist'
    user.watchlist = watchlist;
  
    // Actualizar el campo 'watchlist' en la base de datos
    await user.save(); // Esto depende de tu implementación específica de base de datos
  
    return user;
  }

  if (!url) {
    let updateProduct = { ...data, image: user.image };
    await user.update(updateProduct); 
    return user;   
  }

  let updateProduct = { ...data, image: {url:url, public_id:public_id} };

  await user.update({ ...user, ...updateProduct });

  return user;
};

module.exports = updateUser;
