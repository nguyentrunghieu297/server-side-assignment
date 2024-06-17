const memberRouter = require('./member');
const watchRouter = require('./watch');
const brandRouter = require('./brand');
const commentRouter = require('./comment');

module.exports = (app) => {
  app.use('/member', memberRouter);
  app.use('/watch', watchRouter);
  app.use('/brand', brandRouter);
  app.use('/comment', commentRouter);
};
