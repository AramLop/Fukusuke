import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
    },
    Numero: {
        type: String,
        required: true,
    },
    CVV: {
        type: String,
        required: true,
    },
    Fecha: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true, 
});

export default mongoose.model('Pago', pagoSchema); 