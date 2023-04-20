const crypto = require('crypto');
const nodemailer = require('nodemailer');
const fileupload = require('express-fileupload');
// const hbs = require('nodemailer-express-handlebars');
const Clients = require('../model/Clients.model');

const email_utiliser = 'tsikybr@gmail.com';
const password_utiliser = '3120annivk';

//traitement d'un nouveau client dans le controller lors de l'inscription
exports.enregistrementNouveauClient = async(request, response) => {

   
};


//function qui permet au utilisateur de se connecter
exports.clientsLogin = async(req, res)=>{
   
}



//mise a jour mdp
exports.mettreAjoursMdpCtrl = async(req,res)=>{
    let old_password = crypto.createHash('sha3-512').update(req.body.encien_mdp).digest('hex');
    let new_password = crypto.createHash('sha3-512').update(req.body.nouveau_mdp).digest('hex');
    console.log(req.session.clientId)
      
}

//deconnexion
exports.deconnexion = async(req, res) => 
{
    
}

//lister tous les clients
exports.listeClients=(req,res)=>{
    
}

//profil clients
exports.clientProfile = (req, res) => {
    
}