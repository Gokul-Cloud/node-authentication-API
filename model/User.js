import  Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:25
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:8
    },
    date:{
        type:Date,
        default:Date.now
    }
})

export default Mongoose.model(' User', userSchema);