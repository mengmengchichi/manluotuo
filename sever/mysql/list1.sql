/*
Navicat MySQL Data Transfer

Source Server         : yu
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : project

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2018-09-12 21:09:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `list1`
-- ----------------------------
DROP TABLE IF EXISTS `list1`;
CREATE TABLE `list1` (
  `id` int(11) NOT NULL auto_increment,
  `status` varchar(255) default NULL,
  `introduce` varchar(255) NOT NULL,
  `nowprice` decimal(10,2) NOT NULL,
  `marketprice` decimal(10,2) NOT NULL,
  `time` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of list1
-- ----------------------------
INSERT INTO `list1` VALUES ('1', '新品', '宠物猫拼装模型-《疯狂外星人》拼插玩具', '11.00', '13.00', '2018-09-11 19:08:47', '556_thumb_G_1429588342408');
INSERT INTO `list1` VALUES ('2', '热销', '魔兽部落钥匙扣-《魔兽世界》正版钥匙扣 现货特价', '25.00', '30.00', '2018-09-10 09:44:19', '3192_thumb_G_1478230211578');
INSERT INTO `list1` VALUES ('3', '新品', '小钱拼装模型-《疯狂外星人》拼插玩具', '11.00', '13.00', '2018-09-10 09:45:51', '555_thumb_G_1429588236421');
INSERT INTO `list1` VALUES ('4', '新品', '小欧拼装模型-《疯狂外星人》拼插玩具', '11.00', '13.00', '2018-09-10 09:47:32', '554_thumb_G_1429588088275');
INSERT INTO `list1` VALUES ('5', '热销', '徽章车贴-《魔兽世界》正版车贴 现货', '19.00', '23.00', '2018-09-10 09:48:45', '3009_thumb_G_1478745501100');
INSERT INTO `list1` VALUES ('6', '热销', '神奇女侠LED灯钥匙链-《蝙蝠侠大战超人:正义黎明》LED灯 软胶钥匙链挂件特价', '11.00', '13.00', '2018-09-10 10:44:25', '2604_thumb_G_1458251125053');
INSERT INTO `list1` VALUES ('7', '热销', '了平E款铁牌项链-《家庭教师》MUSE木棉花 铁牌项链特价', '11.00', '13.00', '2018-09-10 10:44:41', '1983_thumb_G_1448248673882');
INSERT INTO `list1` VALUES ('8', '热销', '狱寺C款贴牌项链——《家庭教师》MUSE木棉花铁牌项链特价', '11.00', '13.00', '2018-09-10 10:45:01', '1982_thumb_G_1448248478951');
INSERT INTO `list1` VALUES ('9', '热销', '岩泉—挂件-《排球少年》Broccoli亚克力 动漫角色挂件特价', '11.00', '13.00', '2018-09-10 10:45:19', '1976_thumb_G_1448245299772');
INSERT INTO `list1` VALUES ('10', '新品', '罗阻钥匙扣-《纳米核心》LOZO金属钥匙扣特价-', '11.00', '13.00', '2018-09-10 10:45:34', '1971_thumb_G_1448241972337');
INSERT INTO `list1` VALUES ('11', '热销', '夏洛特手机挂件-《魔法少女小圆》MUSE木棉花 B款金属吊饰特价', '11.00', '13.00', '2018-09-10 10:45:43', '1953_thumb_G_1448062873972');
INSERT INTO `list1` VALUES ('12', '新品', '老虎与兔子D款吊饰-《老虎与兔子》MUSE木棉花 兔子 手机挂饰特价', '11.00', '13.00', '2018-09-10 10:46:05', '1951_thumb_G_1448053962885');
INSERT INTO `list1` VALUES ('13', '热销', '潮人山本铁牌项链-《家庭教师》MUSE木棉花C款铁牌项链特价', '11.00', '13.00', '2018-09-10 10:53:34', '1725_thumb_G_1444962337843');
INSERT INTO `list1` VALUES ('14', '热销', '潮人山本铁牌项链-《家庭教师》MUSE木棉花 B款 铁牌项链特价', '11.00', '13.00', '2018-09-10 10:53:45', '1724_thumb_G_1444962243734');
INSERT INTO `list1` VALUES ('15', '热销', '潮人山本铁牌项链-《家庭教师》MUSE木棉花 A款 铁牌项链特价', '11.00', '13.00', '2018-09-10 10:53:58', '1723_thumb_G_1444962113444');
INSERT INTO `list1` VALUES ('16', '新品', '次郎太郎团扇-《刀剑乱舞》Nitroplus 团扇', '11.00', '13.00', '2018-09-10 10:54:06', '1671_thumb_G_1444616493970');
INSERT INTO `list1` VALUES ('17', '新品', '同田贯正国团扇-《刀剑乱舞》Nitorplus 团扇', '11.00', '13.00', '2018-09-10 10:54:21', '1670_thumb_G_1444616399025');
INSERT INTO `list1` VALUES ('18', '热销', '男鹿手机擦-《恶魔奶爸》木棉花 暴走男鹿 A款手机擦特价', '11.00', '13.00', '2018-09-10 10:54:34', '1591_thumb_G_1443219309289');
INSERT INTO `list1` VALUES ('19', '热销', '男鹿辰巳大胸章-《恶魔奶爸》木棉花 暴走男鹿 A款 徽章特价', '11.00', '13.00', '2018-09-10 10:54:47', '1586_thumb_G_1443150641906');
INSERT INTO `list1` VALUES ('20', '热销', 'COSPA 冰堂美智留 防尘塞-《路人女主的养成方法》 吊你玩系列 正版挂饰 日版 现货特价', '11.00', '13.00', '2018-09-10 10:55:02', '3121_thumb_G_1464146203961');
INSERT INTO `list1` VALUES ('21', '热销', '皮卡丘A款钥匙链-《口袋妖怪》眼镜厂 精品挂饰特价', '11.00', '13.00', '2018-09-10 10:55:13', '2035_thumb_G_1448840387576');
INSERT INTO `list1` VALUES ('22', '新品', '石切丸团扇-《刀剑乱舞》Nitroplus 团扇', '11.00', '13.00', '2018-09-10 10:55:23', '1672_thumb_G_1444616572131');
INSERT INTO `list1` VALUES ('23', null, '狮子王团扇-《刀剑乱舞》Nitroplus 团扇', '11.00', '13.00', '2018-09-10 10:55:27', '1669_thumb_G_1444616268873');
INSERT INTO `list1` VALUES ('24', '新品', '老虎与兔子B款吊饰-《老虎与兔子》MUSE木棉花 兔子 手机挂件特价', '11.00', '13.00', '2018-09-10 10:52:50', '1950_thumb_G_1448053858610');
INSERT INTO `list1` VALUES ('25', '热销', '莺丸团扇-《刀剑乱舞》Nitroplus 团扇', '11.00', '13.20', '2018-09-12 09:31:21', '1668_thumb_G_1444616160862');
INSERT INTO `list1` VALUES ('26', '新品', '闪烁之光钥匙圈-《刀剑神域》 木棉花 剑之钥匙圈 B款 精品挂饰特价', '11.00', '13.20', '2018-09-12 09:32:02', '1583_thumb_G_1443136012145');
INSERT INTO `list1` VALUES ('27', '新品', '蜘蛛侠之头壁灯-《蜘蛛侠》漫威 造梦师', '99.00', '118.80', '2018-09-12 09:32:43', '505_thumb_G_1427695765485');
