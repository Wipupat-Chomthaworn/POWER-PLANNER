const express = require("express");
const path = require("path");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares/index"); //middleware to check is user log in?

router = express.Router();

// Require multer for file upload
const multer = require("multer");
const { group } = require("console");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// ---------------------------add taskgroup
// let userId = "Owena"
router.post("/api/addTaskGroups", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  // const file = req.file;
  // const comment = req.body.comment;
  let userId = req.user.user_id;
  console.log("data : ", req.body);
  // console.log("username : ", req.body.first_name);
  // console.log("email : ", req.body.email);
  try {
    let [results_userID] = await conn.query(
      "SELECT * FROM User_info WHERE user_id=?",
      [
        // req.body.username
        userId,
      ]
    );
    console.log("user_id", results_userID);
    results_userID = results_userID[0].user_id;
    // var username = results_userID[0].insertId;
    console.log("userid----------------", results_userID);
    let [results] = await conn.query(
      "INSERT INTO task_group (group_id, group_name, group_color, user_id) VALUES (NULL, ?, ?, ?);",
      [req.body.group_name, req.body.group_color, results_userID]
    );
    await conn.commit();
    console.log("success group added: ", results + new Date());
    res.status(200);
  } catch (err) {
    await conn.rollback();
    // await conn.query("ALTER TABLE task_group AUTO_INCREMENT = 1;");

    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    res.status(err.code);
  } finally {
    // res.status(200);
    console.log("finally group");
    conn.release();
  }
});

// ------------------get task_group data
router.get("/api/TaskGroups", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  let userId = req.user.user_id;
  console.log("user_id : ", userId);

  try {
    // let [results_userID] = await conn.query(
    //   "SELECT * FROM User_info WHERE user_id=?",[
    //     // req.body.username
    //     userId
    //   ]
    // );
    // console.log("result_userId : ", results_userID)

    // let user_id = results_userID[0].user_id;
    // let user_id = results_userID[0].user_id;

    // console.log("user_id : ", userId)
    let [results_task_group] = await conn.query(
      "SELECT * FROM task_group WHERE user_id=?",
      [
        // req.body.username
        userId,
      ]
    );
    // results_task_group = results_task_group[0]
    // console.log('results_task_group', results_task_group);
    console.log("task_group---------------", results_task_group);
    res.json(results_task_group);
    await conn.commit();
    console.log("success group getted", new Date());
    res.status(200);
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    res.status(err.code);
  } finally {
    // res.status(200);
    console.log("finally group");
    conn.release();
  }
});

// ------------------get task in task_group
router.get(
  "/api/TaskGroups/:group_id/tasks",
  isLoggedIn,
  async function (req, res, next) {
    const conn = await pool.getConnection();
    // Begin transaction
    console.log("task in group", req.params.group_id);
    await conn.beginTransaction();
    let userId = req.user.user_id;
    let group_id = req.params.group_id;

    try {
      // let [results_userID] = await conn.query(
      //   "SELECT user_id FROM User_info WHERE username=?",[
      //     // req.body.username
      //     userId
      //   ]
      // );
      // let user_id = results_userID[0].user_id;

      let [results_task_group] = await conn.query(
        "SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') AS `due_date` FROM task WHERE group_id = ?",
        [
          // req.body.username
          req.params.group_id,
        ]
      );
      // results_task_group = results_task_group[0]
      console.log("user_id", userId);
      console.log("tasks in task_group---------------", results_task_group);
      res.json(results_task_group);
      await conn.commit();
      console.log("success task in group getted", new Date());
      res.status(200);
    } catch (err) {
      await conn.rollback();
      next(err);
      console.log("error : ", err);
      // res.send(err.message);
      res.status(err.code);
    } finally {
      // res.status(200);
      console.log("finally group");
      conn.release();
    }
  }
);

// add task
router.post("/api/addTask", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  let userId = req.user.user_id;
  try {
    let [insert_task] = await conn.query(
      "INSERT INTO task (task_id, task_name, task_desc, task_status, due_date, created_at, updated_at, group_id, notify_pref) " +
        "VALUES (null, ?, ?, 'Todo', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, 'no')",
      [
        // req.body.username
        req.body.task_name,
        req.body.task_desc,
        req.body.due_date,
        req.body.group_id,
      ]
    );
    // console.log('user_id', results_userID);
    console.log("ins", insert_task);

    // res.json(results_task_group);
    await conn.commit();
    console.log("success task added", new Date());
    res.status(200).json({ message: "Add Task Success" });
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    res.status(err.code).send(err.message);
  } finally {
    // res.status(200);
    console.log("finally add task");
    conn.release();
  }
});
// Get tasks
router.get("/api/GetTasks", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  let userId = req.user.user_id;

  try {
    let [results_task] = await conn.query(
      "Select *, DATE_FORMAT(due_date, '%Y-%m-%d') AS `due_date` from task JOIN task_group using(group_id) join user_info using(user_id) where user_id=?",
      [
        // req.body.username
        userId,
      ]
    );
    // results_task = results_task[0];
    console.log("result_task", results_task);

    // res.json(results_task_group);
    await conn.commit();
    console.log("success task Getted", new Date());
    res.status(200).json(results_task);
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    // res.status(err.code);
    res.status(err.code).send(err.message);
  } finally {
    // res.status(200);
    conn.release();
  }
});

