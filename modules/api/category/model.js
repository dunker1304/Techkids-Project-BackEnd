const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const CategoryModel = new Schema({
     idCategory : {type:number, unique:true},
     nameCategory :{type:String ,required :true, default:''}
},{
    _id:false
})

module.exports =mongoose.model('Category', CategoryModel);