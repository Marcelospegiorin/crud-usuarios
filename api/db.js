import mysql from "mysql";

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'CONFIGURE SEU USUARIO',
  password: 'CONFIGURE SUA SENHA',
  database: 'crud'
})
