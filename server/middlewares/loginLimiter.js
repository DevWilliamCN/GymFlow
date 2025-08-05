const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutos
  max: 5, // máximo 5 intentos
  message: {
    message: 'Demasiados intentos. Intenta más tarde o contacta soporte.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
