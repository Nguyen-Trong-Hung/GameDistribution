-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: internproject
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

DROP TABLE IF EXISTS admin;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  username varchar(45) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES admin WRITE;
/*!40000 ALTER TABLE admin DISABLE KEYS */;
INSERT INTO admin VALUES (1,'hhhh@gmail.com','123','amunra');
/*!40000 ALTER TABLE admin ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS game;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE game (
  GameID int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  Image varchar(255) DEFAULT NULL,
  `Url` varchar(255) DEFAULT NULL,
  Publisher varchar(255) DEFAULT NULL,
  createAt datetime DEFAULT CURRENT_TIMESTAMP,
  `Description` text,
  `Like` int DEFAULT '0',
  PRIMARY KEY (GameID)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES game WRITE;
/*!40000 ALTER TABLE game DISABLE KEYS */;
INSERT INTO game VALUES (28,'Street Vendors','/uploads/GameImage-1730696736427.jpg',NULL,'Amunra','2024-11-04 12:05:36','2011',0),(29,'Dragon Island','/uploads/GameImage-1730704275163.jpg',NULL,'Yooyun','2024-11-04 14:11:15','Game Đảo Rồng 2010',0),(30,'Gunny','/uploads/GameImage-1730704314592.jpg',NULL,'Amunra&&Yooyun','2024-11-04 14:11:55','GameGunnyyyyyyyyyyyyyyyyyyyyyyyyyyy',0),(31,'Bang Bang','/uploads/GameImage-1730704382382.jpg',NULL,'Yooyun','2024-11-04 14:13:02','Game bắn tank',0),(32,'Feeding','/uploads/GameImage-1730704430793.jpg',NULL,'Yooyun','2024-11-04 14:13:51','Game cá lớn nuốt cá bé',0),(33,'Gold Digging','/uploads/GameImage-1730704490376.jpg',NULL,'Amunra&&Yooyun','2024-11-04 14:14:50','Game gắp vàng xếp hạng',0),(34,'Metal Slug','/uploads/GameImage-1730704527340.jpg',NULL,'Amunra&&Yooyun','2024-11-04 14:15:27','Game bắn súng với đa dạng vũ khí',0),(35,'Pokiwar','/uploads/GameImage-1730704564402.jpg',NULL,'Amunra&&Yooyun','2024-11-04 14:16:04','Game chiến pokemon',0),(36,'RadomGame2','/uploads/GameImage-1730710649194.png',NULL,'hamunra','2024-11-04 15:57:29','123',0),(37,'RandomGame3','/uploads/GameImage-1730713300738.jpg',NULL,'hamunra','2024-11-04 16:41:41','123',0),(38,'RandomGame5','/uploads/GameImage-1730715014239.jpg',NULL,'hamunra','2024-11-04 17:10:14','123',0),(39,'Game 31','/uploads/GameImage-1730715039864.jpg',NULL,'hamunra','2024-11-04 17:10:40','12345',0),(40,'RandomGame 8','/uploads/GameImage-1730794821388.jpg',NULL,'hamunra','2024-11-05 15:20:21','ha&king',0),(41,'Minion','/uploads/GameImage-1730794856572.jpg',NULL,'hamunra','2024-11-05 15:20:57','asdw',0),(42,'Galaxy','/uploads/GameImage-1730794923924.jpg',NULL,'amunrayooyun','2024-11-05 15:22:04','123',0),(44,'RandomGame 11','/uploads/GameImage-1730825800788.jpg',NULL,'amunrayooyun','2024-11-05 23:56:41','123456',0),(45,'Chess','/uploads/GameImage-1730825909550.jpg',NULL,'amunrayooyun','2024-11-05 23:58:30','12',0),(46,'Subway','/uploads/GameImage-1730825939604.jpg',NULL,'amunrayooyun','2024-11-05 23:59:00','67',0),(47,'Race','/uploads/GameImage-1730825978781.jpg',NULL,'amunrayooyun','2024-11-05 23:59:39','\r\n567',0);
/*!40000 ALTER TABLE game ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_genres`
--

DROP TABLE IF EXISTS game_genres;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE game_genres (
  id int NOT NULL AUTO_INCREMENT,
  game_id int DEFAULT NULL,
  genre_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_game (game_id),
  KEY fk_genre (genre_id),
  CONSTRAINT fk_game FOREIGN KEY (game_id) REFERENCES game (GameID),
  CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genres (id)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_genres`
--

LOCK TABLES game_genres WRITE;
/*!40000 ALTER TABLE game_genres DISABLE KEYS */;
INSERT INTO game_genres VALUES (30,28,2),(31,28,1),(32,28,5),(33,29,5),(34,29,2),(35,29,1),(36,30,3),(37,30,5),(38,31,3),(39,31,5),(40,32,2),(41,32,3),(42,33,2),(43,34,3),(44,34,5),(45,34,1),(46,35,1),(47,35,5),(48,36,1),(49,36,2),(50,37,3),(51,37,2),(52,38,4),(53,39,1),(54,39,4),(55,40,5),(56,40,4),(57,41,5),(58,41,1),(59,42,3),(60,42,2),(61,42,4),(64,44,4),(65,44,3),(66,45,5),(67,45,1),(68,46,4),(69,46,3),(70,47,1),(71,47,3),(72,47,2);
/*!40000 ALTER TABLE game_genres ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_likes`
--

DROP TABLE IF EXISTS game_likes;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE game_likes (
  GameID int NOT NULL,
  UserID int NOT NULL,
  LikedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (GameID,UserID),
  KEY UserID (UserID),
  CONSTRAINT game_likes_ibfk_1 FOREIGN KEY (GameID) REFERENCES game (GameID) ON DELETE CASCADE,
  CONSTRAINT game_likes_ibfk_2 FOREIGN KEY (UserID) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_likes`
--

LOCK TABLES game_likes WRITE;
/*!40000 ALTER TABLE game_likes DISABLE KEYS */;
/*!40000 ALTER TABLE game_likes ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS genres;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE genres (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES genres WRITE;
/*!40000 ALTER TABLE genres DISABLE KEYS */;
INSERT INTO genres VALUES (1,'Fighting'),(2,'Adventure'),(3,'Survival'),(4,'Sports'),(5,'Strategy');
/*!40000 ALTER TABLE genres ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  avatar varchar(255) DEFAULT NULL,
  createAt datetime DEFAULT CURRENT_TIMESTAMP,
  is_locked tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES users WRITE;
/*!40000 ALTER TABLE users DISABLE KEYS */;
INSERT INTO users VALUES (1,'restoregalaxy@gmail.com','$2b$10$qDei5OMTDg1zvKPXs9mgvOASEM01ziuJ4f19A4xQuNmjcy38B2Koy','amunrayooyun',NULL,'2024-10-23 17:49:37',0),(2,'restoregalaxy123456@gmail.com','$2b$10$1eY5YiP839fSBtwbQ9x.LuoscoA37GrcibbaJPvugj3iZ.3rPthXC','yooyunamunra',NULL,'2024-10-23 17:49:37',0),(5,'hungnguyentrong17@gmail.com','$2b$10$Oc7rB/Cc5lzHzEPs4PXwj.ICUFrmITJzpxczOitxheJewuB9Bkf6O','hamunra',NULL,'2024-10-23 17:49:37',0),(6,'adminamunra@gmail.com','$2b$10$gF13fdbYKHMcuAfrfH4QYOEVnsho9lgvCUN/98Vzy6VOjAHE9CVnm','admin',NULL,'2024-10-23 17:49:37',0),(7,'123456@gmail.com','$2b$10$j5t8ZYo07/rwz9Ry5BhB.OWsWJ3LwHWrZwiJ9ghtRxSM0E29aqf4G','mki',NULL,'2024-10-23 17:50:42',1);
/*!40000 ALTER TABLE users ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-06  0:16:47
