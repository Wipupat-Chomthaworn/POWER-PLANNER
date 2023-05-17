DROP TABLE IF EXISTS SUB_TASK;
DROP TABLE IF EXISTS TASK;
DROP TABLE IF EXISTS TASK_GROUP;
DROP TABLE IF EXISTS TOKENS;
DROP TABLE IF EXISTS USER_INFO;
DROP TABLE IF EXISTS PREFER;


CREATE TABLE `PREFER` (
  `pref_id` Integer(10) AUTO_INCREMENT,
  `theme` Enum('dark','light') NOT NULL DEFAULT "light",
  `text_size` Enum("1","2","3","4") NOT NULL DEFAULT "2",
  PRIMARY KEY (`pref_id`)
);

CREATE TABLE `USER_INFO` (
  `user_id` Integer(10) PRIMARY KEY AUTO_INCREMENT,
  `email` Varchar(30) UNIQUE NOT NULL,
  `username` Varchar(30) NOT NULL UNIQUE,
  `password` Varchar(255) NOT NULL,
  `first_name` Varchar(30) NOT NULL,
  `last_name` Varchar(30) NOT NULL,
  `phone` Varchar(10) NOT NULL,
  `user_type` Enum('admin', 'n') DEFAULT 'n',
  `pref_id` Integer(10) NOT NULL,
  FOREIGN KEY (pref_id) REFERENCES PREFER(pref_id)
);

CREATE TABLE `tokens` (
  `token_id` int(10) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int(10) NOT NULL,
  `create_date` date DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
);



CREATE TABLE `TASK_GROUP` (
  `group_id` Integer(10) PRIMARY KEY AUTO_INCREMENT,
  `group_name` Varchar(20) NOT NULL,
  `group_color` Varchar(7) NOT NULL,
  `user_id` Integer(10) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES USER_INFO(user_id)
);

CREATE TABLE `TASK` (
  `task_id` Integer(10) PRIMARY KEY AUTO_INCREMENT,
  `task_name` Varchar(20) NOT NULL,
  `task_desc` Varchar(255),
  `task_status` Enum('Done','Todo','Doing','late') NOT NULL DEFAULT 'Todo',
  `due_date` Date NOT NULL,
  `created_at` Date NOT NULL,
  `updated_at` Date NOT NULL,
  `group_id` Integer(10) NOT NULL,
  `notify_pref` Enum("yes","no") NOT NULL DEFAULT "no",
  FOREIGN KEY (group_id) REFERENCES TASK_GROUP(group_id)
);

CREATE TABLE `SUB_TASK` (
  `subtask_id` Integer(10) AUTO_INCREMENT,
  `subtask_des` varchar(255) NOT NULL,
  `subtask_status` Enum("Done","Todo") NOT NULL DEFAULT "Todo",
  `task_id` Integer(10) NOT NULL,
  PRIMARY KEY (`subtask_id`),
  FOREIGN KEY (task_id) REFERENCES TASK(task_id)
);
