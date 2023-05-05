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

//traitement d'un nouveau client dans le controller lors de l'inscription
exports.enregistrementNouveauClient = async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", OriginClient);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    try {
      let parse = req.body;
      let example;
      try {
        example  = JSON.parse(parse)
      } catch(e) {
        example = parse
      }
      let { nom_client,  prenom_client, pseudo_client, email_client, mot_de_passe_client } = {
          nom_client: req.body.nom_client ? ent.encode(req.body.nom_client) : null,
          prenom_client: req.body.prenom_client ? ent.encode(req.body.prenom_client) : null,
          pseudo_client: req.body.pseudo_client ? ent.encode(req.body.pseudo_client) : null,
          email_client: req.body.email_client ? ent.encode(req.body.email_client) : null,
          mot_de_passe_client: req.body.mot_de_passe_client ? ent.encode(req.body.mot_de_passe_client): null,
          photo_profil: parse.photo_profil ? ent.encode(parse.photo_profil) : "public/profil.png",
      }

      if (
        !email_client ||
        !prenom_client ||
        !nom_client ||
        !pseudo_client ||
        !mot_de_passe_client
      ) {
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
        var tabNomFichier = ent.encode(parse.photo_profil).split("/");
        var fileName= tabNomFichier[tabNomFichier.length -1];

        var profil = req.body.photo_profil
    
        const base64data = profil.replace(/^data:.*,/, '');
        fs.writeFile("public/images/users/" + fileName, base64data, 'base64', (err) => {
           if (err) {
                res.status(400).json({msg: 'Erreur Upload image'});    
                return;
           } 

         });

        await Clients.create({
          nom_client: nom_client,
          prenom_client: prenom_client,
          pseudo_client: pseudo_client,
          email_client: email_client,
          mot_de_passe_client: mot_de_passe_client,
          photo_profil: profil
        });
  
        res.status(200).json({
          success: true
        });
        return;
  
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({msg: error._message ? error._message : "Erreur interne !"});
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