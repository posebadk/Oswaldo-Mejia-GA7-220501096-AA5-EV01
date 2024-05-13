const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1037572712',
  database: 'login_form',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión exitosa a MySQL');
});

app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en el servidor' });
      return;
    }
    res.status(201).json({ message: 'Registro exitoso' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en el servidor' });
      return;
    }

    if (result.length === 0) {
      res.status(401).json({ message: 'Error en la autenticación' });
    } else {
      res.status(200).json({ message: 'Autenticación satisfactoria' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});