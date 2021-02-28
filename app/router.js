'use strict';

const { websocket } = require("../config/plugin");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/:name', controller.home.index);

  // websocket连接
  app.ws.use(async (ctx, next) => {
    console.log('websocket open');
    await next();
    console.log('websocket closed');
  });
  // websocket路由
  app.ws.route('/ws', app.controller.home.ws);
};
