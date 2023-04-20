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
const admin_controller =require('../controller/Admin.controller');
const protectionAdmin = require('../controller/middleware/protect_admin');


const router = express.Router();


const sessionMiddlewareClient = function(req, res, next) {
    (!req.session.clientId)?res.status(400).json({message: " connecter d'abbord "}):next();
}


//declaration des routes en fonction des besoin
router.post('/inscription', client_controller.enregistrementNouveauClient);
router.post('/login', client_controller.clientsLogin);
router.post('/editpassword/:id_connecter', sessionMiddlewareClient, client_controller.mettreAjoursMdpCtrl);
router.get('/deconnecter',sessionMiddlewareClient, client_controller.deconnexion);
router.get('/profil',sessionMiddlewareClient, client_controller.clientProfile);
router.get('/clients',client_controller.listeClients);

router.post('/admin', admin_controller.adminLogin);
router.post('/Admin/deconnecter',protectionAdmin, admin_controller.deconnexionAdmin);
router.get('/admin/verify', protectionAdmin, admin_controller.verify);

module.exports = router;