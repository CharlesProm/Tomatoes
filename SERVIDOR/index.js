const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'public/img')));
app.use(express.static(path.join(__dirname, 'libs')));
//app.use(express.static(path.join(__dirname, 'public/views')));
app.use(express.static(path.join(__dirname, 'public')));

//setting
app.use(require('./src/routes/index'))


const PORT = 3000;
const server = app.listen(PORT, function () {
  console.log(`Escuchando en el puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

