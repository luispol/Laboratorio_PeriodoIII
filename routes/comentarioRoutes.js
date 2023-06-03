import express from 'express'
import {
    agregarComentario,
    obtenerComentario,
    actualizarComentario,
    eliminarComentario
} from '../controllers/comentarioController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/',checkAuth,agregarComentario)

router
    .route('/:id')
    .get(checkAuth, obtenerComentario)
    .put(checkAuth, actualizarComentario)
    .delete(checkAuth, eliminarComentario)

export default router