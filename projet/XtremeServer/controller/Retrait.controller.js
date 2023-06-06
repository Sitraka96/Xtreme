const paypal = require('paypal-rest-sdk');
const Retrait = require('../model/Retrait.model');

// Configuration PayPal
paypal.configure({
  mode: 'sandbox', // Changez en 'live' pour la production
  client_id: 'AUxLk0gxebjIABeztTX-1UDbtDwXBrAYmNLTfGYm2oUVm9xlh-3VBIjGfZc9_OCdalBytB1PkKIfL86c',
    client_secret:'EFkBTLn2MJ-StcxXmRpzmI0eCvK1d9PwtzBwuYAIFpSO0gVW5Pj7G-wQ2eF4g4NyhR3BIaHMAQgWFut7',
});

// Méthode pour créer un retrait via PayPal
exports.createRetrait = async (req, res) => {
  const { montant, email_destinataire } = req.body;

  const payoutJson = {
    sender_batch_header: {
      sender_batch_id: 'batch_' + Math.random().toString(36).substring(9),
      email_subject: 'Retrait via PayPal',
    },
    items: [
      {
        recipient_type: 'EMAIL',
        amount: {
          value: montant,
          currency: 'EUR', // Changez en 'USD' ou autre devise selon votre besoin
        },
        receiver: email_destinataire,
        note: 'Retrait via PayPal',
      },
    ],
  };

  try {
    // Création du retrait via PayPal
    paypal.payout.create(payoutJson, (error, payout) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du retrait PayPal.' });
      } else {
        // Enregistrement du retrait dans la base de données
        Retrait.create({
          montant: montant,
          email_destinataire: email_destinataire,
          paypal_payout_id: payout.batch_header.payout_batch_id,
          statut: 'en attente',
        })
          .then((retrait) => {
            res.status(200).json({ message: 'Retrait créé avec succès.' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la création du retrait.' });
          });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du retrait PayPal.' });
  }
};


// Méthode pour récupérer tous les retraits depuis la base de données
exports.getAllRetraits = async (req, res) => {
  try {
    const retraits = await Retrait.findAll();
    res.json(retraits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des retraits.' });
  }
};
