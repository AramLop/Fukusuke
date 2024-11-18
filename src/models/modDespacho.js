import mongoose from "mongoose";

const despaSchema=new mongoose.Schema({
    Nombre:{
        type:String,
        require:true
    },
    Apellido:{
        type:String,
        require:true
    },
    Direccion:{
        type:String,
        require:true
    },
    numeroD:{
        type:Number,
        require:true
    },
    NumeroT:{
        type:Number,
        require:true
    },
    CodigoPostal:{
        type:Number,
        require:true
    },
    fecha:{
        type:Date,
        default:Date.now

    },


},{
    timestamps:true

})

export default mongoose.model('despacho',despaSchema)