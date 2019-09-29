'use strict';

// /** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.mongoose = {
  enalbe:true,
  package:'egg-mongoose'
}

// {app_root}/config/plugin.js
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};