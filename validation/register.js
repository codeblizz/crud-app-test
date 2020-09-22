const Validator = require("validator");
const isEmpty = require("is-empty");    

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.emailConfirm = !isEmpty(data.emailConfirm) ? data.emailConfirm : "";
  data.password  = !isEmpty(data.password) ? data.password : "";
  data.role = !isEmpty(data.role) ? data.role : "";

 if (Validator.isEmpty(data.email)) {
  errors.email = "Email field is required";
} if (!Validator.isEmail(data.email)) {
  errors.email = "Email field is invalid";
} if (Validator.isEmpty(data.emailConfirm)) {
  errors.emailConfirm = "Confirm email field is required";
} if (!Validator.equals(data.email, data.emailConfirm)) {
  errors.emailConfirm = "Email must match";
}

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "User type must be selected";
  }return {
    errors,
    isValid: isEmpty(errors)
  };
}