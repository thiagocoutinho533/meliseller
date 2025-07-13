const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) return res.status(400).json({ message: 'Email já cadastrado.' });

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await pool.query('INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senhaCriptografada]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ message: 'Email ou senha incorretos.' });

    const senhaValida = await bcrypt.compare(senha, user.rows[0].senha);
    if (!senhaValida) return res.status(400).json({ message: 'Email ou senha incorretos.' });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.rows[0].id, nome: user.rows[0].nome, email: user.rows[0].email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};
