const Watch = require('../models/Watch');

const watchController = {
  getWatch: async (req, res) => {
    try {
      const watch = await Watch.find();
      res.status(200).json(watch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getWatchById: async (req, res) => {
    try {
      const watch = await Watch.findById(req.params.id).populate('brand');
      res.status(200).json(watch);
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
