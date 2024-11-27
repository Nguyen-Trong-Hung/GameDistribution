-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 45.77.32.24    Database: internproject
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'hhhh@gmail.com','123','amunra');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `game_id` (`game_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`GameID`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,28,5,'Comment','2024-11-20 02:45:36','2024-11-20 02:45:36');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `GameID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Url` varchar(255) DEFAULT NULL,
  `Publisher` varchar(255) DEFAULT NULL,
  `createAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `Description` text,
  `Approved` tinyint DEFAULT '0',
  PRIMARY KEY (`GameID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (28,'Street Vendors','/uploads/GameImage-1730696736427.jpg',NULL,'Amunra','2024-11-04 12:05:36','2011',1),(29,'Dragon Island','/uploads/GameImage-1730704275163.jpg',NULL,'Yooyun','2024-11-04 14:11:15','Game Đảo Rồng 2010',1),(30,'Gunny','/uploads/GameImage-1730704314592.jpg',NULL,'Amunra&&Yooyun','2024-11-04 14:11:55','GameGunnyyyyyyyyyyyyyyyyyyyyyyyyyyy',1),(31,'Bang Bang','/uploads/GameImage-1730704382382.jpg',NULL,'Yooyun','2024-11-04 14:13:02','Game bắn tank',1),(32,'Feeding','/uploads/GameImage-1730704430793.jpg',NULL,'Yooyun','2024-11-04 14:13:51','Game cá lớn nuốt cá bé',1),(33,'Gold Digging','/uploads/GameImage-1730704490376.jpg',NULL,'Amunra&&Yooyun','2024-11-04 14:14:50','Game gắp vàng xếp hạng',1),(34,'Metal Slug','/uploads/GameImage-1730704527340.jpg',NULL,'Amunra&&Yooyun','2024-11-04 14:15:27','Game bắn súng với đa dạng vũ khí',1),(35,'Pokiwar','/uploads/GameImage-1730704564402.jpg',NULL,'Amunra&&Yooyun','2024-11-04 14:16:04','Game chiến pokemon',1),(36,'RadomGame2','/uploads/GameImage-1730710649194.png',NULL,'hamunra','2024-11-04 15:57:29','123',1),(37,'RandomGame3','/uploads/GameImage-1730713300738.jpg',NULL,'hamunra','2024-11-04 16:41:41','123',1),(38,'RandomGame5','/uploads/GameImage-1730715014239.jpg',NULL,'hamunra','2024-11-04 17:10:14','123',1),(39,'Game 31','/uploads/GameImage-1730715039864.jpg',NULL,'hamunra','2024-11-04 17:10:40','12345',1),(40,'RandomGame 8','/uploads/GameImage-1730794821388.jpg',NULL,'hamunra','2024-11-05 15:20:21','ha&king',1),(41,'Minion','/uploads/GameImage-1730794856572.jpg',NULL,'hamunra','2024-11-05 15:20:57','asdw',1),(42,'Galaxy','/uploads/GameImage-1730794923924.jpg',NULL,'amunrayooyun','2024-11-05 15:22:04','123',1),(44,'RandomGame 11','/uploads/GameImage-1730825800788.jpg',NULL,'amunrayooyun','2024-11-05 23:56:41','123456',1),(45,'Chess','/uploads/GameImage-1730825909550.jpg',NULL,'amunrayooyun','2024-11-05 23:58:30','12',1),(46,'Subway','/uploads/GameImage-1730825939604.jpg',NULL,'amunrayooyun','2024-11-05 23:59:00','67',1),(47,'Race','/uploads/GameImage-1730825978781.jpg',NULL,'amunrayooyun','2024-11-05 23:59:39','\r\n567',1),(49,'RandomGame 17','/uploads/GameImage-1731048241174.jpg',NULL,'hamunra','2024-11-08 13:44:01','test17',1),(50,'Game cần duyệt','/uploads/GameImage-1731049435480.png',NULL,'hamunra','2024-11-08 14:03:55','Duyệt',1),(51,'RandomGame 19','/uploads/GameImage-1731052286612.jpg',NULL,'user7','2024-11-08 14:51:27','123',1);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_genres`
--

DROP TABLE IF EXISTS `game_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int DEFAULT NULL,
  `genre_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game` (`game_id`),
  KEY `fk_genre` (`genre_id`),
  CONSTRAINT `fk_game` FOREIGN KEY (`game_id`) REFERENCES `game` (`GameID`),
  CONSTRAINT `fk_genre` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_genres`
--

LOCK TABLES `game_genres` WRITE;
/*!40000 ALTER TABLE `game_genres` DISABLE KEYS */;
INSERT INTO `game_genres` VALUES (30,28,2),(31,28,1),(32,28,5),(33,29,5),(34,29,2),(35,29,1),(36,30,3),(37,30,5),(38,31,3),(39,31,5),(40,32,2),(41,32,3),(42,33,2),(43,34,3),(44,34,5),(45,34,1),(46,35,1),(47,35,5),(48,36,1),(49,36,2),(50,37,3),(51,37,2),(52,38,4),(53,39,1),(54,39,4),(55,40,5),(56,40,4),(57,41,5),(58,41,1),(59,42,3),(60,42,2),(61,42,4),(64,44,4),(65,44,3),(66,45,5),(67,45,1),(68,46,4),(69,46,3),(70,47,1),(71,47,3),(72,47,2),(76,49,1),(77,49,2),(78,49,3),(79,49,4),(80,49,5),(81,50,1),(82,50,2),(83,51,5);
/*!40000 ALTER TABLE `game_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Fighting'),(2,'Adventure'),(3,'Survival'),(4,'Sports'),(5,'Strategy');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  `rating` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_game` (`user_id`,`game_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`GameID`) ON DELETE CASCADE,
  CONSTRAINT `ratings_chk_1` CHECK (((`rating` >= 0) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (82,5,33,4,'2024-11-13 07:29:53','2024-11-13 07:33:25'),(83,5,36,2,'2024-11-13 07:33:39','2024-11-13 07:33:42'),(84,5,28,4,'2024-11-13 07:38:31','2024-11-19 16:31:00'),(85,14,28,2,'2024-11-13 07:38:51','2024-11-13 07:47:34'),(86,14,41,2,'2024-11-13 07:40:10','2024-11-13 07:40:10'),(87,14,50,4,'2024-11-13 07:40:18','2024-11-13 07:40:18'),(88,14,34,5,'2024-11-15 01:49:28','2024-11-15 01:49:28'),(89,14,51,5,'2024-11-15 02:01:24','2024-11-15 02:01:24'),(90,14,33,5,'2024-11-15 02:02:06','2024-11-15 02:02:08'),(91,14,39,3,'2024-11-15 02:03:54','2024-11-15 02:03:54'),(92,5,51,1,'2024-11-15 03:30:58','2024-11-15 03:30:58'),(93,5,37,3,'2024-11-18 04:39:04','2024-11-18 04:39:07'),(94,5,32,4,'2024-11-18 04:39:18','2024-11-18 04:39:18'),(95,5,42,4,'2024-11-18 04:39:21','2024-11-18 04:39:21'),(96,14,32,5,'2024-11-18 04:39:34','2024-11-18 04:39:34'),(97,14,37,5,'2024-11-18 04:39:40','2024-11-18 04:39:40'),(98,14,42,1,'2024-11-18 04:39:48','2024-11-18 04:39:48'),(99,5,49,5,'2024-11-18 09:19:03','2024-11-18 09:19:03'),(100,5,29,5,'2024-11-18 09:19:37','2024-11-18 09:19:37'),(101,5,31,5,'2024-11-20 01:34:37','2024-11-20 01:34:37'),(102,5,30,5,'2024-11-20 09:22:00','2024-11-20 09:22:00');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_locked` tinyint(1) DEFAULT '0',
  `isDeveloper` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'restoregalaxy@gmail.com','$2b$10$qDei5OMTDg1zvKPXs9mgvOASEM01ziuJ4f19A4xQuNmjcy38B2Koy','amunrayooyun',NULL,'2024-10-23 17:49:37',0,0),(2,'restoregalaxy123456@gmail.com','$2b$10$1eY5YiP839fSBtwbQ9x.LuoscoA37GrcibbaJPvugj3iZ.3rPthXC','yooyunamunra',NULL,'2024-10-23 17:49:37',0,0),(5,'hungnguyentrong17@gmail.com','$2b$10$xW1NYstfKEf48wbrSRgGDOwFlGaW3BmYTp1iHtGbcCu4CIWtoOkMS','hamunra',NULL,'2024-10-23 17:49:37',0,1),(6,'adminamunra@gmail.com','$2b$10$gF13fdbYKHMcuAfrfH4QYOEVnsho9lgvCUN/98Vzy6VOjAHE9CVnm','admin',NULL,'2024-10-23 17:49:37',0,0),(7,'123456@gmail.com','$2b$10$j5t8ZYo07/rwz9Ry5BhB.OWsWJ3LwHWrZwiJ9ghtRxSM0E29aqf4G','mki',NULL,'2024-10-23 17:50:42',1,0),(8,'user1@gmail.com','$2b$10$OZ1UClqQQPC5x5WiZU8yheu7Bcd7PNikX2h/PxDVQCKxRX7TVfK7i','user1',NULL,'2024-11-07 16:08:08',0,0),(9,'user2@gmail.com','$2b$10$GYPiPyrHVWH81Y4WYraxcOnJjlicYFi8imrczDH9Tua9zCeOgAOBK','user2',NULL,'2024-11-07 16:35:27',0,0),(10,'user3@gmail.com','$2b$10$7Yk.cLS0S5w0qBK4RCPyx.xpdghYqFfHCLhJR4ZqEVI.tE2QmSo2.','user3',NULL,'2024-11-07 16:41:49',0,0),(11,'user4@gmail.com','$2b$10$1BR4MxqvhTU1vkSW94mmPuYq3U5010ZdwP/qEW8ejkWPROJju3pZW','user4',NULL,'2024-11-07 16:43:29',0,1),(12,'user5@gmail.com','$2b$10$ETHKdzfWnCFLtG0.tj6MkeW6UHC8UyyeadXIRVbnl/3mRgzf8Bm7m','user5',NULL,'2024-11-07 16:59:03',0,0),(13,'user6@gmail.com','$2b$10$WHn4VAd1BQ5lS6oP324IRe7.AQucTX8l48wRJgDCJtCUp00OmIUDi','user6',NULL,'2024-11-07 16:59:29',0,1),(14,'user7@gmail.com','$2b$10$aoHyqjvczynDgHHl1vrxFuiKBEUfakZGJ8f6Wf.RO2Z8iq/xY8vy.','user7',NULL,'2024-11-07 17:00:51',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 16:16:30
