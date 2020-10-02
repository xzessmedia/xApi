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


-- Exportiere Datenbank Struktur für datahubapi
CREATE DATABASE IF NOT EXISTS `datahubapi` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `datahubapi`;

-- Exportiere Struktur von Tabelle datahubapi.category
CREATE TABLE IF NOT EXISTS `category` (
  `CategoryId` int(11) NOT NULL,
  `CategoryParentId` int(11) DEFAULT NULL,
  `LocalizationIso` varchar(255) DEFAULT NULL,
  `CategoryName` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `ModifiedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`CategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle datahubapi.eku_price
CREATE TABLE IF NOT EXISTS `eku_price` (
  `ProductId` int(11) NOT NULL,
  `Range` longtext DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `ModifiedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle datahubapi.files
CREATE TABLE IF NOT EXISTS `files` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UploadedAt` datetime DEFAULT NULL,
  `OriginalFilename` varchar(255) DEFAULT NULL,
  `EncodingInfo` varchar(255) DEFAULT NULL,
  `MimeType` varchar(255) DEFAULT NULL,
  `Size` float DEFAULT NULL,
  `StorageDestination` varchar(255) DEFAULT NULL,
  `Filename` varchar(255) DEFAULT NULL,
  `Path` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT 'ANY',
  `AdditionalData` longtext NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle datahubapi.localization
CREATE TABLE IF NOT EXISTS `localization` (
  `LocalizationId` int(11) NOT NULL,
  `LocalizationIso` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `ModifiedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`LocalizationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle datahubapi.manufacturer
CREATE TABLE IF NOT EXISTS `manufacturer` (
  `ManufacturerId` int(11) NOT NULL,
  `ShortName` varchar(255) DEFAULT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `ModifiedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ManufacturerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle datahubapi.pdo_settings
CREATE TABLE IF NOT EXISTS `pdo_settings` (
  `CustomerId` int(11) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `CustomerKey` varchar(255) NOT NULL,
  `PriceProfile` int(11) NOT NULL,
  `IsSelection` tinyint(1) NOT NULL,
  `IsOccasion` tinyint(1) NOT NULL,
  `Localization` longtext NOT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `ModifiedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`CustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle datahubapi.product
CREATE TABLE IF NOT EXISTS `product` (
  `ProductId` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `Ean1` varchar(255) DEFAULT NULL,
  `Ean2` longtext DEFAULT NULL,
  `ManufacturerId` int(11) NOT NULL,
  `Attributes` longtext DEFAULT NULL,
  `BuildProducts` varchar(255) DEFAULT NULL,
  `RelatedProducts` varchar(255) DEFAULT NULL,
  `SetProducts` varchar(255) DEFAULT NULL,
  `InnerDiameter` decimal(13,3) DEFAULT NULL,
  `OuterDiameter` decimal(13,3) DEFAULT NULL,
  `Width` decimal(13,3) DEFAULT NULL,
  `Weight` decimal(13,3) NOT NULL,
  `SearchText1` varchar(300) DEFAULT NULL,
  `SearchText2` varchar(300) DEFAULT NULL,
  `SearchText3` varchar(300) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `ModifiedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle datahubapi.product_price
CREATE TABLE IF NOT EXISTS `product_price` (
  `ProductId` int(11) NOT NULL,
  `PriceProfile` int(11) NOT NULL,
  `Currency` varchar(3) NOT NULL,
  `Price` decimal(12,2) NOT NULL,
  `ListPrice` decimal(12,2) NOT NULL,
  `FictivePrice` decimal(12,2) NOT NULL,
  `OccasionPrice` decimal(12,2) NOT NULL,
  `SelectionPrice` decimal(12,2) NOT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `ModifiedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle datahubapi.product_qty
CREATE TABLE IF NOT EXISTS `product_qty` (
  `ProductId` int(11) NOT NULL,
  `ProductQty` int(11) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `ModifiedAt` datetime DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;


-- Exportiere Struktur von Tabelle datahubapi.files
CREATE TABLE IF NOT EXISTS `files` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UploadedAt` datetime DEFAULT NULL,
  `OriginalFilename` varchar(255) DEFAULT NULL,
  `EncodingInfo` varchar(255) DEFAULT NULL,
  `MimeType` varchar(255) DEFAULT NULL,
  `Size` float DEFAULT NULL,
  `StorageDestination` varchar(255) DEFAULT NULL,
  `Filename` varchar(255) DEFAULT NULL,
  `Path` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT 'ANY',
  `AdditionalData` longtext NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


-- Daten Export vom Benutzer nicht ausgewählt

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
