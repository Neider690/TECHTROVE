const getAllProducts = require("../controllers/Products/getAllProducts");
const {Router} = require("express")

const routerProduct = Router();

// routerProduct.get("/", async (req, res) =>{
//   try {
//       const users = await getAllProducts()
//       res.status(200).json(users)
//   } catch (error) {
//       res.status(404).json(error.message)   
//   }
// })

routerProduct.get("/", async (req, res) => {
  try {
    const { name } = req.query;

  
    let products = name ? await getAllProducts(name) : await getAllProducts();

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = routerProduct;