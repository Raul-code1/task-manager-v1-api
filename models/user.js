const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name "],
    minLength: 4,
    maxLength: 10,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email address"],
    unique: true,
    math: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email address'
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password "],
    minLength: 6,
    maxLength: 12,
  },
  lastName: {
    type: String,
    default: "Your last name",
    maxLength: 20,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

UserSchema.methods.comparePassword = async function(loginPassword){
    const isMatch= await bcrypt.compare(loginPassword,this.password)
    return isMatch;
}


module.exports = mongoose.model("User", UserSchema);
