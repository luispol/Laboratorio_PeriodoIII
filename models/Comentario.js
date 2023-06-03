import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    comentario:{
        type:String,
        trim:true,
        required:true
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }
},{
    timestamps:true
})

const Comentario = mongoose.model("Comentario",comentarioSchema)

export default Comentario