"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectDatabase;

var _mongoose = _interopRequireDefault(require("mongoose"));

var MONGO_URI = "mongodb+srv://medica:medicamedica@cluster0-aks6m.gcp.mongodb.net/test?retryWrites=true&w=majority";

function connectDatabase() {
  return new Promise(function (resolve, reject) {
    _mongoose.default.Promise = global.Promise;

    _mongoose.default.connection.on('error', function (error) {
      return reject(error);
    }).on('close', function () {
      return console.error('#### Database connection closed.');
    }).once('open', function () {
      return resolve(_mongoose.default.connections[0]);
    });

    _mongoose.default.connect(MONGO_URI, {
      useNewUrlParser: true,
      autoIndex: false
    });
  });
}

;