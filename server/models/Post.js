const mongoose=require("mongoose")
const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    body:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Post',postSchema)
