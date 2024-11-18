import mongoose from 'mongoose';

const anulSchema=new mongoose.Schema({
    Opcion:{
        type:String,
        required:true
    },
    Razon:{
        type:String,
        required:true

    },
    fecha:{
        type:Date,
        default:Date.now

    },
},{
    timestamps:true

})

export default mongoose.model('anulacion',anulSchema)