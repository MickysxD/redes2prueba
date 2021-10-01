var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
var uuid = require('uuid');

var app = express();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const aws_keys = require('./users');

var port = 3000;
app.listen(port);
console.log('Server running in port: ', port);

//MySQL base de datos
var conn = mysql.createPool(aws_keys.db_credentials);

//--------------------------------------------------BASES DE DATOS---------------------------------------//


app.post("/crearReporte", async (req, res) => {
  console.log("CREAR REPORTE----------------->")
  const server = process.env.SERVER_NAME;
  const carne = req.body.carne;
  const nombre = req.body.nombre;
  const curso = req.body.curso;
  const cuerpo = req.body.cuerpo;
  const fecha = "NOW()";

  
  let consulta = ` INSERT INTO REPORTE
                (carnet, nombre, curso, cuerpo, obtenido_por, fecha)
                VALUES
                ( '${carne}', '${nombre}', '${curso}', '${cuerpo}','${server}', NOW());`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send('{"res" : "si"}');
    }
  });

});


app.post("/modificarUsuario", async (req, res) => {
  console.log("MODIFICAR USUARIO----------------->")
  let body = req.body;

  let user = body.user;
  let userNew = body.userNew;
  let nombre = body.nombre;
  let url = body.url;

  let consulta = `update Usuario set codigo_usuario="${userNew}", nombre="${nombre}", url_fotop="${url}" where codigo_usuario="${user}";`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      console.log(result)
      res.send('{"res":"si"}');
    }
  });

});

app.post("/getReportes", async (req, res) => {
  console.log("BUSCAR REPORTES----------------->")
  let body = req.body;
  let id = body.searchID;
  let consulta = `select * from REPORTE`;
  if(id != undefined && id != ''){
    consulta += ` WHERE carnet= '${id}'`;
  }
  console.log(consulta);
  conn.query(consulta, function (err, result) {
    var respuesta = { data: result, server: process.env.SERVER_NAME };
    
    if (err){
      res.send(null);
    }else{
      res.send((respuesta));
    }
  });

});

app.post("/getReporte", async (req, res) => {
  console.log("BUSCAR REPORTES----------------->")
  let body = req.body;
  let id = body.searchID;
  let consulta = `select * from REPORTE`;
  if(id != undefined && id != ''){
    consulta += ` WHERE id_reporte= ${id}`;
  }
  console.log(consulta);
  conn.query(consulta, function (err, result) {
    var respuesta = { data: result, server: process.env.SERVER_NAME };
    
    if (err){
      res.send(null);
    }else{
      res.send((respuesta));
    }
  });

});