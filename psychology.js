const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const UserRouter= require('./modules/api/users/router');
const CategoryRouter= require('./modules/api/category/router');
const PostRouter = require('./modules/api/post/router');
const AuthRouter= require('./modules/api/auth/router');
const cors= require('cors');

const ViewModel= require('./modules/api/view/model');

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


app.use(cors({ origin: 'http://localhost:3000' , credentials :  true,  methods: 'DELETE,GET,PUT,POST,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));
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





app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false}));


app.use('/api/user',UserRouter);
app.use('/api/category',CategoryRouter);
app.use('/api/post',PostRouter);
app.use('/api/auth',AuthRouter);



// app.use(express.static('./build'));

// app.get('/', (request,response)=>{
//     response.sendFile('./build/index.html');
// });

//mongodb://admin:psychology123@ds137283.mlab.com:37283/psychology_web
mongoose.connect('mongodb://admin:psychology123@ds137283.mlab.com:37283/psychology_web', {useNewUrlParser: true},error=>{
    if(error) console.log(error);
    else console.log("Database connect success full")
})


app.put('/',(req,res)=>{
    ViewModel.find({})
    .limit(1)
    .exec((err,viewFound)=>{
        if(err) console.log(err)
        else {
     
           viewFound[0].numberView+=1;
           viewFound[0].save((err,viewUpdated)=>{
            if(err) res.send(err)
            else  res.send(viewUpdated)

           })

        }
    })
})

// app.post('/',(req,res)=>{
//     const viewCount =1;
//     ViewModel.create({viewCount})
//     .then(viewCreated=>{
//      res.send(viewCreated)

//     })
//     .catch (err=>{
//         res.send(err);
//     })

// })



const port =  process.env.PORT || 6969;
app.listen(port, error =>{
    if(error) console.log(error);
    else console.log("Server running at port: "+port);
})