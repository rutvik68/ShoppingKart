const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Order = new Schema({
    email: {
        type: String
      },
      Product:{
            Productname:String,
            Productimg:String,
            ProductPrice:Number,
            quantity:Number,
            Price:Number,
            date:String
        },
    date:{
        type: String
    },
    status:{
        type:String,
        default:"Conform"
    }
      
})



module.exports = mongoose.model('Order',Order)