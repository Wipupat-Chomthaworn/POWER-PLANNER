
CREATE TABLE `PREFER` (
  `pref_id` Integer(10),
  `theme` Enum('dark','light') NOT NULL,
  `text_size` Enum("1","2","3","4") NOT NULL,
  PRIMARY KEY (`pref_id`)
);

CREATE TABLE `USER_INFO` (
  `user_id` Integer(10) PRIMARY KEY,
  `email` Varchar(30) UNIQUE NOT NULL,
  `username` Varchar(30) NOT NULL,
  `password` Varchar(30) NOT NULL,
  `first_name` Varchar(30) NOT NULL,
  `last_name` Varchar(30) NOT NULL,
  `phone` Varchar(10) NOT NULL,
  `pref_id` Integer(10) NOT NULL,
  FOREIGN KEY (pref_id) REFERENCES PREFER(pref_id)
);

CREATE TABLE `TASK_GROUP` (
  `group_id` Integer(10) PRIMARY KEY,
  `group_name` Varchar(20) NOT NULL,
  `group_color` Varchar(7) NOT NULL,
  `user_id` Integer(10) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES USER_INFO(user_id)
);

CREATE TABLE `TASK` (
  `task_id` Integer(10) PRIMARY KEY,
  `task_name` Varchar(20) NOT NULL,
  `task_desc` Varchar(255),
  `task_status` Enum('Done','Todo','Doing','late') NOT NULL,
  `due_date` Date NOT NULL,
  `created_at` Date NOT NULL,
  `updated_at` Date NOT NULL,
  `group_id` Integer(10) NOT NULL,
  `notify_pref` Enum("yes","no") NOT NULL,
  FOREIGN KEY (group_id) REFERENCES TASK_GROUP(group_id)
);



CREATE TABLE `SUB_TASK` (
  `subtask_id` Integer(10),
  `subtask_des` varchar(255) NOT NULL,
  `subtask_status` Enum("Done","Todo") NOT NULL,
  `task_id` Integer(10) NOT NULL,
  PRIMARY KEY (`subtask_id`),
  FOREIGN KEY (task_id) REFERENCES TASK(task_id)
);
