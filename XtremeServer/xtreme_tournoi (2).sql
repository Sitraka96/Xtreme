-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 20 avr. 2023 à 07:01
-- Version du serveur : 8.0.27
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `xtreme_tournoi`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email_admin` varchar(100) NOT NULL,
  `password_admin` text NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `email_admin`, `password_admin`, `createdAt`, `updatedAt`) VALUES
(1, 'Antoine', 'admin_extreme@gmail.com', '$2a$10$qk2/dmn6I3oAWYisd0GYdeegsSxBxKFharH3xArEItJt.DSr5zmo6', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id_client` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nom_client` varchar(255) DEFAULT NULL,
  `prenom_client` varchar(255) DEFAULT NULL,
  `pseudo_client` varchar(255) DEFAULT NULL,
  `mot_de_passe_client` varchar(255) DEFAULT NULL,
  `email_client` varchar(255) DEFAULT NULL,
  `point_client` float DEFAULT NULL,
  `date_de_validation` datetime DEFAULT NULL,
  `code_de_modification` varchar(255) DEFAULT NULL,
  `photo_profil` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `email_client` (`email_client`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id_client` int NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(50) NOT NULL,
  `prenom_client` varchar(50) NOT NULL,
  `pseudo_client` varchar(50) NOT NULL,
  `email_client` varchar(100) NOT NULL,
  `mot_de_passe_client` text NOT NULL,
  `point_client` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `date_de_validation` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `code_de_modification` text,
  `photo_profil` text NOT NULL,
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `UQ_client` (`pseudo_client`,`email_client`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id_client`, `nom_client`, `prenom_client`, `pseudo_client`, `email_client`, `mot_de_passe_client`, `point_client`, `createdAt`, `date_de_validation`, `updatedAt`, `code_de_modification`, `photo_profil`) VALUES
(1, 'Nomenjanahary', 'Tsiky Fitiavana', 'TsikyFitiavana', 'tsikyfit@gmail.com', '31bc299331704618b8601e63ed3ffd2ddda649d2efe34efef0d775c849d07f1b5fb15135ee51099e49066753a1ad399f0f1d64344d1611a751260e5feeff20b1', NULL, '2023-03-24 11:39:36', NULL, NULL, NULL, '1638355970032.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
