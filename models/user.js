"use strict";
const mongoose = require("mongoose");
/** @class user
 * @description
 */
const User = mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    active: { type: Boolean, default: false },
    otp: { type: String },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

/**@memberOf Staff*/
User.statics.objectId = function (id) {
  return mongoose.Types.ObjectId(id);
};

module.exports = {
  User: mongoose.model("user", User),
};
