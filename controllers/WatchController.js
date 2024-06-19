const Watch = require('../models/Watch');
const Brand = require('../models/Brand');
const mongoose = require('mongoose');
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

const watchController = {
  getWatch: async (req, res) => {
    try {
      const watch = await Watch.find();
      const brand = await Brand.find();
      const selectedBrandId = req.query.selectedBrandId || null;
      // res.status(200).json(watch);
      res.render('home', {
        watch: multipleMongooseToObject(watch),
        brand: multipleMongooseToObject(brand),
        selectedBrandId,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getWatchById: async (req, res) => {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
      if (!isValidObjectId) {
        return res.status(400).json({ error: 'Invalid Object ID' });
      }
      const watch = await Watch.findById(req.params.id).populate('brand');
      // res.status(200).json(watch);
      res.render('detail', { watch: mongooseToObject(watch) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createWatch: async (req, res) => {
    try {
      const watch = new Watch(req.body);
      await watch.save();
      res.status(201).json(watch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateWatch: async (req, res) => {
    try {
      const watch = await Watch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(watch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteWatch: async (req, res) => {
    try {
      const watch = await Watch.findByIdAndDelete(req.params.id);
      res.status(200).json(watch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = watchController;
