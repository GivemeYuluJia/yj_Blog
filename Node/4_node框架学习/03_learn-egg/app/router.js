'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { auth } = app.middleware;

  router.prefix('/api/v1');

  router.get('/', controller.home.index);

  router.post('/users/register', controller.user.register);
  router.post('/users/login', controller.user.login);
  router.get('/users/info/:userid', auth({ required: false }), controller.user.userInfo);
  router.get('/users/subscribe/:subscribeid', auth(), controller.user.subscribe);
};
