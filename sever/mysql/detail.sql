/*
Navicat MySQL Data Transfer

Source Server         : yu
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : project

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2018-09-12 21:09:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `detail`
-- ----------------------------
DROP TABLE IF EXISTS `detail`;
CREATE TABLE `detail` (
  `id` int(11) NOT NULL auto_increment,
  `introduce` varchar(255) NOT NULL,
  `nowprice` decimal(10,2) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `marketprice` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL,
  `comment` int(11) default NULL,
  `style` varchar(255) default NULL,
  `collect` varchar(255) NOT NULL,
  `big_preview_url` varchar(255) NOT NULL,
  `small_preview_url1` varchar(255) NOT NULL,
  `small_preview_url2` varchar(255) NOT NULL,
  `small_preview_url3` varchar(255) NOT NULL,
  `jianjie_url1` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of detail
-- ----------------------------
INSERT INTO `detail` VALUES ('1', '漫骆驼官方出品 少司命手办-《秦时明月》十周年纪念版手办 myethos 正版', '628.00', 'myethos', '628.00', '暂时缺货', '0', '现货628', 'false', '/images/detail-1/3546_P_1495417613383.jpg', '3546_thumb_P_1495417614116&3546_thumb_P_1495417860665&3546_thumb_P_1495418009937', '', '', '30120142QQ&23112041_02&23112046_03&23112051_04&23112056_05&23112058_06&23112100_07&23112102_08&23163158');
