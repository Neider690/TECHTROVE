const { Router } = require("express");
const brandsController = require("../controllers/Brands/BrandController");

const router = Router();

// Obtener todas las marcas
router.get("/", brandsController.getBrands);

// Crear una nueva marca
router.post("/", brandsController.createBrand);

// Actualizar una marca existente
router.put("/:id", brandsController.updateBrand);

// Eliminar una marca
router.delete("/delete/:id", brandsController.deleteBrand);

router.get("/:name", brandsController.getBrandByName);

// Buscar una marca por ID
router.get("/:id", brandsController.getBrandById);

module.exports = router;
