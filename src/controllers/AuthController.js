const User = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const regestrationValidation = require("../validation");
const Configuration = require("../models/Configration");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);
    const { error } = regestrationValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details,
      });
    }
    if (!name && !email && !password) {
      return res.status(422).json({
        status: "Failed",
        error: "please add all the fields",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(422).json({
        error: "email already exists",
      });

    bcrypt.hash(password, 12).then(async (hashedpassword) => {
      const user = await new User({
        name,
        password: hashedpassword,
        email,
      }).save();
      const configs = await new Configuration({
        user: user,
      }).save();
    });

    res.status(200).json({
      message: "sign up success!",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = await req.body;
  try {
    if (!email && !password)
      return res.status(422).json({
        status: "Failed",
        error: "Please add all Fields",
      });

    const user = await User.findOne({ email: email });
    if (!user)
      res
        .status(422)
        .json({ status: "Failed", error: "Cannot find that user" });

    // compare passwords
    if (user) {
      // console.log(user.get("password"));
      const isMatch = await bcrypt.compare(password, user.get("password"));
      if (!isMatch)
        return res
          .status(422)
          .json({ status: "Failed", error: "Password is not correct" });
      console.log(isMatch);
      // to save all vars to jwt
      //const token = jwt.sign({ user: user }, process.env.JWTSECRET || "");

      const token = jwt.sign({ _id: user.id }, process.env.JWTSECRET || "");

      console.log(token);

      res.status(200).json({ user: user, token: token });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

const testPrivateRoutes = (req, res) => {
  res.send(req.user);
};
const AuthController = { signUp, signIn };
module.exports = AuthController;
