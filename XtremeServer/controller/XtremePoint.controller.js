const XtremePoint = require('../model/XtremePoint.model');

exports.getXtremePoints = async (req, res) => {
    try {
      const xtremePoints = await XtremePoint.findAll();
      res.status(200).json(xtremePoints);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur Server' });
    }
};

exports.getXtremePointById = async (req, res) => {
    try {
      const xtremePoint = await XtremePoint.findByPk(req.params.id_xtremepoint);
      if (!xtremePoint) {
        return res.status(404).json({ message: 'XtremePoint not found' });
      }
      res.status(200).json(xtremePoint);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur Server' });
    }
};

exports.ajoutXtremePoint = async (req, res) => {
    try {
      const { titre_xtremepoint, point_xtremepoint, prix_xtremepoint, date_xtremepoint } = req.body;
      const xtremePoint = await XtremePoint.create({ titre_xtremepoint, point_xtremepoint, prix_xtremepoint, date_xtremepoint });
      res.status(201).json(xtremePoint);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur Server' });
    }
};

exports.majXtremePoint = async (req, res) => {
    try {
      const xtremePoint = await XtremePoint.findByPk(req.params.id);
      if (!xtremePoint) {
        return res.status(404).json({ message: 'XtremePoint not found' });
      }
      const { titre_xtremepoint, point, montant, date } = req.body;
      await xtremePoint.update({ titre_xtremepoint, point, montant, date });
      res.status(200).json(xtremePoint);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur Server' });
    }
};

exports.suprimerXtremePoint = async (req, res) => {
    try {
      const xtremePoint = await XtremePoint.findByPk(req.params.id);
      if (!xtremePoint) {
        return res.status(404).json({ message: 'XtremePoint not found' });
      }
      await xtremePoint.destroy();
      res.status(200).json({ message: 'XtremePoint deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur Server' });
    }
};