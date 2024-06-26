const router = require('express').Router();
const watchController = require('../controllers/WatchController');
const commentController = require('../controllers/commentController');
const { verifyTokenAndAdmin } = require('../controllers/middlewareController');

// [POST] /watch
router.post('/', watchController.createWatch);
// [GET] /watch
router.get('/', watchController.getWatch);
// [GET] /watch/:id
router.get('/:id', watchController.getWatchById);
// [PUT] /watch/:id
router.put('/:id', watchController.updateWatch);
// [DELETE] /watch/:id
router.delete('/:id', watchController.deleteWatch);

// [GET] /watch/:id/comment
router.post('/:id/comment', commentController.createCommentServer);

module.exports = router;
