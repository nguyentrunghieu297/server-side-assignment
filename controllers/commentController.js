const Comment = require('../models/Comment');
const Watch = require('../models/Watch');
const flash = require('connect-flash');

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

  // [POST]
  createCommentServer: async (req, res) => {
    try {
      const { rating, content } = req.body;
      const userId = req.session.userId;

      if (!userId) {
        req.flash('error', 'You must be logged in to comment');
        return res.redirect(`/auth/login`);
      }

      const watch = await Watch.findById(req.params.id).populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' },
      });

      if (watch) {
        const alreadyReviewed = watch.comments.find(
          (r) =>
            r &&
            r.author &&
            r.author.username.toString() == req.session.userName.toString()
        );

        if (alreadyReviewed) {
          req.flash('error', 'You have already reviewed this watch');
          return res.redirect(`/watch/${req.params.id}`);
        }

        const comment = new Comment({
          rating,
          content,
          author: userId,
        });
        await comment.save();
        watch.comments.push(comment._id);
        await watch.save();

        req.flash('success', 'Your comment has been added successfully');
        res.redirect(`/watch/${req.params.id}`);
      } else {
        res.status(404).json({ message: 'Watch not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error submitting feedback', error: error.message });
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
