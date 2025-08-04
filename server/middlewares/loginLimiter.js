const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // ⏱️ 30 minutos
  max: 5,                   // ❌ Máximo 5 intentos
  message: {
    message: 'Demasiados intentos. Intenta más tarde o contacta soporte.'
  },
  standardHeaders: true,    // 🔄 Headers modernos
  legacyHeaders: false,     // 🚫 No usar headers antiguos
});

module.exports = loginLimiter;
