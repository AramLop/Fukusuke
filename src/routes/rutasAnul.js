import {Router} from 'express'

import {
    getAnulacion,
    createAnulacion,
    deleteAnul,
    updateAnul,
} from "../controllers/anulControladores.js"


const router=Router()
router.get('/anulacion/',getAnulacion)
router.get('/anulacion/:id',getAnulacion)
router.post('/anulacion',createAnulacion)
router.delete('/anulacion/:id', deleteAnul);
router.put('/anulacion/:id',updateAnul)

export default router