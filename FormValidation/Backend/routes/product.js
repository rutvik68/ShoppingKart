const { error } = require('console');
const express = require('express');
const app = express();
const router = express.Router()
const jwt = require('jsonwebtoken');
const delay  = require('delay');
const Web3 = require("web3")
const web3 = new Web3('HTTP://127.0.0.1:7545');
var mongoose = require('mongoose');

const Product = require('../models/Product')
const Order = require('../models/Order')


router.get('/getproduct',(req,res)=>{
    Product.find({})
    .exec((error,product)=>{
        if(error){
            console.log('some error occur');
        }
        else{
            res.json(product)
        }
    })
})

router.put("/updateproduct",async (req,res,next)=>{

    
    p=await req.body.data;
    sender=req.body.account;
    balance=(req.body.balance).toString();
    id=mongoose.Types.ObjectId(req.body.id);

    let receiver = "0x3dB9a4C66165A0a083480BBC5AC86520573A55AF"; 

    // let User = await Order.findOne({email:req.body.email})
// 
    // if(!User){
        // Order.create({email:req.body.email},(error, data) => {
            // if (error) {
            // } else {
            //   
            // }
        //   })
    // }

    // await delay(1000)

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
// 

    
    

    await p.forEach(async item => {

        var obj = {
            Productname:item.ProductName,
            Productimg:item.image,
            ProductPrice:item.Price,
            quantity:item.quantity,
            Price:item.total,
        }

        Order.create(
            {
              id: id,
              Product: obj,
              date:today,
            }, (error, data) => {
          if (error) {
            return res.status(501).json({msg:'Fail',msg1:'Plase try again!!'})
          } else {
            }});



        // p1=await Order.findOneAndUpdate({email:req.body.email},{ $push: { Product: obj } })
        // .then(async function(err,doc) {
            // if (err) { 
        
        // }
        // else {
        //   if(doc===undefined){
        //    Order.create(
                // {
                //   email: req.body.email,
                //   Product:obj
                // },(error, data) => {
            //   if (error) {
            
            //   } else {
                // 
            //   }
            // }
            // )
        //   }
        //   
        // }
    // })

    p2=await Product.findOne({_id:item._id})
        let count=await p2.qutenty    
        count=count-item.quantity
        await Product.findOneAndUpdate({_id:item._id},{
            qutenty:count
        })
    });

        web3.eth.sendTransaction({
            to:receiver,
            from:sender, 
            value:web3.utils.toWei(balance, "ether"),
            gas:21000,}
            ,function (err, res1){
                if(err){
                    return res.json({msg:'Fail',mag1:"Payment Fail!!"});
                }else{
                    return res.json({msg:'Success',mag1:"Thankyou for shopping!!"});
                }
            });

    
})



module.exports = router

