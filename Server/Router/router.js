const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')
require('../DB/db')
const User = require('../Models/UserSchema.js');


router.get('/',(req,res)=>{
    res.send(`You are in Home Folder `);
});

router.post('/register',async(req,res)=>{
 const {name  , email ,number ,password ,cpassword} =req.body;
    // password =  await bcrypt.hash(password , 12);
   if((!name || !email || !number)){
    return  res.send({error: "Plese fill all the Details"})
   }
   User.findOne({email:email}).then((userexists)=>{
    if(userexists){
        return res.send("error user Exists")
    }
    const user = new User({name:name,email:email,number:number,password:password,cpassword:cpassword})
    user.save().then(()=>{
        res.send("User Added Sucessfully")
    })
    .catch((err)=>{
        res.send("USer Is Not Added")
    })
   }).catch((err)=>{
    res.send("DIdnot Connected ")
   })
})

router.post('/signin',async(req,res)=>{
    const {email ,password} =req.body;
    const isuser = await User.findOne({email:email})
    if(isuser==undefined){
        return  res.send("Invalid Credentials")
    }
    const userpass = await isuser.password;
    const ismatch =await bcrypt.compare(password, isuser.password).catch((err)=>{
        return res.send("Invalid Credential")
    })
    if(!email || !password){
        res.send({
            error : "User Must Fill Data"
        })

    }
    else{
         token = await isuser.generateAuthToken();
        //  console.log(token)
            if(ismatch){
                res.send("User SignIn SuccessFully")

            }
            else{
                res.send("User SignIn UnSuccessFully Password")
            }
        }
    })

module.exports = router;
