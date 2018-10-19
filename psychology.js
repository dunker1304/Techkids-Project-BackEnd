const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.get('/', (request,response)=>{
    response.send("Psychology");
});

mongoose.connect('mongodb://admin:psychology123@ds137283.mlab.com:37283/psychology_web', {useNewUrlParser: true},error=>{
    if(error) console.log(error);
    else console.log("Database connect success full")
})

const port =  process.env.PORT || 6969;
app.listen(port, error =>{
    if(error) console.log(error);
    else console.log("Server running at port: "+port);
})