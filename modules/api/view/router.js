const express = require('express');
const ViewRouter = express.Router();
const ViewModel= require('../view/model');

//update View
 
ViewRouter.put('/',(req,res)=>{
       ViewModel.find({})
       .exec((err,viewFound)=>{
         if(err) console.log(err);
         else {
            viewFound.numberView +=1;
                
            viewFound.save((err, viewUpdated) => {
                if(err) res.status(500).json({ success: 0, err: err })
                else res.json({ success: 1, view: viewUpdated });                   
            })   
         } 
       })
})

