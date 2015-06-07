-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 07, 2015 at 12:52 PM
-- Server version: 5.5.37
-- PHP Version: 5.3.10-1ubuntu3.11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `infotap_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `img_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=10 ;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `img_url`, `description`, `creation_time`) VALUES
(1, 'General', 'http://d3l74raw8f3ony.cloudfront.net/infotap/general.png', 'general', '2015-06-05 13:43:59'),
(2, 'Electricity Board', 'http://d3l74raw8f3ony.cloudfront.net/infotap/electricity.png', 'electricity board', '2015-06-05 13:43:59'),
(3, 'Water Board', 'http://d3l74raw8f3ony.cloudfront.net/infotap/water.png', 'water board', '2015-06-05 13:48:32'),
(4, 'Transport Department', 'http://d3l74raw8f3ony.cloudfront.net/infotap/transport.png', 'transport', '2015-06-05 13:48:32'),
(5, 'Health Department', 'http://d3l74raw8f3ony.cloudfront.net/infotap/health.png', 'health', '2015-06-05 13:48:32'),
(6, 'Weather Department', 'http://d3l74raw8f3ony.cloudfront.net/infotap/weather.png', 'waether', '2015-06-05 13:48:32'),
(7, 'Police Department', 'http://d3l74raw8f3ony.cloudfront.net/infotap/police.png', 'police', '2015-06-05 13:48:32'),
(8, 'Tax Department', 'http://d3l74raw8f3ony.cloudfront.net/infotap/money.png', 'tax', '2015-06-05 13:48:32'),
(9, 'TamilNadu Govt', 'http://d3l74raw8f3ony.cloudfront.net/infotap/tamilnadu.png', 'tamilnadu gov', '2015-06-05 13:48:32');

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE IF NOT EXISTS `feeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `message` text COLLATE utf8_bin NOT NULL,
  `aadhar_id` bigint(12) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `age_from` tinyint(4) DEFAULT NULL,
  `age_to` tinyint(4) DEFAULT NULL,
  `location` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `area` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `city` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `state` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `pincode` int(6) DEFAULT NULL,
  `latitude` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `longitude` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `department_idfk_2` (`dept_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=23 ;

--
-- Dumping data for table `feeds`
--

