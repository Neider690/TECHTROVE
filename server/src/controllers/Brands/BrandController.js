const db = require("../../db");

// Obtener todas las marcas
const getBrands = async (req, res) => {
  try {
    const brands = await db.Brands.findAll();
    res.status(200).json(brands);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
};

// Crear una nueva marca
const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const newBrand = await db.Brands.create({ name });
    res.status(201).json(newBrand);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error al crear una nueva marca" });
  }
};

// Actualizar una marca existente
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await db.Brands.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    brand.name = name;
    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error al actualizar la marca" });
  }
};

// Eliminar una marca
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await db.Brands.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    await brand.destroy();
    res.status(200).json({ message: "Marca eliminada exitosamente" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error al eliminar la marca" });
  }
};

const getBrandByName = async (req, res) => {
    try {
      const { name } = req.params;
      const brand = await db.Brands.findOne({ where: { name } });
  
      if (!brand) {
        return res.status(404).json({ error: "Marca no encontrada" });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Error al buscar la marca por nombre" });
    }
  };
  
  // Buscar una marca por ID
  const getBrandById = async (req, res) => {
    try {
      const { id } = req.params;
      const brand = await db.Brands.findByPk(id);
  
      if (!brand) {
        return res.status(404).json({ error: "Marca no encontrada" });
      }
  
      res.status(200).json(brand);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Error al buscar la marca por ID" });
    }
  };
  
  module.exports = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    getBrandByName,
    getBrandById,
  };