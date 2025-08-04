exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;
  // Simulación de creación de usuario
  console.log({ name, email, password });
  res.status(201).json({ message: 'Usuario registrado con éxito' });
};
