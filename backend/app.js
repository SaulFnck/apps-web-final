const express = require("express");
const cors = require("cors"); //Peticiones desde angular
const connection = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extender: true }));

const port = 3000;

app.listen(port, () => {
  console.log("My port is working on  " + port);
});

//EndPoints

//Libros
app.get("/getAllLibros", (req, res) => {
  const sql = `SELECT * FROM Libros`;

  connection.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al traer datos de libros" });
    }

    res.status(200).json(result);
  });
});

app.post("/saveLibro", (req, res) => {
  console.log("Datos Recibidos desde Angular:", req.body);

  const data = req.body; // Debe tener las mismas llaves que la tabla Libros

  // INSERT directo usando la sintaxis SET ?
  const sql = "INSERT INTO Libros SET ?";

  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error al insertar libro:", err);
      return res
        .status(500)
        .json({ message: "Error al insertar libro", error: err });
    }

    res.status(200).json({
      message: "Libro insertado correctamente",
      idInsertado: result.insertId,
    });
  });
});

app.put("/updateLibro/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const sql = "UPDATE Libros SET ? WHERE idLibro = ?";

  connection.query(sql, [data, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar libro:", err);
      return res
        .status(500)
        .json({ message: "Error al actualizar libro", error: err });
    }

    res.status(200).json({
      message: "Libro actualizado correctamente",
    });
  });
});

// Obtener autores
app.get("/autores", (req, res) => {
  const sql = "SELECT * FROM Autores";

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer autores" });
    }
    res.status(200).json(result);
  });
});

// Obtener editoriales
app.get("/editoriales", (req, res) => {
  const sql = "SELECT * FROM Editoriales";

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer editoriales" });
    }
    res.status(200).json(result);
  });
});
