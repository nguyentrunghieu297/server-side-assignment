const Brand = require('../models/Brand');
const Watch = require('../models/Watch');
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

const brandController = {
  getBrand: async (req, res) => {
    try {
      const brands = await Brand.find();
      // res.status(200).json(brands);
      res.render('manage-brand', { brands: multipleMongooseToObject(brands) });
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

  viewCreateBrand: async (req, res) => {
    try {
      res.render('create-brand');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createBrand: async (req, res) => {
    try {
      const brand = new Brand(req.body);
      await brand.save();
      // res.status(201).json(brand);
      res.redirect('/admin/brand');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  viewUpdateBrand: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      res.render('update-brand', { brand: mongooseToObject(brand) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateBrand: async (req, res) => {
    try {
      const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      // res.status(200).json(brand);
      res.redirect('/admin/brand');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBrand: async (req, res) => {
    try {
      const watch = await Watch.findOne({ brand: req.params.id });
      if (watch) {
        return res.redirect('/admin/brand');
      } else {
        await Brand.findByIdAndDelete(req.params.id);
        return res.redirect('/admin/brand');
      }
      // res.status(200).json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = brandController;
