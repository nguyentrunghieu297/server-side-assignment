const memberRouter = require('./member');
const watchRouter = require('./watch');
const brandRouter = require('./brand');
const commentRouter = require('./comment');
const authRouter = require('./auth');
const adminRouter = require('./admin');

module.exports = (app) => {
  app.use('/admin', adminRouter);
  app.use('/auth', authRouter);
  app.use('/member', memberRouter);
  app.use('/watch', watchRouter);
  app.use('/brand', brandRouter);
  app.use('/comment', commentRouter);
};
