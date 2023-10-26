const { Router, query } = require("express");
const getFilteredProductsHandler = require("../controllers/Products/getProductFilter");
const getAllProducts = require("../controllers/Products/getAllProducts");
const getProductById = require("../controllers/Products/getProductById");
const createProduct = require("../controllers/Products/createProduct");

const router = Router();


//productos filtrados
router.get("/filter", async (req, res) => {
  try {
    const { category, min, max, order } = req.query;

    let products = await getFilteredProductsHandler(
      category,
      min,
      max,
      order,

    );
    if (products.results.length === 0) {
      res
        .status(400)
        .json({ mensaje: "There are no products matching the filters" });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

/*----            Traer productos             ----*/
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    let products = name ? await getAllProducts(name) : await getAllProducts();

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

router.post("/create", async (req, res) => {
  try {
    const data = req.body;

    const newProduct = await createProduct(data);

    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/*----               Modificar producto          ----*/
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = await putProduct(id, data);

    res.status(200).json(product);
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

    const product = await putRatingProduct(id, rating);
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
    await deleteProduct(id);
    res.status(200).json({ message: "Product successfully removed" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error deleting product" });
  }
});

module.exports = router;