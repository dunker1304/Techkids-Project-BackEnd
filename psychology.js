const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const UserRouter= require('./modules/api/users/router');
const CategoryRouter= require('./modules/api/category/router');
const PostRouter = require('./modules/api/post/router');
const AuthRouter= require('./modules/api/auth/router');
const cors= require('cors');
var flash = require('connect-flash');
const passport= require('passport')

const app = express();

// app.use((req, res, next) => {
//     res.setHeader("X-Frame-Options", "ALLOWALL");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "POST, GET, PUT, DELETE, OPTIONS"
//     );
  
//     if (req.method === "OPTIONS") {
//         res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//       } else {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//       }
//     res.setHeader("Access-Control-Allow-Credentials", true);
  
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Authorization, Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });


app.use(cors({ origin: 'http://localhost:3000' , credentials :  true,  methods: 'GET,PUT,POST,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));
app.use(session({
    secret: "keyboard cat",
    resave : false,
    saveUninitialized: false,
    cookie:{
        httpOnly: false,
        maxAge: 60*60*24*7*1000,
        secure:false
    }
}));

app.get('/', (request,response)=>{
    console.log(request.session)
    response.send("Psychology");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/api/user',UserRouter);
app.use('/api/category',CategoryRouter);
app.use('/api/post',PostRouter);
app.use('/api/auth',AuthRouter);

//mongodb://admin:psychology123@ds137283.mlab.com:37283/psychology_web
mongoose.connect('mongodb://admin:psychology123@ds137283.mlab.com:37283/psychology_web', {useNewUrlParser: true},error=>{
    if(error) console.log(error);
    else console.log("Database connect success full")
})



const port =  process.env.PORT || 6969;
app.listen(port, error =>{
    if(error) console.log(error);
    else console.log("Server running at port: "+port);
})