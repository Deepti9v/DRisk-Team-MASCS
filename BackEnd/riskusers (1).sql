-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-11-02 11:04:40
-- 服务器版本： 5.6.26
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `riskusers`
--

-- --------------------------------------------------------

--
-- 表的结构 `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `ID` int(11) NOT NULL,
  `maxplayer` int(6) NOT NULL,
  `complexity` int(6) NOT NULL,
  `Host` varchar(20) NOT NULL,
  `currentPlayer` int(6) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `room`
--

INSERT INTO `room` (`ID`, `maxplayer`, `complexity`, `Host`, `currentPlayer`) VALUES
(1, 6, 2, 'cb4684d098dfa0965c9c', 1);

-- --------------------------------------------------------

--
-- 表的结构 `territories`
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
  `28` bigint(20) unsigned NOT NULL,
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
  `42` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `territories`
--

INSERT INTO `territories` (`userID`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`, `31`, `32`, `33`, `34`, `35`, `36`, `37`, `38`, `39`, `40`, `41`, `42`) VALUES
(1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Name` varchar(20) DEFAULT NULL,
  `ID` int(10) NOT NULL,
  `Territories` int(10) NOT NULL,
  `Colour` varchar(10) NOT NULL,
  `room` int(11) NOT NULL COMMENT 'room number'
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`Name`, `ID`, `Territories`, `Colour`, `room`) VALUES
('anant', 1, 20, 'blue', 2),
('wang', 2, 12, 'grey', 0),
('ab2d83f01cd43a16fe83', 82, 0, 'NULL', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD UNIQUE KEY `Host` (`Host`);

--
-- Indexes for table `territories`
--
ALTER TABLE `territories`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `28` (`28`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `territories`
--
ALTER TABLE `territories`
  MODIFY `28` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=88;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
