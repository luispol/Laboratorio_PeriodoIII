import express from "express"
const router = express.Router()
import { registrar, autenticar, perfil } from "../controllers/usuarioController.js"
import checkAuth from "../middleware/checkAuth.js"


router.post('/', registrar)

router.post('/login', autenticar)

router.get('/perfil', checkAuth,perfil)

export default router