const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
[ 
  {
    userDate: {
      type: Date,
      default: Date.now
  },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
  },  
    emailConfirm: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
  },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
  },
    role: {
      type: String,
      enum: ["admin", "manager"],
      required: true
  },
    resetToken: String,
    expiredToken: Date,   
  }], {
  timestamps: true,
});

module.exports = User = mongoose.model("User", UserSchema);