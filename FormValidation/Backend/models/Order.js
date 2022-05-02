const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Order = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
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
        default:"order_placed"
    }
      
})



module.exports = mongoose.model('Order',Order)