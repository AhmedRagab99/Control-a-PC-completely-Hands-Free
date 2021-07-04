const joi = require("@hapi/joi");
const regestrationValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(5).max(200).required(),
    email: joi.string().min(6).max(200).trim().required().email(),
    password: joi.string().min(6).max(200).required(),
  });
  return schema.validate(data);
};

module.exports = regestrationValidation;
