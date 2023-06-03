import mongoose from "mongoose"
import bcrypt from 'bcrypt'


//Estructura del esquema para la coleccion de Usuarios

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

}, {
    timestamps: true
}
)

//Asignamos un metodo pre, para poder ejecutarlo antes de guardarlo
usuarioSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    //Nivel de complejidad de la clave sera de 10
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

usuarioSchema.methods.comprobarPassword = async function(passwordForm){
    return await bcrypt.compare(passwordForm,this.password)
}

const Usuario = mongoose.model("Usuario",usuarioSchema)

export default Usuario