const router = require('express').Router();
const commentController = require('../controllers/commentController');
const {
  verifyTokenAndUserAuthorization,
} = require('../controllers/middlewareController');

// [GET] /comment
router.get('/', commentController.getComment);

// [GET] /comment/:id
router.get('/:id', commentController.getCommentById);

// [POST] /comment
router.post('/', commentController.createComment);

// [PUT] /comment/:id
router.put(
  '/:id',
  verifyTokenAndUserAuthorization,
  commentController.updateComment
);

// [DELETE] /comment/:id
router.delete(
  '/:id',
  verifyTokenAndUserAuthorization,
  commentController.deleteComment
);

module.exports = router;
