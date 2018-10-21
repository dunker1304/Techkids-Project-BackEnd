const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const CategoryModel = new Schema({
     idCategory : {type:Number, unique:true, required:true},
     nameCategory :{type:String ,required :true, default:''}
},{
   
})

module.exports =mongoose.model('Category', CategoryModel);