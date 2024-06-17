const router = require('express').Router();
const memberController = require('../controllers/memberController');

// [GET] /member
router.get('/', memberController.getMember);

// [GET] /member/:id
router.get('/:id', memberController.getMemberById);

// [POST] /member
router.post('/', memberController.createMember);

// [PUT] /member/:id
router.put('/:id', memberController.updateMember);

// [DELETE] /member/:id
router.delete('/:id', memberController.deleteMember);

module.exports = router;
