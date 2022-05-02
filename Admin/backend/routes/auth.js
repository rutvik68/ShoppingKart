const express = require('express');
const router = express.Router()
const Admin  = require('../models/User');

//register Api
router.route('/user').post((req, res, next) => {
    Admin.create(
      {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        password: Admin.hashPassword(req.body.password),
        


      }, (error, data) => {
    if (error) {
      return res.status(501).json({msg:'Fail',msg1:'Plase try again!!'})
    } else {
      return res.status(201).json({msg:'Success',msg1:'You are successfully Register!!'})
    }
  }
    )

});


router.post('/login',function(req, res, next) {
  
  let promise = Admin.findOne({email:req.body.email}).exec();

  promise.then(function(doc){ 
    if(doc){ 
      if(doc.isValid(req.body.password)){
        return res.status(200).json({msg:'Success',msg1:'You are successfully Login!!  &#128512'})
      }
      else{
        return res.json({msg:'Fail',msg1:'Invalid Credentials!! `&#129324`'})
      }

    }
    else{
      return res.json({msg:'Fail',msg1:'Not Registered &#128542'})
    }
    
  });
// 
  promise.catch(function(err){
    console.log(err);
    return res.status(501).json({msg:'Fail',msg1:'Please try again &#128548'})
  })
});

 

module.exports = router