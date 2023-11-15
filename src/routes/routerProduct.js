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
    //console.log(name);
    let products = name ? await getAllProducts(name) : await getAllProducts();
   // //console.log(products);
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
    const imageInfoArray = [];
    const prueba = imageInfoArray
    //console.log(data, "una imagen")

    if(data.Unaimage){
      const imageProfile = await uploadImage(data.Unaimage)
      const imageInfo = {
        url: imageProfile.secure_url, 
        public_id: imageProfile.public_id, 
      };
      imageInfoArray.push(imageInfo);
      console.log(imageInfoArray, "array con una imagen")
      const newProduct = await createProduct(data, imageInfoArray,prueba);
      return res.status(200).json(newProduct);
    }
    
    for (const image of req.body.image) {
      console.log("varias imagenes")
      const imageProfile = await uploadImage(image)
      //console.log("holaaaa", imageProfile)
      //fs.unlink(req.files.image.tempFilePath)
      const imageInfo = {
        url: imageProfile.secure_url, // URL de la imagen
        public_id: imageProfile.public_id, // Public ID de la imagen
      };
    
      imageInfoArray.push(imageInfo);
    }
    

    const newProduct = await createProduct(data, imageInfoArray,prueba);
    res.status(200).json(newProduct);

    // if(req.files?.image){
    //   const imageProfile = await uploadImage(req.files.image.tempFilePath)
    //   console.log("soy newwww",newProduct)
    //   fs.unlink(req.files.image.tempFilePath)

    //   const newProduct = await createProduct(data, imageProfile);

    //   res.status(200).json(newProduct);
    // }

   
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
    const imageInfoArray = [];
    const products = await getProductById(id);
    const prueba = imageInfoArray
    console.log(data)

    if(data.Unaimage){
      const imageProfile = await uploadImage(data.Unaimage)
      const imageInfo = {
        url: imageProfile.secure_url, 
        public_id: imageProfile.public_id, 
      };
      imageInfoArray.push(imageInfo);
      const product = await putProduct(id, data, imageInfoArray);
      return res.status(200).json(product);
    }

    if(!req.body.image){
      const product = await putProduct(id, data);
      return res.status(200).json(product);
    }
  
    for (const image of req.body.image) {
      const imageProfile = await uploadImage(image)
      //console.log("holaaaa", imageProfile)
      //fs.unlink(req.files.image.tempFilePath)
      const imageInfo = {
        url: imageProfile.secure_url, // URL de la imagen
        public_id: imageProfile.public_id, // Public ID de la imagen
      };
    
      imageInfoArray.push(imageInfo);
    }

    const product = await putProduct(id, data, imageInfoArray);
    res.status(200).json(product);

    // if(!req.files?.image){
    //   const product = await putProduct(id, data);
  
    //   return res.status(200).json(product);
    // }

    // if(req.files?.image){
      
    //   const products = await getProductById(id);

    //   const imageProfile = await updateImageUser(req.files.image.tempFilePath, products.image.public_id)
    //   const {url, public_id} = imageProfile
    //   fs.unlink(req.files.image.tempFilePath)
      

    //   const product = await putProduct(id, data, url, public_id);
  
    //   res.status(200).json(product);
    // }
    
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
