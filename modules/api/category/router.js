const express= require('express');
const CategoryRouter = express.Router();
const CategoryModel = require('../category/model');

//CRUD

// create Category---nhập tay
CategoryRouter.post('/',(req,res)=>{
   const { idCategory,nameCategory } = req.body||{};
   const post= {idCategory,nameCategory};
   CategoryModel.create(post)
   .then(userCreated=>{
       res.status(201).json({success:1, userCreated:userCreated});
   })
   .catch( err=>{
       res.status(500).json({success:0,err:err})
   })

})

//get all category 
CategoryRouter.get('/',(rep,res)=>{
     CategoryModel.find({},(err,categoryFound)=>{
         if(err) res.status(500).json({success:0,error:err})
         else res.json({success:1,category:categoryFound});
     })
})
module.exports= CategoryRouter;