INSERT INTO `feeds` (`id`, `dept_id`, `title`, `message`, `aadhar_id`, `gender`, `age_from`, `age_to`, `location`, `area`, `city`, `state`, `pincode`, `latitude`, `longitude`, `creation_time`) VALUES
(1, 3, 'Title', 'Message', 12345, 1, 10, 20, 'Medavakkam, Chennai, Tamil Nadu, India', 'Medavakkam', 'Chennai', 'Tamil Nadu', 600100, '12.9171427', '80.19234890000007', '2015-06-05 15:47:29'),
(2, 4, 'Information of Change in Bus Timing', 'Bus timing will be Change from next week as per the new schedule in our website. Public are requested to see it and adapt for it.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-06 03:49:59'),
(3, 8, 'Raise in Service Tax', 'There will be a raise in service tax from next week. The new service tax will be 13%. For futher details, visit our website.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-06 03:52:24'),
(4, 3, 'Change in water supply time', 'The water supply time in the city will be  5 AM - 9 AM due to maintenance.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-06 03:57:02'),
(5, 4, 'Raise in Bus Fair', 'The minimum Bus fair is raised to Rs.4 and other fair are also increase as Rs.0.5 for one kilometer. The new fairs may be available in our website.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-06 03:59:46'),
(6, 5, 'Medical camp', 'There is a new medical camp planed this weekend in Medavakkam, Chennai. Please make use of the opportunity.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-06 04:00:40'),
(7, 6, 'Storm Alert', 'Public are request not to go outside their houses today evening(between 3 PM and 6 PM ). At that time storm will hit the city as predicted by Weather Dept.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-06 04:02:47'),
(8, 7, 'Theft alert', 'There is a theft in a house in Medavakkam. Kindly be safe in your house.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-06 04:03:56'),
(9, 8, 'Past due of Tax', 'Your tax payment is past due. Please pay it immediately to avoid fining.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-06 04:05:25'),
(10, 1, 'Indian Navy Job Alert', 'Indian Navy offers B Tech to 10+2 (PCM) qualified young men. For an exciting career as an officer apply online at www.joinindiannavy.gov.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 05:58:58'),
(11, 1, 'Consumer Rights Alert', 'Be an alert consumer. Assert your rights.Do not pay more than MRP. Insist for receipt on every purchase. visit consumeraffairs.nic.in. JAGO GRAHAK JAGO!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 06:00:17'),
(12, 1, 'Your passport ready', 'Hi Mohan Kumar,  your  passport is ready and would reach you tomorrow via post.', 2147483647, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 06:04:39'),
(13, 8, 'Form 16 generated', 'Your form 16 for the Financial year 2014-15 has been generated. File your returns soon', NULL, NULL, NULL, NULL, 'Chennai, Tamil Nadu, India', NULL, 'Chennai', 'Tamil Nadu', NULL, '13.0826802', '80.27071840000008', '2015-06-07 10:11:17'),
(14, 5, 'Ebola Threat', '7 patients have been admitted in GH Chennai - diagonised with EBOLA. Please be caution and safe.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 10:15:04'),
(15, 5, 'Blood Camp 16-06-2015', 'A city level blood camp has been organised by the Rotary club Chennai. The campaign is on 16-06-2015 between 9AM - 6PM in all govertment hospitals and clinic. \r\nDonating your blood helps three individuals in life saving moment also reduces your blood density and keep you away from heart blocks.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 10:21:30'),
(16, 2, 'Power cut', 'The power cut in your area for the month of July would be on the third Saturday 18/07/2015 between 9AM to 5PM.', NULL, NULL, NULL, NULL, NULL, NULL, 'Bengaluru', 'Karnataka', NULL, '13.204492', '77.70769100000007', '2015-06-07 10:24:12'),
(17, 8, 'IT Tax Return', 'Dear Mohan kumar S, Please collect your IT tax return by submitting the return documents.', 678317681848, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 10:28:58'),
(18, 9, 'Group1 exam', 'The applications for Group1 exam wil be distributed in all SBI and Canara Banks across Tamil nadu. The exam date will be announced later.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 10:32:24'),
(20, 2, 'Electricity Bill', 'The frequency of electricity bill has been changed to monthly once instead of the bi-monthly bills that were generated previously.\r\n\r\nPlease ensure to pay the bill before 7th of every month to avoid suspensions.\r\n\r\nUse the below URL to pay your electricity bill online.\r\nhttps://www.tnebnet.org/awp/login', NULL, NULL, NULL, NULL, 'Tamil Nadu, India', NULL, NULL, 'Tamil Nadu', NULL, '11.1271225', '78.65689420000001', '2015-06-07 10:43:35'),
(21, 2, 'Scheduled Power cut announcement', 'There is a electricity maintenance power shutdown on 10th June across South Chennai Locations', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 11:30:42'),
(22, 2, 'TNEB - Helpline', 'Contact electricity board on working hours at 044 2852 0131', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2015-06-07 11:37:33');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aadhar_id` bigint(12) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `age` tinyint(4) DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `mobile` varchar(15) COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `otp_code` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `area` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `city` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `state` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `pincode` int(8) DEFAULT NULL,
  `latitude` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `longitude` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `android_reg_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `access_token` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=15 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `aadhar_id`, `name`, `gender`, `dob`, `age`, `email`, `mobile`, `status`, `otp_code`, `location`, `area`, `city`, `state`, `pincode`, `latitude`, `longitude`, `android_reg_id`, `creation_time`, `access_token`) VALUES
(1, 12345, 'Arun David', 1, '2010-10-11', NULL, 'arundavid.info@gmail.com', '9789535742', 1, '12345', 'Medavakkam, Chennai', 'Medavakkam', 'Chennai', 'Tamil Nadu', 600100, NULL, NULL, 'asdfg12345', '2015-06-05 17:32:27', '12345'),
(9, 470426217185, NULL, NULL, NULL, NULL, NULL, NULL, 1, '338685', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'APA91bF_B_Fip3Uc8BrKqrNYnGaxvYZu-FxiiX3NkI0f8PUUOwJMsAkPOt1bjyGFDaaOVgE_EkbiJLMaXJ2iSgOEhGrTH796GvWyuK1RpC-JeDw9V8TZg8XSVpbo57xmsuRKGAejDyp7tDlFEhNiuqw-sNrqLYqN2g', '2015-06-07 01:20:20', '470426217185-b30d232d153d425c332b931af918973f'),
(10, 678317681848, 'Mohan kumar s', NULL, NULL, NULL, 'smartmohi@gmail.com', '8123400022', 1, '882101', 'Bangalore', NULL, NULL, NULL, NULL, NULL, NULL, 'APA91bEADU8P_YETZRB3ZdjEUbWqn4fnrwVmmCf_sIe3QJc9yg8GouGWuLsSLnKY3wX6tNSbtt4Y27Z--OZqzKc0XL62aJ5urqJCIa4oHfCuPYnMLPY9Qdu7LZCQkNBVzgaaBlzjEkG_Azahdin_51q3FQvUWFru_Q', '2015-06-07 05:02:29', '678317681848-b0ff0ebe419ddbd371a17a681689eef6'),
(13, 29855, 'Aravind d', 1, '2009-06-03', NULL, 'aruvi231@gmail.com', '9600841868', 1, '570631', NULL, 'Medavakkam', 'Chennai', 'Tamil Nadu', NULL, NULL, NULL, 'APA91bHAwshGcvOGe8FkAjgq2utoApLXxt950D6B6At8chtItkoEqWud3M_o73glR2T0SITgtTAw53d7r9oyTJFDm6jvBHbvWV2Pbnqk1DJog05LXmRx3oielIbIht9aTNPaUhdvYwbq4j6yQUcCkPWuBngdi5LTBQ', '2015-06-07 12:27:26', '298555524771-adc501abc607010f038d2f3bf6791b9e'),
(14, 298555524771, 'Aravind', 1, '1991-09-21', NULL, 'Aruvi231@gmail.com', '9600841868', 1, '793290', NULL, 'Medavakkam', 'Chennai', 'Tamil Nadu', NULL, NULL, NULL, 'APA91bFhRsR4tpv3wKzrA6oM3-aIf566AvFVERorIJ0hRFx3nzwo37zUiPAiOuFmvzV7-xcMZ_y6LU6hzh15K4OPF47oolF8qPjmcChzHLPREAsAdtHR8_KBJ6tIGdi-WpE8BflhT8wi_aguYbC7ViFk4CuuBE1bKw', '2015-06-07 12:34:18', '298555524771-32533162d86b0d88e8af645887ed3dbe');

-- --------------------------------------------------------

--
-- Table structure for table `user_preference`
--

CREATE TABLE IF NOT EXISTS `user_preference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_idfk_1` (`user_id`),
  KEY `department_idfk_1` (`dept_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=318 ;

--
-- Dumping data for table `user_preference`
--

INSERT INTO `user_preference` (`id`, `user_id`, `dept_id`, `creation_time`) VALUES
(16, 1, 1, '2015-06-06 18:20:05'),
(17, 1, 2, '2015-06-06 18:20:05'),
(18, 1, 7, '2015-06-06 18:20:05'),
(141, 10, 1, '2015-06-07 05:03:09'),
(142, 10, 2, '2015-06-07 05:03:09'),
(143, 10, 3, '2015-06-07 05:03:09'),
(144, 10, 4, '2015-06-07 05:03:09'),
(145, 10, 5, '2015-06-07 05:03:09'),
(146, 10, 7, '2015-06-07 05:03:09'),
(228, 9, 1, '2015-06-07 07:00:17'),
(229, 9, 2, '2015-06-07 07:00:17'),
(230, 9, 3, '2015-06-07 07:00:17'),
(231, 9, 4, '2015-06-07 07:00:17'),
(232, 9, 5, '2015-06-07 07:00:17'),
(233, 9, 6, '2015-06-07 07:00:17'),
(234, 9, 7, '2015-06-07 07:00:17'),
(235, 9, 8, '2015-06-07 07:00:17'),
(236, 9, 9, '2015-06-07 07:00:17'),
(294, 13, 1, '2015-06-07 12:27:26'),
(295, 13, 2, '2015-06-07 12:27:26'),
(296, 13, 3, '2015-06-07 12:27:26'),
(297, 13, 4, '2015-06-07 12:27:26'),
(298, 13, 5, '2015-06-07 12:27:26'),
(299, 13, 6, '2015-06-07 12:27:26'),
(300, 13, 7, '2015-06-07 12:27:26'),
(301, 13, 8, '2015-06-07 12:27:26'),
(302, 13, 9, '2015-06-07 12:27:26'),
(312, 14, 1, '2015-06-07 12:34:36'),
(313, 14, 2, '2015-06-07 12:34:36'),
(314, 14, 3, '2015-06-07 12:34:36'),
(315, 14, 6, '2015-06-07 12:34:36'),
(316, 14, 8, '2015-06-07 12:34:36'),
(317, 14, 9, '2015-06-07 12:34:36');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feeds`
--
ALTER TABLE `feeds`
  ADD CONSTRAINT `department_idfk_2` FOREIGN KEY (`dept_id`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_preference`
--
ALTER TABLE `user_preference`
  ADD CONSTRAINT `department_idfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_idfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
