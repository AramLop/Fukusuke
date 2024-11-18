import {Router} from 'express'
import{
    getDespacho,
    createDespacho,
    deleteDespacho,
    updateDespacho,
} from '../controllers/despaControladores.js'

const router=Router()
router.get('/despacho/',getDespacho)
router.get('/despacho/:id',getDespacho)
router.post('/despacho',createDespacho)
router.delete('/despacho/:id',deleteDespacho)
router.put('/despacho/:id',updateDespacho)

export default router