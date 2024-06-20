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
      const watch = await Watch.find().populate('brand');
      const brand = await Brand.find();
      const selectedBrandId = req.query.selectedBrandId || null;
      const searchQuery = req.query.searchQuery || null;

      // res.status(200).json(watch);
      res.render('home', {
        watch: multipleMongooseToObject(watch),
        brand: multipleMongooseToObject(brand),
        selectedBrandId,
        searchQuery,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getWatchAdmin: async (req, res) => {
    try {
      const watch = await Watch.find().populate('brand');
      const brand = await Brand.find();
      const selectedBrandId = req.query.selectedBrandId || null;
      const searchQuery = req.query.searchQuery || null;
      // res.status(200).json(watch);
      res.render('manage-watch', {
        watch: multipleMongooseToObject(watch),
        brand: multipleMongooseToObject(brand),
        selectedBrandId,
        searchQuery,
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
      const watch = await Watch.findById(req.params.id)
        .populate('brand')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'Member',
            select: 'username',
          },
        });

      if (!watch) {
        return res.status(404).json({ error: 'Watch not found' });
      }
      // res.status(200).json(watch);
      res.render('detail', { watch: mongooseToObject(watch) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  viewCreateWatch: async (req, res) => {
    try {
      const brand = await Brand.find();
      res.render('create-watch', { brands: multipleMongooseToObject(brand) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createWatch: async (req, res) => {
    try {
      const watch = new Watch(req.body);
      await watch.save();
      res.redirect('/admin/watch');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  viewUpdateWatch: async (req, res) => {
    try {
      const watch = await Watch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate('brand');
      const brand = await Brand.find();
      res.render('update-watch', {
        watch: mongooseToObject(watch),
        brands: multipleMongooseToObject(brand),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateWatch: async (req, res) => {
    try {
      const watch = await Watch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.redirect('/admin/watch');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteWatch: async (req, res) => {
    try {
      const watch = await Watch.findByIdAndDelete(req.params.id);
      // res.status(200).json(watch);
      res.redirect('/admin/watch');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = watchController;
