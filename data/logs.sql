-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.5.1-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Exportiere Struktur von Tabelle datahubapi.requestlog
CREATE TABLE IF NOT EXISTS `requestlog` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RequestedAt` varchar(50) DEFAULT NULL,
  `AccessedRoute` varchar(255) DEFAULT NULL,
  `User` varchar(150) DEFAULT NULL,
  `RemoteIP` varchar(35) DEFAULT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `Payload` longtext DEFAULT NULL,
  `ResponseTime` float DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `AccessedRoute` (`AccessedRoute`),
  KEY `RemoteIP` (`RemoteIP`),
  KEY `User` (`User`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
