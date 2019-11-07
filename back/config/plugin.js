'use strict';

/** @type Egg.EggPlugin */
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

exports.jwt = {
	enable: true,
	package: "egg-jwt"
};

exports.routerGroup = {
	enable: true,
	package: "egg-router-group"
};
