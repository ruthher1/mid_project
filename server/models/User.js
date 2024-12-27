const mongoose=require("mongoose")
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true

    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true

    },
    address:{
        type:String,
        required:true

    },
    phone:{
        type:String,
    }
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)
