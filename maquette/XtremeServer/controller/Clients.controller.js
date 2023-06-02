const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const ent = require('ent');
const { Op } = require('sequelize');
const fs = require('fs');
//const nodemail_clienter = require('nodemail_clienter');
const fileupload = require('express-fileupload');
// const hbs = require('nodemail_clienter-express-handlebars');
const Clients = require('../model/Clients.model');
//const { Where } = require('sequelize/types/utils');
const OriginClient = process.env.OriginClient;
const secretKey = process.env.secretKey_user;
const SteamOpenID = require('node-steam-openid');

const steamCallback = async (steamId, req, res) => {
  try {
    // Vérifier si l'ID Steam existe déjà dans la base de données
    const existingClient = await Clients.findOne({
      where: {
        steamId: steamId
      }
    });

    if (existingClient) {
      // Rediriger l'utilisateur vers une page indiquant que l'ID Steam existe déjà
      res.redirect('/connexion');
      return;
    }

    // Créer un nouveau client avec l'ID Steam
    const newClient = await Clients.create({
      steamId: steamId
    });

    // Stocker l'ID Steam dans la session
    req.session.steamId = steamId;
    console.log(steamId);
    // Rediriger l'utilisateur vers la page souhaitée après l'authentification
    res.redirect('/profil');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'authentification Steam.' });
  }
};

exports.enregistrementNouveauClient = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", OriginClient);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  const { nom_client, prenom_client, pseudo_client, email_client, mot_de_passe_client, photo_profil } = req.body;

  if (!email_client || !prenom_client || !nom_client || !pseudo_client || !mot_de_passe_client) {
    res.status(400).json({
      msg: 'Tous les champs sont requis !'
    });
    return;
  }

  const client = await Clients.findOne({
    where: {
      [Op.or]: [{
        email_client
      }, {
        id_client: email_client
      }]
    }
  });

  if (client) {
    if (Clients.email_client === email_client) res.status(400).json({
      msg: 'Cet email existe déjà !'
    });
  } else {
    try {
      var tabNomFichier = ent.encode(photo_profil).split("/");
      var fileName = tabNomFichier[tabNomFichier.length - 1];

      var profil = req.body.photo_profil;

      const base64data = profil.replace(/^data:.*,/, '');
      fs.writeFile("public/images/users/" + fileName, base64data, 'base64', (err) => {
        if (err) {
          res.status(400).json({ msg: 'Erreur Upload image' });
          return;
        }
      });

      // Configuration de l'authentification Steam
      const steamOpenID = new SteamOpenID({
        realm: 'http://localhost:8100',
        returnUrl: 'http://localhost:8100/profil',
        apiKey: '6CCB108DFD78B21E084DDE46BCEEE16D'
      });

      // Appeler la méthode authenticate pour effectuer l'authentification Steam
      steamOpenID.authenticate(req, res, async (error, steamId) => {
        console.log(steamId);
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'Une erreur est survenue lors de l\'authentification Steam.' });
        } else {
          if (steamId) {
            // Appeler la fonction pour enregistrer l'identifiant Steam dans la base de données
            console.log(steamId);
            steamCallback(steamId);
          }

          // Créer un nouveau client avec les données du formulaire
          await Clients.create({
            nom_client: nom_client,
            prenom_client: prenom_client,
            pseudo_client: pseudo_client,
            email_client: email_client,
            mot_de_passe_client: mot_de_passe_client,
            photo_profil: profil,
            steamId: steamId
          });

          res.status(200).json({
            success: true
          });
          return;
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error._message ? error._message : "Erreur interne !" });
    }
  }
};


//function qui permet au utilisateur de se connecter
exports.clientsLogin = async(req, res)=>{
  res.setHeader("Access-Control-Allow-Origin", OriginClient);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  req.session.userAttempt = typeof req.session.userAttempt !== 'number' ? 0 : req.session.userAttempt;
    
  if(req.session.userAttempt > 3) {
      res.status(400).json({msg: 'Les 3 tentatives sont expirées, veuillez attendre quelques minutes !'});
      return;
  }
  
  try {
      const { mot_de_passe_client, email_client } = {
        email_client: req.body.email_client ? ent.encode(req.body.email_client) : "",
        mot_de_passe_client: req.body.mot_de_passe_client ? ent.encode(req.body.mot_de_passe_client): "",
      }

      // Error handling
      if(!email_client || !mot_de_passe_client) {
          res.status(400).json({msg: 'Email ou numero, et mot de passe sont requis !'});
          return;
      }
      //

      const client = await Clients.findOne({ 
          where:{
              [Op.or]:[{ email_client }, { pseudo_client: email_client }] 
          }
      });

      if (client){
           
          // 
          const isMatch = await bcrypt.compare(mot_de_passe_client, client.mot_de_passe_client);

          if(!isMatch){
              req.session.userAttempt ++;
              res.status(403).json({auth: false, msg: 'Mot de passe erroné !'});
              return;
          }

          delete client.mot_de_passe_client;

          jwt.sign({ client: client }, secretKey, async (error, token) => {

              if(error) {
                  console.log(error);                    
                  res.status(500).json({msg: "Erreur interne !"}); 
                  return;
              }

              /*await UserToken.create({
                  token, clientId: client.id_client
              })*/

              req.session.loggedin = true;
              req.session.email_client = email_client;
              res.status(200).json({auth: true , token, client: client});

          });

          
      }

      else {
          res.status(403).json({auth: false, msg: "Cet utilisateur n'existe pas !"});
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({msg: "Erreur interne !"});
  }
}



//mise a jour mdp
exports.mettreAjoursMdpCtrl = async(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", OriginClient);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  try {
      
      const email_client = req.body.email_client ? ent.encode(req.body.email_client) : null;

      if(!email_client) {
          res.status(400).json({msg: 'Email ou numero de téléphone requis !'});
          return;
      }

      const client = await Clients.findOne({
          where:{
              [Op.or]:[{ email_client: email_client },{ id_client: email_client }]
          }
      });

      if(!client) {
          res.status(400).json({msg: 'Email ou numero de téléphone non valide !'});
          return;
      }

      const newPassword = generatePassword.generate({
          length: 10,
          numbers: true,
      });

      const mailOptions = Mail.mailOptions(
          mailUser, 
          'nifenitr@gmail.com',
          'Test',
          `
              <h1>This is the password</h1>
              ${newPassword}
          `
      )

      await Mail.send(mailOptions);

      client.mot_de_passe_client = newPassword;

      await client.update({
        mot_de_passe_client: newPassword
          },{where:{
              email_client: email_client
          }})

      await UserToken.destroy({
          where:{ 
              clientId: client.id_client 
          }
      });

      res.status(200).json({succes: true, msg: 'New password sent to your email !'});

  } catch (error) {
      console.log(error);
      res.status(500).json({msg: "Erreur interne !"});
  }
}

//deconnexion
exports.deconnexion = async(req, res) => 
{
    
}

//lister tous les clients
exports.listeClients = async (req,res)=>{
  try {
    const clients = await Clients.findAll();
    res.status(200).json(clients);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//profil clients
exports.clientProfile = async (req, res) => {
  var id = req.session.clientId
  try {
    const Clients = await Clients.findOne({
      where: {
        id_client: id
      },
      logging: (query) => {
        console.log(query);
      },
    });
    res.status(200).json(Clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.verify = async (req, res) => {
    /// Verify if Clients exists
    res.setHeader("Access-Control-Allow-Origin", OriginClient);
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    res.status(200).json({ client: req.client, auth: true });
}