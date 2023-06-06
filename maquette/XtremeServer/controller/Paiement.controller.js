const paypal = require('paypal-rest-sdk');
const Paiement = require('../model/Paiement.model');
 // Assurez-vous d'importer correctement le modèle Paiement

// Méthode pour créer un paiement via PayPal
exports.createPayment = async (req, res) => {
  const { montant, description, email_client } = req.body;

   // Configuration PayPal
   paypal.configure({
    mode: 'sandbox', // Changez en 'live' pour la production
    client_id: 'AUxLk0gxebjIABeztTX-1UDbtDwXBrAYmNLTfGYm2oUVm9xlh-3VBIjGfZc9_OCdalBytB1PkKIfL86c',
    client_secret:'EFkBTLn2MJ-StcxXmRpzmI0eCvK1d9PwtzBwuYAIFpSO0gVW5Pj7G-wQ2eF4g4NyhR3BIaHMAQgWFut7',
  });

  const paymentJson = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
      
    },
    redirect_urls: {
      return_url: 'http://localhost:8080/paiements/execute', // URL de retour après paiement
      cancel_url: 'http://localhost:8080/paiements/cancel', // URL en cas d'annulation du paiement
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: description,
              price: montant, // Formattez le montant avec deux décimales
              currency: 'EUR', // Changez en 'USD' ou autre devise selon votre besoin
              
            },
          ],
        },
        amount: {
          currency: 'EUR', // Changez en 'USD' ou autre devise selon votre besoin
          total: montant, // Formattez le montant avec deux décimales
        },
        description,
      },
    ],
  };

  try {
    // Création du paiement via PayPal
    paypal.payment.create(paymentJson, (error, payment) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du paiement PayPal.' });
      } else {
        const paypal_approval_url = payment.links.find((link) => link.rel === 'approval_url').href;
  
        // Enregistrement du paiement dans la base de données
        Paiement.create({
          montant: montant,
          description: description,
          email_client: email_client,
          paypal_payment_id: payment.id,
          paypal_approval_url: paypal_approval_url,
          payerId: null, // Vous pouvez laisser la valeur à null lors de la création du paiement
          statut: 'en attente',
        })
          .then((paiement) => {
            console.log(paiement);
            res.status(200).json({ message: 'Paiement créé avec succès.' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la création du paiement.' });
          });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du paiement PayPal.' });
  }
  
};


exports.executePayment = async (req, res) => {
  const { paymentId, token, payerId } = req.query;

  try {
    // Récupérer le paiement à partir de la base de données
    const paiement = await Paiement.findOne({ where: { paypal_payment_id: paymentId } });

    if (!paiement) {
      return res.status(404).json({ error: 'Le paiement n\'existe pas.' });
    }

    // Mettre à jour le champ payerId de l'enregistrement
    await Paiement.update({ payerId: payerId }, { where: { paypal_payment_id: paymentId } });

     // Mettre à jour le statut de l'enregistrement
     await Paiement.update({ statut: 'payé' }, { where: { paypal_payment_id: paymentId } });

    // Autres traitements...

    res.status(200).json({ message: 'Paiement exécuté avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'exécution du paiement PayPal.' });
  }
};


exports.cancelPayment = async (req, res) => {
  const { paymentId } = req.query;

  try {
    // Récupérer le paiement à partir de la base de données
    const paiement = await Paiement.findOne({ where: { paypal_payment_id: paymentId } });

    if (!paiement) {
      return res.status(404).json({ error: 'Le paiement n\'existe pas.' });
    }

    // Annuler le paiement via PayPal
    // ...

    // Mettre à jour le statut de l'enregistrement
    await Paiement.update({ statut: 'annulé' }, { where: { paypal_payment_id: paymentId } });

    // Autres traitements...
    console.log(paymentId);
    res.status(200).json({ message: 'Paiement annulé avec succès.' });
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'annulation du paiement PayPal.' });
  }
};









// pour recuperer le paiement dans le BD
exports.getAllPaiement = async (req, res) => {
  try {
    const paiements = await Paiement.findAll();
    res.json(paiements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des paiements.' });
  }
};
 
