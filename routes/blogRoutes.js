import express from 'express'
import {
    obtenerBlogs,
    nuevoBlog,
    obtenerBlog,
    editarBlog,
    eliminarBlog
} from '../controllers/blogController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.get('/', checkAuth, obtenerBlogs)
router.post('/', checkAuth, nuevoBlog)

router
    .route('/:id')
    .get(checkAuth,obtenerBlog)
    .put(checkAuth,editarBlog)
    .delete(checkAuth,eliminarBlog)

export default router