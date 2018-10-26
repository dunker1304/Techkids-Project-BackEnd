const express= require('express');
const PostRouter = express.Router();
const PostModel = require('../post/model');
const authMiddleware = require('../auth/auth');

//CRUD
//create Post

PostRouter.post('/',authMiddleware.authorize,(req,res)=>{
     req.body.author= req.session.user;
     console.log( req.body.author);
    const {title,description,author,category,comment}= req.body||{};
   
    const post = {title,description,author,category,comment};
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
    const page = req.query.page;
    const itemPerPage = 1;
    console.log(page);
    PostModel.find({})
    .populate('author')
    .populate('category')
    .sort({"createdAt":-1})
    .skip((page-1)*itemPerPage)
    .limit(itemPerPage)
    .exec((err,post)=>{
        if(err) res.status(500).json({success:0,error:err})
        else res.status(201).json({success:1,post:post})
    })
})
 

// get post by id 
PostRouter.get('/detailpost',(req,res) => {
    const postId = req.query.postId;
    PostModel.findOne({_id : postId})
        .populate('author')
        .populate('category')
        .exec((err,postfound) => {
        if(err) console.log(err)
        else
            {
                res.send({success:1, post : postfound})
            }
    })
})

// add comment
PostRouter.put('/detailpost', (req,res)=>{
    const postId = req.query.postId;
    console.log(req.session.user);
    console.log(req.body.textArea);
    PostModel.findById(postId,(err,postfound) => {
        if(err) res.status(500).json({ success: 0, err: err })
               else if (postfound) {
                    postfound.comment.push({
                        content : req.body.textArea,
                        author : req.session.user
                        }
                    );

                   postfound.save((err, postUpdated) => {
                       if(err) res.status(500).json({ success: 0, err: err })
                       else res.json({ success: 1, post: postUpdated });                   
                   })
                }})
            }) 
module.exports = PostRouter;