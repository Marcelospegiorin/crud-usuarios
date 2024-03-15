import {db} from '../db.js';

export const getUsers = (_, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
}

export const getUserById = (req, res) => {

  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;

  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ er3ror: 'Erro ao buscar usuário', details: err });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(data);
  });
}

export const addUser = (req, res) => {
  const query = "INSERT INTO users(`name`, `email`, `phone`, `date_birth`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ]

  db.query(query, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json('Usuário criado com sucesso!');
  });
}

export const updateUser = (req, res) => {
  const query = "UPDATE users SET `name` = ?, `email` = ?, `phone` =? , `date_birth` =? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ]

  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
}

export const deleteUser = (req, res) => {

  const userId = req.params.id;
  const query = `DELETE FROM users WHERE id = ${userId}`;

  
  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
}
