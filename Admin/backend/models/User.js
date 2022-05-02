const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const Schema = mongoose.Schema;


const Admin = new Schema({
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
      }
})

Admin.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password,10)
}

Admin.methods.isValid = function(hashedpassword){
  return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('Admin',Admin)