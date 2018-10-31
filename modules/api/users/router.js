const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../users/model')
const PostModel = require("../post/model")



//CRUD
//create user
UserRouter.post('/', (req, res) => {
    console.log(req.body);
    if (req.body.password === req.body.re_password) {
        const { username, password, avatar, quote, active } = req.body || {};
        console.log(avatar);
        UserModel.create({ username, password, avatar, quote, active })
            .then(userCreated => {
                req.session.user = { userId: userCreated._id };
                res.status(201).json({ success: 1, user: userCreated });

            })
            .catch(err => res.status(500).json({ success: 0, err: err }))
    }//end if
})

//get alluser
UserRouter.get('/', (req, res) => {
    UserModel.find({}, { password: 0 }, (err, user) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.json({ success: 1, user: user });
    })
})

//update info of user
UserRouter.put('/:id', (req, res) => {
    const { password, avatar, quote } = req.body || {};
    const userChange = { password, avatar, quote };
    const userID = req.params.id;

    UserModel.findById(userID, (err, userFound) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else if (!userFound) res.status(400).json({ success: 0, error: 'no such user' });
        else {

            for (key in userChange) {
                if (userChange[key] !== null && userChange[key] !== undefined)
                    userFound[key] = userChange[key];
                console.log(userFound[key]);
            }

            userFound.save((err, userUpdate) => {
                if (err) res.status(500).json({ success: 0, error: err })
                else res.send({ success: 1, userUpdate: userUpdate });
            })
        }
    })
})

// get user comment by id
UserRouter.get('/comment',(req,res) => {
    const userId = req.query.userId;
    PostModel.findOne({_id : userId})
        .exec((err,userFound) => {
        if(err) console.log(err)
        else
            {
                res.send({success:1, user : userFound})
            }
    })
})



//get user by id
UserRouter.get('/:id', (req, res) => {
    const userID = req.params.id;
    UserModel.findById(userID, (err, userFound) => {
        if (err) res.status(500).json({ success: 0, err: err })
        else if (!userFound) res.status(400).json({ success: 0, error: "not such use" })
        else {
            PostModel.find({ author: userID })
                .sort({ "view": -1 })
                .limit(1)
                .exec((err, postFound) => {
                    if (err) res.status(500).json({ success: 0, error: err })
                    else {
                        //count number post of one user
                        PostModel.find({ author: userID }).count()
                            .exec((err, count) => {
                                if (err) console.log(err)
                                else {
                                    //all number of Post table\
                                    PostModel.find().count()
                                        .exec((err, countAll) => {
                                            if (err) console.log(err)
                                            else {


                                                res.send({ success: 1, userFound: userFound, postPopulate: postFound, countPerUser: count, countAll: countAll });
                                            }
                                        })
                                }
                            })


                    }

                })









        }
    })
})



module.exports = UserRouter;