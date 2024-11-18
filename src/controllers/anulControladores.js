import anulacion from '../models/modAnulacion.js';

export const getAnulacion = async (req,res)=>{
    try{
        const anulado=await anulacion.find();
        res.json(anulado);
    } catch(error){
        res.status(500).json({ message: "Error la anulacion", error });
    }
};

export const createAnulacion=async(req,res)=>{
    const{Opcion,Razon}=req.body;

    const newAnulacion=new anulacion({
        Opcion,
        Razon,
    });

    try{
        const savedAnulacion=await newAnulacion.save();
        res.json(savedAnulacion);
    }catch(error){
        res.status(500).json({ message: "Error la anulacion", error });
    }
};

export const deleteAnul=async (req,res)=>{
    
    try{
        const { id } = req.params;
        const anulado=await anulacion.findByIdAndDelete(id);
        res.json(anulado);
    } catch(error){
        res.status(500).json({ message: "Error la anulacion", error });
    }
};

export const updateAnul=async (req,res)=>{
    const anulado=await anulacion.findByIdAndUpdate(req.params.id,req.body) 
    res.json(anulacion)
}