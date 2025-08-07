const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token faltante.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Usamos siempre "userId", que es como lo firmas en el login
    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.error('❌ Error al verificar el token:', err.message);
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
