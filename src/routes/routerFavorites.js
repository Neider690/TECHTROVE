const { Router } = require("express");

const getProductWishList = require("../controllers/Favorites/getProductWishList")
const addProductWishList = require("../controllers/Favorites/addProductWishList")
const deleteProductWishList = require("../controllers/Favorites/deleteProducWishList")

const routerFavorites = Router();

routerFavorites.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const favorite = await getProductWishList(id);
      res.json(favorite);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  });

routerFavorites.post("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId; // Obtén el ID del usuario de los parámetros de la ruta
      const productId = req.body.productId; // Obtén el ID del producto del cuerpo de la solicitud
  
      const addedProduct = await addProductWishList(productId, userId);
  
      if (addedProduct) {
        res.json({
          message: "The product was added to the wishlist successfully",
        });
      } else {
        res.json({
          message: "There was an issue adding the product to the wishlist",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  });

routerFavorites.delete("/", async (req, res) => {
    try {
      const { id, idUser } = req.body;
      const delFromWishList = await deleteProductWishList(id, idUser);
  
      res.json(delFromWishList);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  });

module.exports = routerFavorites;