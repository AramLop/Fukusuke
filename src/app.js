import express from 'express';
import morgan from 'morgan';
import rutasPagos from './routes/rutasPago.js';
import rutasAnul from './routes/rutasAnul.js';
import rutasDespa from './routes/rutasDespa.js';
import cors from 'cors'

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(express.json());

app.use(morgan('dev'));

app.use('/api',rutasPagos)
app.use('/api',rutasAnul)
app.use('/api/',rutasDespa)
export default app;