const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const Schema = mongoose.Schema;


const User = new Schema({
    FirstName: {
        type: String
      },
    LastName: {
        type: String
      },
    email: {
        type: String
      },
    mobile: {
        type: Number
      },
    dob: {
        type: String
      },
    gender: {
        type: String
      },
    password: {
        type: String
      },
    address: {
      type: String
      },
    country: {
      type: String
      },
    state: {
      type: String
      },
    city: {
      type: String
      },
    pincode:{
      type:Number
    }
})

User.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password,10)
}

User.methods.isValid = function(hashedpassword){
  return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',User)