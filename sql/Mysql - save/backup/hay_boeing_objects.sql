-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hay_boeing
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `objects`
--

DROP TABLE IF EXISTS `objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `objects_list_id` int NOT NULL,
  `object_numer` varchar(255) NOT NULL,
  `objects_size_list_id` int NOT NULL,
  `flights_id` int NOT NULL,
  `manager_signed` varchar(255) DEFAULT NULL,
  `users_id` int NOT NULL,
  `date_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_objects_objects_list_idx` (`objects_list_id`) /*!80000 INVISIBLE */,
  KEY `fk_objects_objects_size_list1_idx` (`objects_size_list_id`),
  KEY `fk_objects_flights1_idx` (`flights_id`) /*!80000 INVISIBLE */,
  KEY `fk_objects_users1_idx` (`users_id`),
  CONSTRAINT `fk_objects_flights1` FOREIGN KEY (`flights_id`) REFERENCES `flights` (`id`),
  CONSTRAINT `fk_objects_objects_list` FOREIGN KEY (`objects_list_id`) REFERENCES `objects_list` (`id`),
  CONSTRAINT `fk_objects_objects_size_list1` FOREIGN KEY (`objects_size_list_id`) REFERENCES `objects_size_list` (`id`),
  CONSTRAINT `fk_objects_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objects`
--

LOCK TABLES `objects` WRITE;
/*!40000 ALTER TABLE `objects` DISABLE KEYS */;
INSERT INTO `objects` VALUES (1,1,'7742',2,1,'Andrey',1,'2023-07-18 12:56:24','2023-07-18 16:18:03'),(2,2,'8138',2,2,'Andrey',1,'2023-07-18 13:32:57','2023-07-18 16:18:09'),(3,1,'3151',1,2,'Andrey',1,'2023-07-18 13:41:20','2023-07-18 16:18:09');
/*!40000 ALTER TABLE `objects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18 20:29:40
