const express = require('express');
const app = express();
const router = express.Router()
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator')
const uuid = require('uuid');
const { delay } = require('rxjs');

const User  = require('../models/Uesr');
const VerificationToken = require('../models/Verification')
const {mailTransport,generateEmail} = require("../utils/verifymail")

var secretKey = 'erT12456!';


//register Api
router.route('/user').post(async (req, res, next) => {

  // console.log(req.body);

  let user = await User.findOne({email:req.body.email})
  console.log(user);

  if(user){
    return res.json({msg:'Fail',msg1:'This email allready register!!'})
  }
    User.create(
      {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        password: User.hashPassword(req.body.password),
        address:req.body.address,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        pincode:req.body.pincode,
        


      }, (error, data) => {
    if (error) {
      return res.status(501).json({msg:'Fail',msg1:'Plase try again!!'})
    } else {
      let token = jwt.sign({username:data._id},secretKey)
      const otp=otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
      console.log(otp);
      VerificationToken.create({
        owner:data._id,
        token:otp,

      });

      mailTransport().sendMail({
        from:"emailverification@shoppingkart.com",
        to:data.email,
        subject:"Welcome to Shopping Kart",
        html:generateEmail(req.body.FirstName),
      })
      return res.status(201).json({msg:'Success',msg1:'You are successfully Register!!',token:token})
    }
  }
    )

});


router.post('/login',function(req, res, next) {
  
  let promise = User.findOne({email:req.body.email}).exec();
  promise.then(function(doc){ 
    if(doc){ 
      if(doc.isValid(req.body.password)){
        let token = jwt.sign({username:doc._id},secretKey)
        return res.status(200).json({msg:'Success',msg1:'You are successfully Login!!',token:token})
      }
      else{
        return res.json({msg:'Fail',msg1:'Invalid Credentials!!'})
      }

    }
    else{
      return res.json({msg:'Fail',msg1:'Not Registered!!'})
    }
    
  });
// 
  promise.catch(function(err){
    console.log(err);
    return res.status(501).json({msg:'Fail',msg1:'Please try again!!'})
  })
});

router.get('/username',verifyToken,(req,res,next)=>{
  return res.status(200).json(decodedToken.username);
})

var decodedToken ='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,secretKey,function(err,tokendata){
    if(err){
      return res.status(400).json({msg:'Fail'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
} 


router.post('/getuser',function(req, res, next) {
  
  console.log(req.body);
  User.findOne({ _id: req.body.id}, function (err, docs) {
    if (err){
      return res.json({msg:'Fail',msg1:'try again!!'})
    }
    else{
      return res.status(200).json(docs);
    }
})
  
  
  // console.log(user.FirstName);
});

module.exports = router