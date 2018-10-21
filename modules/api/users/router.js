const express= require('express');
const UserRouter = express.Router();
const UserModel= require('../users/model')



//CRUD
//create user
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

//get alluser
UserRouter.get('/',(req,res)=>{
    UserModel.find({},{password:0},(err,user)=>{ 
        if(err) res.status(500).json({success:0,error:err})
        else res.json({success:1,user:user}); 
    })
 })

 //update info of user
 UserRouter.put('/:id',(req,res)=>{
     const {password, avatar,quote} =req.body ||{};
     const userChange= {password,avatar,quote};
     const userID= req.params.id;

     UserModel.findById(userID,(err,userFound)=>{
       if(err) res.status(500).json({success:0,error:err})
       else  if( !userFound) res.status(400).json({success:0, error:'no such user'});
       else {
         
           for(key in userChange){
               if(userChange[key]!== null && userChange[key]!== undefined) 
                 userFound[key]=userChange[key];
                 console.log(userFound[key]);
           }

           userFound.save((err,userUpdate)=>{
               if(err) res.status(500).json({success:0,error:err})
               else res.send({success:1, userUpdate:userUpdate});
           })
       }
     })
 })

 //get user by id
   UserRouter.get('/:id',(req,res)=>{
       const userID= req.params.id;
      UserModel.findById( userID, (err,userFound)=>{
          if(err) res.status(500).json({success:0, err:err})
          else if(!userFound) res.status(400).json({success:0,error:"not such use"})
          else  res.send({success:1,userFound:userFound});
      })
   })



module.exports = UserRouter;