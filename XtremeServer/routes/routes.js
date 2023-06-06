const express = require('express');
const passport = require('passport');
const steamAuth = require('node-steam-openid');

const client_controller = require('../controller/Clients.controller');
const admin_controller =require('../controller/Admin.controller');
const protectionAdmin = require('../controller/middleware/protect_admin');
const xtremepoint_controller =require('../controller/XtremePoint.controller');


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
router.get('/addSteamId/clients',client_controller.listeClients);
router.get('verifySteamId/clients/:steamId',client_controller.listeClients);

router.get('/xtremepoint', xtremepoint_controller.getXtremePoints);
router.get('/xtremepoint:id_xtremepoint', xtremepoint_controller.getXtremePointById);
router.post('/addpoint', xtremepoint_controller.ajoutXtremePoint);
router.put('/updatepoint:id_xtremepoint', xtremepoint_controller.majXtremePoint);
router.delete('/deletepoint:id_xtremepoint', xtremepoint_controller.suprimerXtremePoint);
//router.get('/login', passport.authenticate('steam'));



/*router.get('/', (req, res) => {
    res.send(req.user);
});
router.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/')
   });
router.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/profil')
});*/

module.exports = router;