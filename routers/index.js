const authRouter = require('./auth');
const watchRouter = require('./watch');
const memberRouter = require('./member');
const brandRouter = require('./brand');

function routes(app) {
  app.use('/auth', authRouter);
  app.use('/watch', watchRouter);
  app.use('/member', memberRouter);
  app.use('/brand', brandRouter);
}

module.exports = routes;
