const express = require('express');
const app = express();
const router = express.Router()
const upload=require('../middleware/upload')
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Product  = require('../models/product');
const Order = require('../models/Order')
var mongoose = require('mongoose');

cloudinary.config({ 
    cloud_name: 'dgrkckdwq', 
    api_key: '875198781849536', 
    api_secret: '8F7LSyB3QhjdAPqhlp1EUOkNyUY' 
  });

async function uploadToCloudinary(locaFilePath) {
  
    var mainFolderName = "main";
    console.log(locaFilePath);
    t=locaFilePath.substring(8,);
    var filePathOnCloudinary = "uploads/"+t
  
    return cloudinary.uploader
        .upload(locaFilePath, { public_id: filePathOnCloudinary })
        .then((result) => {
  
            fs.unlinkSync(locaFilePath);
  
            return {
                message: "Success",
                url: result.url,
            };
        })
        .catch((error) => {

            console.log(error);
  
            fs.unlinkSync(locaFilePath);
            return { message: "Fail" };
        });
}


router.post(
    "/upload",
    upload.single("image"),
    async (req, res, next) => {
        var imageUrl;

        console.log(req.body.ProductName);
        console.log(req.body.id);
  
            var locaFilePath = req.file.path;
  
            var result = await uploadToCloudinary(locaFilePath);
            console.log(result);
            imageUrl=result.url;

            console.log(imageUrl);

            Product.create(
                {
                  id: req.body.id,
                  ProductName: req.body.ProductName,
                  Description: req.body.Description,
                  Price: req.body.Price,
                  category: req.body.category,
                  qutenty: req.body.qutenty,
                  image: imageUrl,
          
          
                }, (error, data) => {
              if (error) {
                return res.status(501).json({msg:'Fail',msg1:'"Product not Add!!'})
              } else {
                return res.status(201).json({msg:'Success',msg1:'Product Add sccessfully!!'})
              }
            }
              )
        
  
    }


    


    
);


router.post(
  "/remove",
  async (req, res, next) => {
      console.log(typeof(req.body.id));
      Product.findOneAndDelete({id:req.body.id} ,(err, Customer) => {
        if (!err) {
            res.json({ msg: "Success", msg1: "Product deleted sccessfully!!" });
        } else {
            res.json({ msg: "Fail", msg1: "Product not deleted!!"})
        }})
  }


  
);


router.post(
  "/update",
  upload.single("image"),
  async (req, res, next) => {
      var imageUrl;

          var locaFilePath = req.file.path;

          var result = await uploadToCloudinary(locaFilePath);
          console.log(result);
          imageUrl=result.url;

          console.log(imageUrl);

          Product.findOneAndUpdate({"id": req.body.id}, {$set: 
            {
              "ProductName": req.body.ProductName,
              "Description": req.body.Description,
              "Price": req.body.Price,
              "category": req.body.category,
              "qutenty": req.body.qutenty,
              "image": imageUrl}},  function(err,doc) {
            if (err) { 
              res.json({ msg: "Fail", msg1: "Product not update!!"})
             }
            else {
              res.json({ msg: "Success", msg1: "Product updated sccessfully!!" }); 
            }
          });  

          
      

  }


  
);

router.get('/orderstatus',async (req,res)=>{
  Order.find({})
  .exec((error,prder)=>{
      if(error){
        res.json({msg1:"please try again"})
      }
      else{
          console.log(prder);
          res.json(prder)
      }
  })
})

  router.post('/orderstatusupdate',async (req,res)=>{
    // id=mongoose.Types.ObjectId("6244f38f206865e37dd0b772");
    status1=req.body.status
    console.log(status1);
    Order.findOneAndUpdate({_id: req.body.id}, {$set:{status:status1}}, (err, doc) => {
      if (err) {
          res.json({msg:"Fail"})
      }

      //event emit
      const eventEmitter = req.app.get('eventEmitter')
      eventEmitter.emit('orderUpdate',{id:req.body.id,status:status1})
      res.json({msg:"Success"})
  });
})








module.exports = router