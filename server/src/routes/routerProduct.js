const { Router, query } = require("express");
const getProductFilter = require("../controllers/Products/getProductFilter");
const getAllProducts = require("../controllers/Products/getAllProducts");
const getProductById = require("../controllers/Products/getProductById");
const createProduct = require("../controllers/Products/createProduct");
const putProduct = require("../controllers/Products/putProducts");
const putRatingProducts = require("../controllers/Products/putRatingProducts");
const deleProductById = require("../controllers/Products/deleProductById");
const fileUpload = require("express-fileupload");
const fs = require("fs-extra")
const {uploadImage, updateImageUser} = require("../utils/helpers/Cloudinary/cloudinary")

const router = Router();


//productos filtrados
router.get("/filter", async (req, res) => {
  try {
    const { category, min, max, order } = req.query;

    let products = await getProductFilter(category,min,max,order,);
      res.status(200).json(products);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
  }
});

/*----            Traer productos             ----*/
router.get("/", async (req, res) => {
  try {
    const { name } = req.query; 
    console.log(name);
    let products = name ? await getAllProducts(name) : await getAllProducts();
   // console.log(products);
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});


//get product id
  router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ mensaje: "Product not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/*----            Crear producto               ----*/

router.post("/create", fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}), async (req, res) => {
  try {
    const data = req.body;

    if(req.files?.image){
      const imageProfile = await uploadImage(req.files.image.tempFilePath)
      fs.unlink(req.files.image.tempFilePath)

      const newProduct = await createProduct(data, imageProfile);

      res.status(200).json(newProduct);
    }

   
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/*----               Modificar producto          ----*/
router.put("/update/:id", fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if(req.files?.image){
      
      const products = await getProductById(id);

      const imageProfile = await updateImageUser(req.files.image.tempFilePath, products.image.public_id)
      const {url, public_id} = imageProfile
      fs.unlink(req.files.image.tempFilePath)
      

      const product = await putProduct(id, data, url, public_id);
  
      res.status(200).json(product);
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/*----                   Rating                  ----*/

router.put("/rating/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;



    const product = await putRatingProducts(id, rating);
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/*----          Borrado logico producto          ----*/

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleProductById(id);
    res.status(200).json({ message: "Product successfully removed" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error deleting product" });
  }
});

module.exports = router;
