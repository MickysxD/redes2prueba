const {createReadStream} = require('fs')
const {createServer} = require('http')

var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

var app = express();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

var port = 80;
app.listen(port);
console.log('Server running in port: ', port);

/*var port = 80;
app.listen(port);
console.log('Server running in port: ', port);*/

app.post("/getReportes", async (req, res) => {
    console.log('getReportes');
    let body = req.body
    axios.post('http://balancer:4000/getReportes', body).then(function (x) {
        console.log(x.data);
        res.send(x.data)
    })

    
    /*let consulta = ` INSERT INTO REPORTE
                  (carnet, nombre, curso, cuerpo, obtenido_por, fecha)
                  VALUES
                  ( '${carne}', '${nombre}', '${curso}', '${cuerpo}','${server}', NOW());`;
    conn.query(consulta, function (err, result) {
      if (err){
        res.send(null);
      }else{
        res.send('{"res" : "si"}');
      }
    });*/
  
  });

/*// configuramos con una variable de entorno el puerto
const {PORT = 80} = process.env

// creamos con el content type del archivo que vamos a servir
const HTML_CONTENT_TYPE = 'text/html'

// creamos un requestListener para pasarle a nuestro servidor
const requestListener = (req, res) => {
  // escribimos en la respuesta el status code de 200 y el content type que necesitamos
  res.writeHead(200, { 'Content-Type': HTML_CONTENT_TYPE })
  // leemos el fichero index.html y su contenido lo redirigimos a la respuesta
  createReadStream('index.html').pipe(res)
}

// creamos un servidor con el requestListener
const server = createServer(requestListener)

// hacemos que el servidor escuche el puerto configurado
server.listen(PORT)*/