const Brand = require('../models/Brand');

const brandController = {
  getBrand: async (req, res) => {
    try {
      const brands = await Brand.find();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBrandById: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createBrand: async (req, res) => {
    try {
      const brand = new Brand(req.body);
      await brand.save();
      res.status(201).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateBrand: async (req, res) => {
    try {
      const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBrand: async (req, res) => {
    try {
      const brand = await Brand.findByIdAndDelete(req.params.id);
      res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = brandController;
