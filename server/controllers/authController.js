const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { firstName, lastName, dateOfBirth, email, password } = req.body;

  try {
    if (!firstName || !lastName || !dateOfBirth || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const parsedDate = new Date(dateOfBirth);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: 'Fecha de nacimiento inválida' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      dateOfBirth: parsedDate,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', token });
  } catch (err) {
    console.error('❌ Error en register:', err.message);
    res.status(500).json({ message: 'Error interno al registrar', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ Error en login:', err.message);
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};

const protectedRoute = (req, res) => {
  res.status(200).json({ message: 'Ruta protegida accedida correctamente' });
};

module.exports = { register, login, protectedRoute };
