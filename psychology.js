const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const UserRouter= require('./modules/api/users/router');
const CategoryRouter= require('./modules/api/category/router');
const PostRouter = require('./modules/api/post/router');
const AuthRouter = require('./modules/api/auth/auth');
const cors = require('cors');
const app = express();

app.use(session({
    secret: "keyboard cat",
    resave : false,
    saveUninitialized: true,
    cookie:{
        httpOnly: false,
        maxAge: 60*60*24*7*1000
    }
}));
app.get('/', (request,response)=>{
    response.send("Psychology");
});
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api/user',UserRouter);
app.use('/api/category',CategoryRouter);
app.use('/api/post',PostRouter);
app.use('/api/login', AuthRouter);
mongoose.connect('mongodb://admin:psychology123@ds137283.mlab.com:37283/psychology_web', {useNewUrlParser: true},error=>{
    if(error) console.log(error);
    else console.log("Database connect success full")
})



const port =  process.env.PORT || 6969;
app.listen(port, error =>{
    if(error) console.log(error);
    else console.log("Server running at port: "+port);
})