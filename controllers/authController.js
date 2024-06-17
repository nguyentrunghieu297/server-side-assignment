const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

let refreshTokenList = [];

const authController = {
  registerUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing username or password',
      });
    }
    try {
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists',
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing username or password',
      });
    }
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid username or password',
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid username or password',
        });
      }
      const accessToken = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      const refreshToken = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET
      );
      refreshTokenList.push(refreshToken);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },
};

module.exports = authController;
