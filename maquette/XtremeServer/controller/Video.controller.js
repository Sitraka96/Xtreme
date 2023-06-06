const Video = require('../model/Video.model');
const multer = require('multer');
const fs = require('fs');

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

// Méthode pour uploader une vidéo
exports.uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier vidéo n'a été téléchargé." });
  }

  // Récupérer les informations de la vidéo depuis la requête
  const { title, description, point } = req.body;
  const videoUrl = req.file.path;

  try {
    // Créer un nouvel enregistrement de vidéo
    const video = await Video.create({
      title: title,
      description: description,
      point,
      videoUrl: videoUrl
    });

    // Répondre avec la vidéo enregistrée
    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'enregistrement de la vidéo." });
  }
};
exports.getAllVideos = async (req, res) => {
    try {
      const videos = await Video.findAll();
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des vidéos.' });
    }
  };

  // Méthode pour modifier une vidéo
// Méthode pour mettre à jour une vidéo
exports.updateVideo = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Rechercher la vidéo existante dans la base de données
      const video = await Video.findByPk(id);
  
      if (!video) {
        return res.status(404).json({ error: 'Vidéo introuvable.' });
      }
  
      // Récupérer les informations de la vidéo depuis la requête
      const { title, description, point } = req.body;
      let videoUrl = video.videoUrl; // Récupérer l'ancien chemin du fichier vidéo
  
      // Vérifier si un nouveau fichier vidéo a été téléchargé
      if (req.file) {
        // Supprimer l'ancien fichier vidéo du système de fichiers
        fs.unlinkSync(videoUrl);
  
        // Mettre à jour le chemin du fichier vidéo avec le nouveau fichier téléchargé
        videoUrl = req.file.path;
      }
  
      // Mettre à jour les informations de la vidéo dans la base de données
      await video.update({
        title: title || video.title,
        description: description || video.description,
        point: point || video.point,
        videoUrl: videoUrl
      });
  
      // Répondre avec la vidéo mise à jour
      res.status(200).json(video);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la vidéo.' });
    }
  };
  
  // Méthode pour supprimer une vidéo
// Méthode pour supprimer une vidéo
exports.deleteVideo = async (req, res) => {
    const videoId = req.params.id;
  
    try {
      // Vérifier si la vidéo existe
      const video = await Video.findOne({ where: { id: videoId } });
      if (!video) {
        return res.status(404).json({ error: 'La vidéo n\'existe pas.' });
      }
  
      // Supprimer la vidéo de la base de données
      await Video.destroy({ where: { id: videoId } });
  
      // Supprimer le fichier vidéo du répertoire "uploads/"
      const videoPath = video.videoUrl;
      fs.unlinkSync(videoPath);
  
      res.status(200).json({ message: 'La vidéo a été supprimée avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la vidéo.' });
    }
  };
  
