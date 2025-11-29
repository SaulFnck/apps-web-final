const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SaulDiaz2909", //Contraseña desde mySQL
  database: "db_biblioteca",
});

connection.connect((err) => {
  if (err) {
    console.log("Error conectando a MySQL", err);
  }
  console.log("Conectado a MySQL");
});

module.exports = connection;