// Update tasks
router.put(
  "/api/updateTasks/:task_id",
  isLoggedIn,
  async function (req, res, next) {
    const conn = await pool.getConnection();
    console.log("Update tasks");
    // Begin transaction
    await conn.beginTransaction();
    let userId = req.user.user_id;
    let task_id = req.params.task_id;
    let task_name = req.body.task_name;
    let task_desc = req.body.task_desc;
    let task_status = req.body.task_status;
    let due_date = req.body.due_date;

    try {
      let [results_task] = await conn.query(
        "UPDATE TASK SET task_name= ?, task_desc = ?, task_status = ?, due_date = ?, updated_at = CURRENT_TIMESTAMP where task_id=?",
        [task_name, task_desc, task_status, due_date, task_id]
      );
      // results_task = results_task[0];
      console.log("result_task", results_task);
      if (results_task.affectedRows === 1) {
        await conn.commit();
        console.log("success task Updated", new Date());
        res.status(200).json({
          message: `Task ${task_id} Is Updated`,
        });
      }
      else{
        throw { message: "Invalid Update", code: 400 }; // Throw an error object with a message and a code
      }
    } catch (err) {
      await conn.rollback();
      next(err);
      console.log("error : ", err);
      // res.send(err.message);
      // res.status(err.code);
      res.status(err.code).send(err.message);
    } finally {
      // res.status(200);
      conn.release();
      console.log("update task finally");
    }
  }
);
// Update tasks status KANBAN
router.put(
  "/api/kanbanStatusTask/:task_id",
  isLoggedIn,
  async function (req, res, next) {
    const conn = await pool.getConnection();
    console.log("Update tasks");
    // Begin transaction
    await conn.beginTransaction();
    let userId = req.user.user_id;
    let task_id = req.params.task_id;
    let task_status = req.body.task_status;

    try {
      let [results_task] = await conn.query(
        "UPDATE TASK SET task_status = ?, updated_at = CURRENT_TIMESTAMP where task_id=?",
        [task_status, task_id]
      );
      console.log("result_task", results_task);
      if (results_task.affectedRows === 1) {
        await conn.commit();
        console.log("success task Updated", new Date());
        res.status(200).json({
          message: `Task ${task_id} Is Updated`,
        });
      }
      else{
        throw { message: "Invalid Update Status", code: 400 }; // Throw an error object with a message and a code
      }
    } catch (err) {
      await conn.rollback();
      next(err);
      console.log("error : ", err);
      // res.send(err.message);
      // res.status(err.code);
      res.status(err.code).send(err.message);
    } finally {
      // res.status(200);
      conn.release();
      console.log("update task finally");
    }
  }
);
// delete tasks
router.delete(
  "/api/deleteTasks/:task_id",
  isLoggedIn,
  async function (req, res, next) {
    const conn = await pool.getConnection();
    console.log("Delete tasks");
    // Begin transaction
    await conn.beginTransaction();
    let userId = req.user.user_id;
    let task_id = req.params.task_id;
    try {
      let [results_task] = await conn.query(
        "delete from sub_TASK where task_id=?",
        [task_id]
      );
      console.log("result_task", results_task);
      if (results_task.affectedRows === 1) {
        await conn.commit();
        console.log("success task Deleted", new Date());
        res.status(200).json({
          message: `Task ${task_id} Is Deleted`,
        });
      }
      else{
        throw { message: "Invalid Delete", code: 400 }; // Throw an error object with a message and a code
      }
    } catch (err) {
      await conn.rollback();
      next(err);
      console.log("error : ", err);
      // res.send(err.message);
      // res.status(err.code);
      res.status(err.code).send(err.message);
    } finally {
      // res.status(200);
      conn.release();
      console.log("delete task finally");
    }
  }
);

// -----------------------add subtask
router.post("/api/:taskId/addSubtask", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction()
  let user = req.user;
  console.log("add sub")
  try {
    let [insert_subtask] = await conn.query(
      "INSERT INTO sub_task (subtask_id, subtask_desc, subtask_status, task_id) VALUES (null, ?, 'Todo', ?)",
      [
        req.body.subtask_desc,
        req.params.taskId,
      ]
    );
    await conn.commit();
    console.log("success subtask added", new Date());
    res.status(200).send({message:"done"});
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    // res.status(err.code);
    res.status(err.code).send(err.message);
  } finally {
    // res.status(200);
    console.log("finally add subtask");
    conn.release();
  }
});
// -----------------------delete subtask
router.delete("/api/del/:subtaskId", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction()
  let user = req.user;
  try {
    let [insert_subtask] = await conn.query(
      "delete from sub_task where subtask_id = ?",
      [
        req.params.subtaskId,
      ]
    );
    // res.json(results_task_group);
    await conn.commit();
    console.log("success subtask added", new Date());
    res.status(200).json("Delete success");
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    // res.status(err.code);
    res.status(err.code).send(err.message);
  } finally {
    // res.status(200);
    console.log("finally del subtask");
    conn.release();
  }
});
// -----------------------get subtask
router.get("/api/:taskId/subtasks", async function (req, res, next) {
  let user = req.user;
    let [insert_subtask] = await pool.query(
      "select * from sub_task where task_id = ?",
      [
        req.params.taskId,
      ]
    );
    console.log("success subtask getted", new Date());
    res.status(200).json(insert_subtask);
});
// admin
router.get("/api/viewTask", isLoggedIn, async function (req, res) {
  let user = req.user
  if (user.user_type != "admin"){
    console.log("not an admin")
    return res.status(401).send({
      message:"You are not authorized to view this user"}
      )
  }
  // Your code here
  let [allTask] = await pool.query("SELECT *, DATE_FORMAT(updated_at, '%Y-%m-%d') AS `updated_at` FROM `user_info` join task_group using(user_id) join task using(group_id) order by updated_at desc");
  return res.status(200).send({
    allTask: allTask, //sent all Task data from database
  });
});
exports.router = router;
