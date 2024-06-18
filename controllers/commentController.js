const Comment = require('../models/Comment');

const commentController = {
  // [GET] /comment
  getComment: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // [GET] /comment/:id
  getCommentById: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id).populate('author');
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // [POST] /comment
  createComment: async (req, res) => {
    try {
      const comment = new Comment(req.body);
      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // [PUT] /comment/:id
  updateComment: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // [DELETE] /comment/:id
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = commentController;
