const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const ViewModel = new Schema(
  {  numberView :{type:Number,default:0}
    }
)

module.exports= mongoose.model('View',ViewModel);
