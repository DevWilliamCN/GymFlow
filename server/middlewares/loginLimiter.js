const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit'); // ✅ Importar helper oficial

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 5,
  message: 'Demasiados intentos fallidos. Intenta de nuevo en unos minutos.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    // ✅ Si hay correo, usarlo como clave de limitación
    if (req.body.email) {
      return req.body.email;
    }
    // ✅ Si no, usar IP con el helper oficial
    return ipKeyGenerator(req, res);
  },
});

module.exports = loginLimiter;