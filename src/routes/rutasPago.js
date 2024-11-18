import {Router} from 'express'
import {
    getPago,
    createPago,
    deletePago,
} from '../controllers/pagoControladores.js'

const router=Router()
router.get('/pago/',getPago)
router.get('/pago/:id',getPago)
router.post('/pago',createPago)
router.delete('/pago/:id',deletePago)
router.put('/pago/:id')

export default router