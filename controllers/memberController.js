const Member = require('../models/Member');
const { multipleMongooseToObject } = require('../utils/mongoose');

const memberController = {
  // [GET] /member
  getMember: async (req, res) => {
    try {
      const members = await Member.find();
      // res.status(200).json(members);
      res.render('manage-member', {
        members: multipleMongooseToObject(members),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // [GET] /member/:id
  getMemberById: async (req, res) => {
    try {
      const member = await Member.findById(req.params.id);
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // [PUT] /member/:id
  updateMember: async (req, res) => {
    try {
      const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // [DELETE] /member/:id
  deleteMember: async (req, res) => {
    try {
      const member = await Member.findByIdAndDelete(req.params.id);
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = memberController;
