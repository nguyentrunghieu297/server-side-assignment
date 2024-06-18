const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const routes = require('./routers');

const app = express();

// Config
dotenv.config();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
routes(app);

// Start server
app.listen(process.env.PORT, () => {
  console.log('Server started on port http://localhost:' + process.env.PORT);
});
