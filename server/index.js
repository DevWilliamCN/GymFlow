const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// ✅ Seguridad con Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Desactivar si usás inline styles/scripts
}));

// ✅ Dominios permitidos
const allowedOrigins = [
  'http://localhost:5173',
  'https://gym-flow-devwilliamcns-projects.vercel.app',
  'https://gym-flow-wine.vercel.app',
  'https://gym-flow-git-main-devwilliamcns-projects.vercel.app',
  'https://gym-flow-5jxmfiwxw-devwilliamcns-projects.vercel.app',
  'https://gym-flow-7ski.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ Origen no permitido por CORS:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Middleware para preflight y JSON
app.options('*', cors());
app.use(express.json());

// 📦 Rutas y modelos
const User = require('./models/User');
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 🔍 Ruta pública para probar
app.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
  }
});

// ✅ Conexión a MongoDB y levantamiento del servidor
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'gymflow',
})
.then(() => {
  console.log('🟢 Conectado a MongoDB');

  const PORT = process.env.PORT || 8080;

  // ✅ Escuchar en todas las interfaces (requerido por Railway)
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error de conexión a MongoDB:', err);
});
