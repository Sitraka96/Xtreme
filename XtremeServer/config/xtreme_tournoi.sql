-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 07 avr. 2023 à 08:40
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

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
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `email_admin` varchar(100) NOT NULL,
  `password_admin` text NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `email_admin`, `password_admin`) VALUES
(1, 'admin_extreme@gmail.com', '87654321');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `id_rang` int(11) DEFAULT NULL,
  `nom_client` varchar(50) NOT NULL,
  `prenom_client` varchar(50) NOT NULL,
  `pseudo_client` varchar(50) NOT NULL,
  `email_client` varchar(100) NOT NULL,
  `mot_de_passe_client` text NOT NULL,
  `point_client` int(10) DEFAULT NULL,
  `date_de_creation` datetime DEFAULT NULL,
  `date_de_validation` datetime DEFAULT NULL,
  `date_de_modification` datetime DEFAULT NULL,
  `code_de_modification` text,
  `photo_profil` text,
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `UQ_client` (`pseudo_client`,`email_client`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id_client`, `id_rang`, `nom_client`, `prenom_client`, `pseudo_client`, `email_client`, `mot_de_passe_client`, `point_client`, `date_de_creation`, `date_de_validation`, `date_de_modification`, `code_de_modification`, `photo_profil`) VALUES
(1, NULL, 'RAKOTONDRAZANAKA', 'Bruno', 'brunojs', 'tsikyfit@gmail.com', 'f89145ad377f5cb25d5b5250dac2ea3061d207d0bb668b26f0c7d53ca526757d9e496ffac1bf6b5179f0b702ff7a6033ecfbcb284c0e299cb8222952c58038c6', 55, '2023-03-31 09:15:36', NULL, NULL, NULL, NULL),
(2, NULL, 'TSIKY FITIAVANA', 'Minoniaina', 'mino', 'minosoaomega@gmail.com', '07b17c6b0904488a5ebb7dadbefcbeb1a830226ba46256f60d6d0454d104b638dcd2475fe7ea0311240499bbe530cb6a54bd2a5e543b5c90988c3b7e23c3ee60', 100, '2023-03-31 22:24:53', NULL, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
