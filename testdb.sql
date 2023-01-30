/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80027
Source Host           : localhost:3306
Source Database       : testdb

Target Server Type    : MYSQL
Target Server Version : 80027
File Encoding         : 65001

Date: 2023-01-31 00:50:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for logs
-- ----------------------------
DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `method` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `data` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `result` int NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a1196a1956403417fe3a0343390` (`userId`),
  CONSTRAINT `FK_a1196a1956403417fe3a0343390` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_croatian_ci;

-- ----------------------------
-- Records of logs
-- ----------------------------
INSERT INTO `logs` VALUES ('1', '/api/v1/getusers', 'get', '', '200', '1');
INSERT INTO `logs` VALUES ('2', '/api/v1/create', 'post', '{\"useaname\":\"test\"}', '201', '2');
INSERT INTO `logs` VALUES ('3', '/api/v1/remove', 'post', '{id:\"222\"}', '200', '2');
INSERT INTO `logs` VALUES ('4', '/api/v1/login', 'post', '{user:\"\",name:\"\",\'pasw\',\'wdsaf\'}', '404', '2');
INSERT INTO `logs` VALUES ('5', '/api/v1/login', 'post', '{user:\"\",admin:\"\"}', '500', '2');
INSERT INTO `logs` VALUES ('6', '/api/v1/login', 'post', '{}', '404', '2');
INSERT INTO `logs` VALUES ('7', '/api/v1/login', 'post', '111', '404', '2');
INSERT INTO `logs` VALUES ('8', '/api/v1/login', 'post', '{user:\"\",name:\"\",\'pasw\',\'wdsaf\'}', '500', '2');
INSERT INTO `logs` VALUES ('9', '/api/v1/login', 'post', '{user:\"\",admin:\"\"}', '500', '2');

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gender` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a24972ebd73b106250713dcddd` (`userId`),
  CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_croatian_ci;

-- ----------------------------
-- Records of profile
-- ----------------------------
INSERT INTO `profile` VALUES ('1', '1', 'user_photo', 'user_address', '1');
INSERT INTO `profile` VALUES ('2', '1', 'user_photo', 'user_address', '2');
INSERT INTO `profile` VALUES ('3', '2', 'user_photo', 'user_address', '3');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_croatian_ci;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', '管理员');
INSERT INTO `roles` VALUES ('2', '超级管理员');
INSERT INTO `roles` VALUES ('3', '普通用户');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_croatian_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '12356645', '2235');
INSERT INTO `user` VALUES ('2', 'bobo', '123456');
INSERT INTO `user` VALUES ('3', 'bobo1', '123456');
INSERT INTO `user` VALUES ('32', 'bob00o', '111');
INSERT INTO `user` VALUES ('47', 'bobobb', '1152');
INSERT INTO `user` VALUES ('49', 'bob00obb', '1152');
INSERT INTO `user` VALUES ('50', 'bo55o14', '100011');
INSERT INTO `user` VALUES ('52', 'bo55o99', '100011');
INSERT INTO `user` VALUES ('53', 'bo55o909', '100011');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `userId` int NOT NULL,
  `rolesId` int NOT NULL,
  PRIMARY KEY (`userId`,`rolesId`),
  KEY `IDX_472b25323af01488f1f66a06b6` (`userId`),
  KEY `IDX_13380e7efec83468d73fc37938` (`rolesId`),
  CONSTRAINT `FK_13380e7efec83468d73fc37938e` FOREIGN KEY (`rolesId`) REFERENCES `roles` (`id`),
  CONSTRAINT `FK_472b25323af01488f1f66a06b67` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_croatian_ci;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES ('1', '1');
INSERT INTO `user_roles` VALUES ('2', '2');
INSERT INTO `user_roles` VALUES ('3', '3');
INSERT INTO `user_roles` VALUES ('49', '2');
INSERT INTO `user_roles` VALUES ('50', '2');
INSERT INTO `user_roles` VALUES ('52', '1');
INSERT INTO `user_roles` VALUES ('52', '2');
INSERT INTO `user_roles` VALUES ('53', '2');
