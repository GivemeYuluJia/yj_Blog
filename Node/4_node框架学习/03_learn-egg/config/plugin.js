'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};

module.exports.validate = {
  enable: true,
  package: 'egg-validate',
};

module.exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
