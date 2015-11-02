-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2015 at 11:55 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `riskusers`
--

-- --------------------------------------------------------

--
-- Table structure for table `territories`
--

CREATE TABLE IF NOT EXISTS `territories` (
  `userID` int(11) NOT NULL,
  `1` tinyint(1) DEFAULT NULL,
  `2` tinyint(1) DEFAULT NULL,
  `3` tinyint(1) DEFAULT NULL,
  `4` tinyint(1) DEFAULT NULL,
  `5` tinyint(1) DEFAULT NULL,
  `6` tinyint(1) DEFAULT NULL,
  `7` tinyint(1) DEFAULT NULL,
  `8` tinyint(1) DEFAULT NULL,
  `9` tinyint(1) DEFAULT NULL,
  `10` tinyint(1) DEFAULT NULL,
  `11` tinyint(1) DEFAULT NULL,
  `12` tinyint(1) DEFAULT NULL,
  `13` tinyint(1) DEFAULT NULL,
  `14` tinyint(1) DEFAULT NULL,
  `15` tinyint(1) DEFAULT NULL,
  `16` tinyint(1) DEFAULT NULL,
  `17` tinyint(1) DEFAULT NULL,
  `18` tinyint(1) DEFAULT NULL,
  `19` tinyint(1) DEFAULT NULL,
  `20` tinyint(1) DEFAULT NULL,
  `21` tinyint(1) DEFAULT NULL,
  `22` tinyint(1) DEFAULT NULL,
  `23` tinyint(1) DEFAULT NULL,
  `24` tinyint(1) DEFAULT NULL,
  `25` tinyint(1) DEFAULT NULL,
  `26` tinyint(1) DEFAULT NULL,
  `27` tinyint(1) DEFAULT NULL,
  `28` bigint(20) unsigned AUTO_INCREMENT,
  `29` tinyint(1) DEFAULT NULL,
  `30` tinyint(1) DEFAULT NULL,
  `31` tinyint(1) DEFAULT NULL,
  `32` tinyint(1) DEFAULT NULL,
  `33` tinyint(1) DEFAULT NULL,
  `34` tinyint(1) DEFAULT NULL,
  `35` tinyint(1) DEFAULT NULL,
  `36` tinyint(1) DEFAULT NULL,
  `37` tinyint(1) DEFAULT NULL,
  `38` tinyint(1) DEFAULT NULL,
  `39` tinyint(1) DEFAULT NULL,
  `40` tinyint(1) DEFAULT NULL,
  `41` tinyint(1) DEFAULT NULL,
  `42` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `28` (`28`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `territories`
--

INSERT INTO `territories` (`userID`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`, `32`, `33`, `34`, `35`, `36`, `37`, `38`, `39`, `40`, `41`, `42`) VALUES
(1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Name` varchar(20) DEFAULT NULL,
  `ID` int(10) NOT NULL,
  `Territories` int(10) NOT NULL,
  `Colour` varchar(10) NOT NULL,
  `room` int(11) NOT NULL COMMENT 'room number',
  PRIMARY KEY (`ID`),
  KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Name`, `ID`, `Territories`, `Colour`, `room`) VALUES
('anant', 1, 20, 'blue', 0),
('wang', 2, 12, 'grey', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `territories`
--
ALTER TABLE `territories`
  ADD CONSTRAINT `territories_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
