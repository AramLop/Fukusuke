// c:\Users\alara\Workspace\Fukusukee\src\backend\Aram\server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el JSON

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Sin opciones obsoletas
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();

// Definir un modelo de ejemplo (Usuario)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Corregido: Eliminado el espacio extra en 'User '
const User = mongoose.model('User ', userSchema); // Sin espacio

// Rutas de ejemplo
app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  try {
    await user.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});