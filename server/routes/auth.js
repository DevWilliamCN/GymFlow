const express = require('express');
const router = express.Router();

const { register, login, protectedRoute } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware'); // carpeta correcta
const loginLimiter = require('../middlewares/loginLimiter');  // carpeta correcta

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/protected', verifyToken, protectedRoute); // Ruta protegida

module.exports = router;