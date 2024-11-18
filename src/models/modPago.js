import mongoose from "mongoose";

const pagoSchema= new mongoose.Schema({
    Nombre:{
        type:String,
        require:true
    },
    Numero:{
        type:String,
        require:true
    },
    CVV:{
        type:String,
        require:true
    },
    Fecha:{
        type:Date,
        require:true
    },
    fecha:{
        type:Date,
        default:Date.now

    },
},{
        timestamps:true
    
})

export default mongoose.model('pago',pagoSchema)