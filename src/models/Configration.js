const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema({
  configuration_actions: {
    type: { String: String },
    default: {
      1: "left",
      2: "right",
      3: "double",
      yes: "left",
      no: "right",
      up: "double",
      down: "",
      left: "",
      right: "",
      on: "",
      off: "",
      stop: "",
      go: "",
    },
  },
  configuration_points: {
    type: String,
    default: "false",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Configuration = mongoose.model("Configure", configurationSchema);
module.exports = Configuration;
