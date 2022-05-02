const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Product = new Schema({
    id: {
        type: String
      },
      ProductName: {
        type: String
      },
      Description: {
        type: String
      },
      Price: {
        type: Number
      },
      category: {
        type: String
      },
      qutenty: {
        type: Number
      },
      image: {
        type: String
      }
})



module.exports = mongoose.model('Product',Product)