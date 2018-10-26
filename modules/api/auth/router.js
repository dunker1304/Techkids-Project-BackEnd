
const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const AuthRouter = express.Router();


const UserModel = require('../users/model');

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       UserModel.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!bcrypt.compareSync(password,user.password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));

// passport.serializeUser(function (user, done) {
// 	done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
// 	UserModel.findById(id, function (err, user) {
// 		done(err, user);
// 	});
// });

// AuthRouter.post('/login',
// 	passport.authenticate('local', { successRedirect: 'http://localhost:3000/login', failureRedirect: '/users/login', failureFlash: true }),
// 	function (req, res) {
// 		res.redirect('/');
// 	});


AuthRouter.post('/login', (request, response)=>{
    const{username, password} = request.body;
    console.log(password);
    UserModel.findOne({username},(error,userFound)=>{
        if(error) response.status(500).json({success:0,error:error});
        else if(!userFound) response.status(404).json({success:0,error:"No User"});
        else{
            if(bcrypt.compareSync(password,userFound.password)){
            //    console.log(request.session);
              request.session.user =  userFound._id;
            //   request.session.save();
              console.log(request.session)
                response.send(userFound);
              
            }
            else response.status(401).json({success:0,error:"Password Wrong!!!"});
        }
    })
})

// AuthRouter.delete('/logout',(request,response)=>{
//     request.session.destroy();
//     response.send({success:1,message:"Logout Successfully"});
// })

module.exports = AuthRouter;