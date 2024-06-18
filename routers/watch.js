const router = require('express').Router();
const watchController = require('../controllers/WatchController');
const { verifyTokenAndAdmin } = require('../controllers/middlewareController');

// [GET] /watch
router.get('/', watchController.getWatch);
// [GET] /watch/:id
router.get('/:id', watchController.getWatchById);
// [POST] /watch
router.post('/', verifyTokenAndAdmin, watchController.createWatch);
// [PUT] /watch/:id
router.put('/:id', verifyTokenAndAdmin, watchController.updateWatch);
// [DELETE] /watch/:id
router.delete('/:id', verifyTokenAndAdmin, watchController.deleteWatch);

module.exports = router;
