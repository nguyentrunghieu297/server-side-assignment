const router = require('express').Router();
const commentController = require('../controllers/commentController');

// [GET] /comment
router.get('/', commentController.getComment);

// [GET] /comment/:id
router.get('/:id', commentController.getCommentById);

// [POST] /comment
router.post('/', commentController.createComment);

// [PUT] /comment/:id
router.put('/:id', commentController.updateComment);

// [DELETE] /comment/:id
router.delete('/:id', commentController.deleteComment);

module.exports = router;
