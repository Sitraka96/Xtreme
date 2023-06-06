const express = require('express');
const passport = require('passport');
const steamAuth = require('node-steam-openid');

const client_controller = require('../controller/Clients.controller');
const admin_controller =require('../controller/Admin.controller');
const protectionAdmin = require('../controller/middleware/protect_admin');
const xtremepoint_controller =require('../controller/XtremePoint.controller');
const paiementController = require('../controller/Paiement.controller');
const retraitController = require('../controller/Retrait.controller');
const videoController = require('../controller/Video.controller');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Spécifiez le répertoire de destination où les fichiers seront enregistrés
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilisez le nom d'origine du fichier comme nom de fichier enregistré
  }
});

const upload = multer({ storage: storage });

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

// Route pour créer un paiement PayPal
router.post('/paiements', paiementController.createPayment);

// Route pour récupérer tous les paiements
router.get('/paiements', paiementController.getAllPaiement);

// Route d'exécution du paiement avec PayPal
router.get('/paiements/execute', paiementController.executePayment);
// Annuler un paiement
router.get('/paiements/cancel', paiementController.cancelPayment);



// Nouvelle route pour créer un retrait via PayPal
router.post('/retraits', retraitController.createRetrait);

// Route pour récupérer tous les retraits
router.get('/retraits', retraitController.getAllRetraits);
// Route pour exécuter le retrait8 après que le destinataire a reçu l'argent
// router.post('/retraits/execute', retraitController.executeRetrait);

// Route pour l'upload d'une vidéo
router.get('/videos/upload', upload.single('video'), videoController.uploadVideo);

router.get('/videos', videoController.getAllVideos);

// Route pour mettre à jour une vidéo
router.get('/videos/:id', upload.single('video'), videoController.updateVideo);


router.delete('/videos/:id', videoController.deleteVideo);

module.exports = router;