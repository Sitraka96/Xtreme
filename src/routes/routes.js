/**
 * 
 * Rakotondrazanaka Bruno
 * 21-03-2023
 * entreprise d'accueil : A2MI
 * projet xtreme_tournoi
 * 
 */


const express = require('express');


const client_controller = require('../controller/Clients.controller');
const admin_controller =require('../controller/Admin.controller')


const router = express.Router();


// const sessionMiddlewareClient = function(req, res, next) {
//     (!req.session.clientId)?res.status(400).json({message: " connecter d'abbord "}):next();
// }
const sessionMiddlewareAdmin = function(req, res, next) {
    (!req.session.Admin)?res.status(400).json({message: " connecter d'abbord en tant qu'admin "}):next();
}


//declaration des routes en fonction des besoin
router.post('/inscription', client_controller.enregistrementNouveauClient);
router.post('/connexion', client_controller.clientsLogin);
router.post('/editpassword/:id_connecter',  client_controller.mettreAjoursMdpCtrl);
router.post('/valider', client_controller.validerCompte);
router.post('/admin', admin_controller.adminLogin);
router.get('/deconnecter', client_controller.deconnexion);
router.get('/profil', client_controller.clientProfile);
router.get('/clients', sessionMiddlewareAdmin,client_controller.listeClients);
router.get('/Admin/deconnecter',sessionMiddlewareAdmin, admin_controller.deconnexionAdmin);


module.exports = router;