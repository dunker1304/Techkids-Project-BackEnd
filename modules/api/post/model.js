const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const CommentSchema = new Schema({
    content:{type:String, require:true},
    author:{type:Schema.Types.ObjectId,ref:'User'}
},{
    timestamps: true,
        
})

const PostModel =  new Schema(
{ 
  title :{type: String, default:''},
  like:{type:Number ,default:0},
  view:{type:Number,default:0},
  description:{type:String,default:''},
  author:{type:Schema.Types.ObjectId,ref:'User'},
  category: { type:Schema.Types.ObjectId,ref:'Category' },
  comment : {type: [CommentSchema], default:[]}
},
{timestamps:true}
)
module.exports= mongoose.model('Post',PostModel);

