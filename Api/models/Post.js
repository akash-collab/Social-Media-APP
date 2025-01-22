const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
}, { timestamps: true });

//To export the schema and use it in user and auth
module.exports = mongoose.model("Post", PostSchema);