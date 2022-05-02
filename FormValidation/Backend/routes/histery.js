const { error } = require('console');
const express = require('express');
const app = express();
const router = express.Router()
const jwt = require('jsonwebtoken');
const { delay } = require('rxjs');
const Web3 = require("web3")
const web3 = new Web3('HTTP://127.0.0.1:7545');
var mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId; 

const Product = require('../models/Product')
const Order = require('../models/Order')


router.post('/history',(req,res)=>{
    Order.find({id:req.body.data})
    .exec((error,Order)=>{
        if(error){
            console.log('some error occur');
        }
        else{
            res.json(Order)
        }
    })
})

router.post('/orderstatus',async (req,res)=>{
    
    var id = mongoose.Types.ObjectId(req.body.data);
    Order.find({_id:id})
    .exec((error,prder)=>{
        if(error){
            console.log(error);
        }
        else{
            res.json(prder)
        }
    })
})

module.exports = router