DROP TABLE IF EXISTS SUB_TASK;
DROP TABLE IF EXISTS TASK;
DROP TABLE IF EXISTS TASK_GROUP;
DROP TABLE IF EXISTS TOKENS;
DROP TABLE IF EXISTS USER_INFO;
DROP TABLE IF EXISTS PREFER;


CREATE TABLE `prefer` (
  `pref_id` int(10) NOT NULL AUTO_INCREMENT,
  `theme` enum('dark','light') NOT NULL DEFAULT 'light',
  `text_size` enum('1','2','3','4') NOT NULL DEFAULT '2',
  PRIMARY KEY (`pref_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE `user_info` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `user_type` enum('admin','customer') DEFAULT 'customer',
  `pref_id` int(10) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `pref_id` (`pref_id`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`pref_id`) REFERENCES `prefer` (`pref_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
SELECT * FROM webpro.user_info;

CREATE TABLE `task_group` (
  `group_id` int(10) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(40) NOT NULL,
  `group_color` varchar(7) NOT NULL,
  `user_id` int(10) NOT NULL,
  PRIMARY KEY (`group_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `task_group_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE `task` (
  `task_id` int(10) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(40) NOT NULL,
  `task_desc` varchar(255) DEFAULT NULL,
  `task_status` enum('Done','Todo','Doing') NOT NULL DEFAULT 'Todo',
  `due_date` date NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `group_id` int(10) NOT NULL,
  `notify_pref` enum('yes','no') NOT NULL DEFAULT 'no',
  PRIMARY KEY (`task_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `task_group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE `sub_task` (
  `subtask_id` int(10) NOT NULL AUTO_INCREMENT,
  `subtask_des` varchar(255) NOT NULL,
  `subtask_status` enum('Done','Todo') NOT NULL DEFAULT 'Todo',
  `task_id` int(10) NOT NULL,
  PRIMARY KEY (`subtask_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `sub_task_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`)
) ENGINE=InnoDB;


CREATE TABLE `tokens` (
  `token_id` int(10) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int(10) NOT NULL,
  `create_date` date DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
