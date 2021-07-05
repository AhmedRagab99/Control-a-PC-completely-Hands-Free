const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({
      error: "Forbidden! Please logg in",
    });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "Forbidden! Please logg in",
      });
    }

    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
