const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const helpers = require('./views/helpers/helpers');
const routes = require('./routers');

const app = express();

// Config
dotenv.config();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(flash());

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
    helpers: helpers,
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

// Sessions
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
  })
);

// Middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routes
routes(app);

// Start server
app.listen(process.env.PORT, () => {
  console.log('Server started on port http://localhost:' + process.env.PORT);
});
