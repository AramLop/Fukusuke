import despacho from '../models/modDespacho.js';

export const getDespacho=async(req,res)=>{
    try{
        const despachado=await despacho.find();
        res.json(despachado);
    } catch(error){
        res.status(500).json({ message: "Error al obtener los datos del despacho", error });
    }
};

export const createDespacho=async (req,res)=>{
    try {
        // Check if req.body exists
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }

        const { Nombre, Apellido, Direccion, NumeroD, NumeroT, CodigoPostal } = req.body;

        // Validate required fields
        if (!Nombre || !Apellido || !Direccion) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const newDespacho=new despacho({
            Nombre,
            Apellido,
            Direccion,
            NumeroD,
            NumeroT,
            CodigoPostal,
        });

        const savedDespacho=await newDespacho.save();
        res.json(savedDespacho);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el despacho", error });
    }
};

export const deleteDespacho=async (req,res)=>{
    
    try{
        const { id } = req.params;
        const despachado=await despacho.findByIdAndDelete(id);
        res.json(despachado);
    } catch(error){
        res.status(500).json({ message: "Error la anulacion", error });
    }
};
export const updateDespacho=async (req,res)=>{
    const despachado=await despacho.findByIdAndUpdate(req.params.id,req.body) 
    res.json(despachado)
}