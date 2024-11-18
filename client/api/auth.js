import axios from "axios";

const API = 'http://localhost:4000/api';
export const registerRequest = (user) => axios.post(`${API}/anulacion`, user);
export const  pagoRequest =(user)=> axios.post(`${API}/pago`, user)
export const  despachoRequest =(user)=> axios.post(`${API}/despacho`, user)