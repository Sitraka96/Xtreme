// paiement.controller.js

const Paiement = require('../model/Paiement.model');

// Fonction pour enregistrer les détails du paiement dans la base de données
exports.enregistrerPaiement = async (req, res) => {
  try {
    const { montant, email_address, name,transactionIDValue, payer_id, payment_id, } = req.body;

    // Créer un nouvel enregistrement de paiement
    const paiement = await Paiement.create({
      montant,
      email_address,
      name,
      payer_id,
      payment_id,
      transactionIDValue
    });

    res.status(201).json(paiement);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du paiement:', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'enregistrement du paiement.' });
  }
};
