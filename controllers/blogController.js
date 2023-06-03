import Blog from "../models/Blog.js"
import Comentario from "../models/Comentario.js"

const obtenerBlogs = async (request,response)=>{
    const blogs = await Blog.find({creador:request.usuario._id})
    response.json(blogs)
}

//Metodo para crear un nuevo blog
const nuevoBlog = async (request,response)=>{
    const blog = new Blog(request.body)
    blog.creador=request.usuario._id
    try {
        const blogAlamacenado=await blog.save()
        response.json(blogAlamacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerBlog = async (request,response)=>{
    const {id} = request.params

    const blog = await Blog.findById(id)

    if(!blog){
        return response.status(404).json({msg:"Blog no encontrado"})
    }

    if(blog.creador.toString() !== request.usuario._id.toString()){
        return response.status(403).json({msg:"Accion no valida"})
    }

    //Obtener todos los comentarios del blog
    const comentarios = await Comentario.find().where("blog").equals(blog._id)

    response.json({
        blog,
        comentarios
    })
}

const editarBlog = async (request,response)=>{
    const {id} = request.params

    const blog = await Blog.findById(id)

    if(!blog){
        return response.status(404).json({msg:"Blog no encontrado"})
    }
    if(blog.creador.toString() !== request.usuario._id.toString()){
        return response.status(403).json({msg:"Accion no valida"})
    }
    blog.titulo = request.body.titulo || blog.titulo
    blog.contenido = request.body.contenido || blog.contenido
    blog.autor = request.body.autor || blog.autor
    blog.creador = request.body.creador || blog.creador

    try {
        const blogAlamacenado = await blog.save()
        response.json(blogAlamacenado)        
    } catch (error) {
        console.log(error)
    }
}

const eliminarBlog = async (request,response)=>{
    const {id} = request.params

    const blog = await Blog.findById(id)

    if(!blog){
        return response.status(404).json({msg:"Blog no encontrado"})
    }
    if(blog.creador.toString() !== request.usuario._id.toString()){
        return response.status(403).json({msg:"Accion no valida"})
    }

    try {
        await blog.deleteOne()
        response.json({msg:"Blog eliminado"})        
    } catch (error) {
        console.log(error)
    }
}

export {
    obtenerBlogs,
    nuevoBlog,
    obtenerBlog,
    editarBlog,
    eliminarBlog
}
