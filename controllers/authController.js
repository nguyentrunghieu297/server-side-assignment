const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const Member = require('../models/Member');
const session = require('express-session');

let refreshTokens = [];

const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return false;
  }
  if (username.length < 3 || username.length > 20) {
    return false;
  }
  if (!/^[a-zA-Z0-9_\-]+$/.test(username)) {
    return false;
  }
  return true;
};

const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return false;
  }
  if (password.length < 8) {
    return false;
  }
  // Additional checks for password complexity can be added here
  return true;
};

const authController = {
  // RENDER LOGIN PAGE
  renderLoginPage: (req, res) => {
    res.render('login');
  },

  // RENDER REGISTER PAGE
  renderRegisterPage: (req, res) => {
    res.render('register');
  },

  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: '24h' }
    );
  },

  // GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: '365d' }
    );
  },

  //REGISTER
  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!validateUsername(username)) {
        return res.status(400).json('Invalid username');
      }

      if (!validatePassword(password)) {
        return res.status(400).json('Invalid password');
      }

      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const newMember = await new Member({
        username: req.body.username,
        password: hashed,
      });

      //Save user to DB
      const user = await newMember.save();
      // res.status(200).json(user);
      res.redirect('/auth/login');
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // REGISTER SERVER SIDE
  registerServerSide: async (req, res) => {
    const { username, password } = req.body;
    const user = await Member.findOne({ username });
    if (user) {
      return res.send('Username already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new Member({
      username,
      password: hashed,
    });
    await newUser.save();
    res.redirect('/auth/login');
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const member = await Member.findOne({ username: req.body.username });
      if (!member) {
        return res.status(404).json('Incorrect username');
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        member.password
      );
      if (!validPassword) {
        return res.status(404).json('Incorrect password');
      }
      if (member && validPassword) {
        //Generate access token
        const accessToken = authController.generateAccessToken(member);
        //Generate refresh token
        const refreshToken = authController.generateRefreshToken(member);
        refreshTokens.push(refreshToken);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });
        const { password, ...others } = member._doc;
        return res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // LOGIN SERVER SIDE
  loginServerSide: async (req, res) => {
    const { username, password } = req.body;

    const user = await Member.findOne({ username });
    if (!user) {
      return res.redirect('/login');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.redirect('/login');
    }
    req.session.userId = user._id;
    req.session.userName = user.username;
    res.redirect('/watch');
  },

  // REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json('Refresh token is not valid');
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie('refreshToken');
    return res.status(200).json('Logged out successfully!');
  },

  // LOGOUT SERVER SIDE
  logOutServerSide: async (req, res) => {
    req.session.destroy();
    res.render('home', { session: req.session });
    res.redirect('/watch');
  },
};

module.exports = authController;
