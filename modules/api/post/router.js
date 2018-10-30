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

// get all post
PostRouter.get('/',(req,res)=>{
    PostModel.find({})
    .populate('author')
    .populate('category')
    .exec((err,post)=>{
        if(err) res.status(500).json({success:0,error:err})
        else res.status(201).json({success:1,NumberOfPosts:post.length})
    })
});


// get all post and sort by timestamps
PostRouter.get('/newpost',(req,res)=>{
    const page = req.query.newPostPage;
    const itemPerPage = 3;
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
});


// get all post and sort by view
PostRouter.get('/popularpost',(req,res)=>{
    const page = req.query.popularPostPage;
    const itemPerPage = 3;
    console.log(page);
    PostModel.find({})
    .populate('author')
    .populate('category')
    .sort({"view":-1})
    .skip((page-1)*itemPerPage)
    .limit(itemPerPage)
    .exec((err,post)=>{
        if(err) res.status(500).json({success:0,error:err})
        else res.status(201).json({success:1,post:post})
    })
});

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

// increase view
PostRouter.put('/detailpost', (req,res)=>{
    const postId = req.query.postId;
    // console.log(req.session.user);
    
    PostModel.findById(postId,(err,postfound) => {
        if(err) res.status(500).json({ success: 0, err: err })
        else if (postfound) {
                    postfound.view += 1;       
                     
                    postfound.save((err, postUpdated) => {
                       if(err) res.status(500).json({ success: 0, err: err })
                       else res.json({ success: 1, post: postUpdated });                   
                   })   
                }
    })   
})


// add comment
PostRouter.put('/addComment',authMiddleware.authorize, (req,res)=>{
    const postId = req.query.postId;
    // console.log(req.session.user);
    console.log(req.body.textArea);
    PostModel.findById(postId,(err,postfound) => {
        if(err) res.status(500).json({ success: 0, err: err })
               else if (postfound) {
                    postfound.comment.push({
                        content : req.body.textArea,
                        author : req.session.user
                        }
                    );
                    postfound.view -= 1; 
                   postfound.save((err, postUpdated) => {
                       if(err) res.status(500).json({ success: 0, err: err })
                       else //res.redirect(`http://localhost:3000/detailpost?postId=${postId}`)
                       res.json({ success: 1, post: postUpdated });                   
                   })
                }
    })   
})

// add likedBy
PostRouter.put('/likedBy', authMiddleware.authorize,(req,res)=>{
    const postId = req.query.postId;
    // console.log(req.session.user);
    
    PostModel.findById(postId,(err,postfound) => {
        if(err) res.status(500).json({ success: 0, err: err })
        else if (postfound) {
            let checkUser = false;
                for(let i=0;i<postfound.likedBy.length;i++){
                    if(postfound.likedBy[i] === req.session.user){
                        checkUser = true;
                        break;
                    }
                }
                if(!checkUser){
                    postfound.likedBy.push(
                        req.session.user
                    );
                    postfound.like += 1;  
                    postfound.view -= 1;      
                }
                    
                     
                    postfound.save((err, postUpdated) => {
                       if(err) res.status(500).json({ success: 0, err: err })
                       else res.json({ success: 1, post: postUpdated });                   
                   })   
                }
    })   
})

module.exports = PostRouter;