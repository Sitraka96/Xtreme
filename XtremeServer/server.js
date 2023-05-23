//require node js
const express = require('express');
const cors = require('cors');
const http = require("http");
require('dotenv').config();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const passwordGenerator = require('password-generator');
const passport = require('passport');
var passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;
const helmet = require('helmet');

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

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://steamloopback.host https://* http://* https://steamcommunity.com/");
  next();
});

app.use(cors({
  allowedHeaders: ['sessionId', 'Content-Type', 'authorization', 'x-csrftoken'],
  exposedHeaders: ['sessionId'],
  origin: ['http://localhost:8080', 'http://localhost:8100', 'http://localhost:4200'],
  credentials: true,
  preflightContinue: false,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
}));

/*app.use(cors({
    allowedHeaders: ['sessionId', 'Content-Type', 'authorization', ' x-csrftoken'],
    exposedHeaders: ['sessionId'],
    origin:['http://localhost:8080', 'http://localhost:8100','http://localhost:4200'],
    credentials: true,
    preflightContinue: false,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
}));*/

app.use(fileUpload({
    createParentPath: true
}));

//methode steam
app.use('/', routes);

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
  done(null, user);
 });
 passport.deserializeUser((user, done) => {
  done(null, user);
 });
 // Initiate Strategy
 passport.use(new SteamStrategy({
  returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
  realm: 'http://localhost:' + port + '/',
  apiKey: '6CCB108DFD78B21E084DDE46BCEEE16D'
  }, function (identifier, profile, done) {
   process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
   });
  }
 ));
 
 app.use(session({
  secret: 'Whatever_You_Want',
  saveUninitialized: true,
  resave: false,
  cookie: {
   maxAge: 3600000
  }
 }))
 app.use(passport.initialize());
 app.use(passport.session());

 /*app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "http://localhost:8100"],
      connectSrc: ["'self'", "http://localhost:8080"]
    }
  })
);*/


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