const router = require('express').Router();
const brandController = require('../controllers/brandController');

// [GET] /brand
router.get('/', brandController.getBrand);

// [GET] /brand/:id
router.get('/:id', brandController.getBrandById);

// [POST] /brand
router.post('/', brandController.createBrand);

// [PUT] /brand/:id
router.put('/:id', brandController.updateBrand);

// [DELETE] /brand/:id
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
