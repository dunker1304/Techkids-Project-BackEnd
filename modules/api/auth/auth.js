const express = require('express');
const bcrypt = require('bcryptjs');
const AuthRouter = express.Router();

const UserModel = require('../users/model');

AuthRouter.post('/', (request, response)=>{
    const{username, password} = request.body;
    console.log(username);
    UserModel.findOne({username},(error,userFound)=>{
        if(error) response.status(500).json({success:0,error:error});
        else if(!userFound) response.status(404).json({success:0,error:"No User"});
        else{
            if(bcrypt.compareSync(password,userFound.password)){
                console.log(request.session);
                request.session.user = {userId:userFound._id};
                response.json({success:1,message:"Login successfully"});
                // response.redirect('http://localhost:3000');
            }
            else response.status(401).json({success:0,error:"Password Wrong!!!"});
        }
    })
})

AuthRouter.delete('/logout',(request,response)=>{
    request.session.destroy();
    response.send({success:1,message:"Logout Successfully"});
})

module.exports = AuthRouter;