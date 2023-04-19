/**
 * 
 * Rakotondrazanaka Bruno
 * 21-03-2023
 * entreprise d'accueil : A2MI
 * projet xtreme_tournoi
 * 
 */


//require node js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const passwordGenerator = require('password-generator');

//require fichier local
const session = require('express-session');
const routes = require('./routes/routes');


const app = express();
const port = 8080;
const sessionSecret = passwordGenerator(64, false);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    allowedHeaders: ['sessionId', 'Content-Type', 'authorization'],
    exposedHeaders: ['sessionId'],
    origin:['http://localhost:8080', 'http://localhost:8100'],
    credentials: true,
    preflightContinue: false,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(
    session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(fileUpload({
    createParentPath: true
}));
app.get('/index',function(req,res){
  res.status(200).json({message:'hello world'})
})

app.use('/', routes);

app.listen(port, () => {console.log('Serveur bien lancer sur le port', port)});