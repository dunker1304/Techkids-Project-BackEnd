const express= require('express');
const PostRouter = express.Router();
const PostModel = require('../post/model');

//CRUD
//create Post

PostRouter.post('/',(req,res)=>{
    const {title,description,author,category}= req.body||{};
    const post = {title,description,author,category};
    PostModel.create(post)
    .then(postCreated=>{
        res.status(201).json({success:1,postCreated:postCreated})
    })
    .catch(err=>{
        res.status(500).json({success:0,error:err})
    })
})

// get all post and sort by timestamps
PostRouter.get('/',(req,res)=>{
    PostModel.find({})
    .populate('author')
    .populate('category')
    .sort({"createdAt":-1})
    .exec((err,post)=>{
        if(err) res.status(500).json({success:0,error:err})
        else res.status(201).json({success:1,post:post})
    })
})

module.exports = PostRouter;