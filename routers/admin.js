const router = require('express').Router();
const brandController = require('../controllers/brandController');
const watchController = require('../controllers/watchController');
const { isAdminMiddleware } = require('../controllers/middlewareController');

// [GET] /admin/watch
router.get('/watch', isAdminMiddleware, watchController.getWatchAdmin);
// [GET] /admin/watch/create
router.get('/watch/create', isAdminMiddleware, watchController.viewCreateWatch);
// [POST] /admin/watch/create
router.post('/watch/store', isAdminMiddleware, watchController.createWatch);
// [GET] /admin/watch/:id/update
router.get(
  '/watch/:id/update',
  isAdminMiddleware,
  watchController.viewUpdateWatch
);
// [PUT] /admin/watch/:id/store
router.put('/watch/:id/store', isAdminMiddleware, watchController.updateWatch);
// [DELETE] /admin/watch/:id/delete
router.delete(
  '/watch/:id/delete',
  isAdminMiddleware,
  watchController.deleteWatch
);
// [GET] /admin/watch/:id
router.get('/watch/:id', isAdminMiddleware, watchController.getWatchById);

// ----------------------------------------------------------------

// [GET] /admin/brand
router.get('/brand', isAdminMiddleware, brandController.getBrand);
// [GET] /admin/brand/create
router.get('/brand/create', isAdminMiddleware, brandController.viewCreateBrand);
// [POST] /admin/brand/create
router.post('/brand/store', isAdminMiddleware, brandController.createBrand);
// [GET] /admin/brand/:id/update
router.get(
  '/brand/:id/update',
  isAdminMiddleware,
  brandController.viewUpdateBrand
);
// [PUT] /admin/brand/:id/store
router.put('/brand/:id/store', isAdminMiddleware, brandController.updateBrand);
// [DELETE] /admin/brand/:id/delete
router.delete(
  '/brand/:id/delete',
  isAdminMiddleware,
  brandController.deleteBrand
);
// [GET] /admin/brand/:id
router.get('/brand/:id', isAdminMiddleware, brandController.getBrandById);

module.exports = router;
