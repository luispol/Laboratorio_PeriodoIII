import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import usuariosRoutes from './routes/usuarioRoutes.js'
import blogsRoutes from './routes/blogRoutes.js'
import comentariosRouter from './routes/comentarioRoutes.js'

const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

//Parte de las rutas
//Ruta para los usuarios
app.use('/api/usuarios',usuariosRoutes)
//Ruta para los blogs
app.use('/api/blogs', blogsRoutes)
//Ruta para los comentarios
app.use('/api/comentarios', comentariosRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})
