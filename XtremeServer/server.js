//require node js
const express = require('express');
const cors = require('cors');
const http = require("http")
var https = require('https');
require('dotenv').config()
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const passwordGenerator = require('password-generator');

//require fichier local
const session = require('express-session');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sessionSecret = passwordGenerator(64, false);

const sessionMiddleware = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 * 15 },
  });
// Sessions accessible via req.session
app.use(sessionMiddleware);

app.use(cors({
    allowedHeaders: ['sessionId', 'Content-Type', 'authorization', ' x-csrftoken'],
    exposedHeaders: ['sessionId'],
    origin:['http://localhost:8080', 'http://localhost:8100','http://localhost:4200'],
    credentials: true,
    preflightContinue: false,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
}));

app.use(fileUpload({
    createParentPath: true
}));


app.use('/', routes);

const server = http.createServer(app).listen(port, () => console.log(`Serveur bien lancer sur le port ${port}`))
const { Server } = require("socket.io");
const io = new Server(server);

const socketSessionMiddleware = (socket, next) => {
  sessionMiddleware(socket.request, {}, next);
};

io_admin = require('./sockets/io_admin')(socketSessionMiddleware, io);
io_user = require('./sockets/io_user')(socketSessionMiddleware, io);

module.exports = {
  server,
  io_admin,
  io_user
};