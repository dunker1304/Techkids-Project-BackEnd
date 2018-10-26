const express= require('express');
const CategoryRouter = express.Router();
const CategoryModel = require('../category/model');
const PostModel= require('../post/model');
const UserModel = require('../users/model');
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

//get all category _ number post of category and lastpost

CategoryRouter.get('/',(req,res)=>{

console.log(req.session);
CategoryModel.aggregate([{
    $lookup:{
        from:"posts",
        localField:"_id",
        foreignField:"category",
        as:"bmark"
    }
},
{$lookup:{from:"users",localField:"bmark.author",foreignField:"_id",as:"TEST"}}
])
.exec((err,item)=>{
    if(err) res.status(500).json({success:0,error:err})
    else   res.status(200).json({success:1,item:item})

})
  
})

//get only information of allcategory

CategoryRouter.get('/data',(req,res)=>{
   CategoryModel.find({})
   .sort({"nameCategory":1})
   .exec((err,result)=>{
    if(err) res.status(500).json({success:0,error:err})
    else  res.status(200).json({success:1,result:result})

   })


})
  
   //get post by category_id 
CategoryRouter.get('/:id',(req,res)=>{
   const id= req.params.id;
   PostModel.find({category:id})
   .sort({"createdAt":-1})
   .populate('author')
   .populate('category')
   .exec((err,item)=>{
    if(err) res.status(500).json({success:0,error:err})
      else res.status(201).json({success:1,item:item})

   })
})


module.exports= CategoryRouter;