const router = require('express').Router();
const memberController = require('../controllers/memberController');
const { verifyTokenAndAdmin } = require('../controllers/middlewareController');

// [GET] /member
router.get('/', verifyTokenAndAdmin, memberController.getMember);

// [GET] /member/:id
router.get('/:id', verifyTokenAndAdmin, memberController.getMemberById);

// [PUT] /member/:id
router.put('/:id', verifyTokenAndAdmin, memberController.updateMember);

// [DELETE] /member/:id
router.delete('/:id', verifyTokenAndAdmin, memberController.deleteMember);

module.exports = router;
