import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    titulo:{
        type:String,
        trim:true,
        required:true
    },
    contenido:{
        type: String,
        trim:true,
        required:true
    },
    autor:{
        type:String,
        trim:true,
        required:true
    },
    fechaPublicacion:{
        type:Date,
        default:Date.now()
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    }
},{
    timestamps:true
})

const Blog = mongoose.model("Blog",blogSchema)

export default Blog