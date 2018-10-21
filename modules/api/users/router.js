const express= require('express');
const UserRouter = express.Router();
const UserModel= require('../users/model')



//CRUD
UserRouter.post('/',(req,res)=>{
    console.log(req.body);
    const {username,password,avatar,quote,active} =req.body||{} ;
    console.log(avatar);
     UserModel.create({username,password,avatar,quote,active})
   .then(userCreated=>{
      
      res.status(201).json({success:1,user:userCreated});
   })
   .catch(err=>res.status(500).json({success:0,err:err}))
})

UserRouter.get('/',(req,res)=>{
    UserModel.find({},{password:0},(err,user)=>{ 
        if(err) res.status(500).json({success:0,error:err})
        else res.json({success:1,user:user}); 
    })
 })

module.exports = UserRouter;