var Categoria = require("./categoria");
const dbocategoria = require("./dbcategoria");

//MODULOS REQUERIDOS GLOBALMENTE
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const Categoria = require("./categoria");

var app = express();
var router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", router); //MI RUTA PRINCIPAL

//RUTA SELECT
router.route("/categoria").get((request, response) => {
  dbocategoria.getCategoria().then((result) => {
    response.json(result[0]);
  });
});

//RUTA SELECT POR ID
router.route("/categoria/:id").get((request, response) => {
  dbocategoria.getCategoria_x_id(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

//RUTA INSERTAR
router.route("/categoria/guardar").post((request, response) => {
  dbocategoria.insertCategoria(categoria).then((result) => {
    let categoria = { ...request.body };
    response.json(result[0]);
  });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("CATEGORIA API INICIADO EN PUERTO : " + port);
