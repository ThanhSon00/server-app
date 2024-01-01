const authRouter = require('./auth');
const categoryRouter = require('./category');
const commentRouter = require('./comment');
const googleRouter = require('./google');
const memberRouter = require('./member');
const questionRouter = require('./question');
const cloudRouter = require('./cloud');

module.exports = {
  authRouter, 
  categoryRouter,
  commentRouter,
  googleRouter,
  memberRouter,
  questionRouter,
  cloudRouter,
}
