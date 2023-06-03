import Blog from "../models/Blog.js"
import Comentario from "../models/Comentario.js"

const agregarComentario = async (request, response)=>{
    const { blog } = request.body
    const existeBlog = await Blog.findById(blog)
    //Validacion si el blog existe
    if (!existeBlog){
        return response.status(404).json({msg:"El blog no existe"})
    }

    //Validacion para ver si el blog es propiedad del usuario autenticado
    if (existeBlog.creador.toString() !== request.usuario._id.toString()){
        return response.status(401).json({msg:"No tiene permisos para agregar comentarios"})
    }

    try {
        const comentarioAlmacenado = await Comentario.create(request.body)
        response.json(comentarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerComentario = async (request, response)=>{
    const {id} = request.params
    const comentario = await Comentario.findById(id).populate("blog")
    //Validacion si el comentario existe
    if(!comentario){
        return response.status(404).json({msg:"Comentario no encontrado"})
    }
    //Validacion si es propietario del comentario
    if(comentario.blog.creador.toString() !== request.usuario._id.toString()){
        return response.status(404).json({msg:"Accion no valida"})

    }
    response.json(comentario)
}

const actualizarComentario = async (request, response)=>{
    const {id} = request.params
    const comentario = await Comentario.findById(id).populate("blog")
    //Validacion si el comentario existe
    if(!comentario){
        return response.status(404).json({msg:"Comentario no encontrado"})
    }
    //Validacion si es propietario del comentario
    if(comentario.blog.creador.toString() !== request.usuario._id.toString()){
        return response.status(404).json({msg:"Accion no valida"})
    }
    comentario.nombre = request.body.nombre || comentario.nombre
    comentario.email = request.body.email || comentario.email
    comentario.comentario = request.body.comentario || comentario.comentario
    try {
        const comentarioAlmacenado = await comentario.save()
        response.json(comentarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarComentario = async (request, response)=>{
    const {id} = request.params
    const comentario = await Comentario.findById(id).populate("blog")
    //Validacion si el comentario existe
    if(!comentario){
        return response.status(404).json({msg:"Comentario no encontrado"})
    }
    //Validacion si es propietario del comentario
    if(comentario.blog.creador.toString() !== request.usuario._id.toString()){
        return response.status(404).json({msg:"Accion no valida"})
    }

    try {
        await comentario.deleteOne()
        response.json({msg:"Comentario eliminado"})
    } catch (error) {
        console.log(error)
    }
}

export{
    agregarComentario,
    obtenerComentario,
    actualizarComentario,
    eliminarComentario
}


