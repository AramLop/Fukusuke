import Pago from '../models/modPago.js';

export const getPago = async (req, res) => {
    try {
        const pagos = await Pago.find();
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pagos", error });
    }
};

export const createPago = async (req, res) => {
    try {
        const { Nombre, Numero, CVV, Fecha } = req.body;
        
        // Validar campos obligatorios
        if (!Nombre || !Numero || !CVV || !Fecha) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newPago = new Pago({ Nombre, Numero, CVV, Fecha });
        const savedPago = await newPago.save();

        res.json(savedPago);
    } catch (error) {
        console.error("Error en createPago:", error); // Para diagnosticar
        res.status(500).json({ message: "Error al guardar el pago", error });
    }
};

export const deletePago=async (req,res)=>{
    
    try{
        const { id } = req.params;
        const pagos=await Pago.findByIdAndDelete(id);
        res.json(pagos);
    } catch(error){
        res.status(500).json({ message: "Error la anulacion", error });
    }
};

export const updatePago=async (req,res)=>{
    const pagos=await findbyidandupdate(req.params.id,req.body) 
    res.json(pagos)
}