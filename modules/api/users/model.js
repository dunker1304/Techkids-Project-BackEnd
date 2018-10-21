const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const brcypt= require('bcryptjs');

const UserModel = new Schema(
  {  username :{type:String, required:true, unique:true},
     password:{type:String , required:true},
     avatar:{type:String, default:''},
     quote:{type:String,default:''},
     active :{type:Boolean , default:true }
    }, {
         timestamps:{createAt:"createAt"}
    }
)


UserModel.pre('save', function(next){
    
    if ( this.isModified('password')) {
        console.log('change')
        const salt= brcypt.genSaltSync(10);
        const hashCode= brcypt.hashSync(this.password,salt);
        this.password= hashCode;
    }
    
    next();
})

module.exports= mongoose.model('User',UserModel);