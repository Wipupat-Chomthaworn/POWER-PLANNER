const express = require("express");
const path = require("path");
const pool = require("../config");
const { isLoggedIn } = require('../middlewares/index');//middleware to check is user log in?

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
router.post("/api/addTaskGroups",isLoggedIn, async function (req, res, next) {
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
      "SELECT * FROM User_info WHERE user_id=?",[
        // req.body.username
        userId
      ]
    );
    console.log('user_id', results_userID);
    results_userID = results_userID[0].user_id;
    // var username = results_userID[0].insertId;
    console.log("userid----------------", results_userID);
    let [results] = await conn.query(
      "INSERT INTO task_group (group_id, group_name, group_color, user_id) VALUES (NULL, ?, ?, ?);",
      [
        req.body.group_name,
        req.body.group_color,
        results_userID,
      ]
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
    res.status(err.code)
  } finally {
    // res.status(200);
    console.log("finally group");
    conn.release();
  }
});

// ------------------get task_group data
router.get("/api/TaskGroups",isLoggedIn, async function (req, res, next) {
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
      "SELECT * FROM task_group WHERE user_id=?",[
        // req.body.username
        userId
      ]
      );
      // results_task_group = results_task_group[0]
    // console.log('results_task_group', results_task_group);
    console.log("task_group---------------", results_task_group);
    res.json(results_task_group);
    await conn.commit();
    console.log("success group added", new Date());
    res.status(200);
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    res.status(err.code)
  } finally {
    // res.status(200);
    console.log("finally group");
    conn.release();
  }
});

// ------------------get task in task_group
router.get("/api/TaskGroups/:group_id/tasks",isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  console.log("task in group", req.params.group_id)
  await conn.beginTransaction();
  let userId = req.user.user_id;
  let group_id = req.params.group_id

  try {
    // let [results_userID] = await conn.query(
    //   "SELECT user_id FROM User_info WHERE username=?",[
    //     // req.body.username
    //     userId
    //   ]
    // );
    // let user_id = results_userID[0].user_id;
    
    let [results_task_group] = await conn.query(
      "SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') AS `due_date` FROM task WHERE group_id = ?",[
        // req.body.username
        req.params.group_id
      ]
      );
      // results_task_group = results_task_group[0]
    console.log('user_id', userId);
    console.log("tasks in task_group---------------", results_task_group);
    res.json(results_task_group);
    await conn.commit();
    console.log("success group added", new Date());
    res.status(200);
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    res.status(err.code)
  } finally {
    // res.status(200);
    console.log("finally group");
    conn.release();
  }
});


// add task
router.post("/api/Tasks",isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  let userId = req.user.user_id;
  try {
    let insert_task = await conn.query(
      "INSERT INTO task (task_id, task_name, task_desc, task_status, due_date, created_at, updated_at, group_id, notify_pref) VALUES (null, ?, ?, 'Todo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, 'no')",[
        // req.body.username
        req.body.task_name,
        req.body.task_desc,
        // req.body.due_date,
        req.body.group_id,
      ]
      );
    // console.log('user_id', results_userID);
    console.log('ins', insert_task);

    // res.json(results_task_group);
    await conn.commit();
    console.log("success task added", new Date());
    res.status(200).json(insert_task);
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    res.status(err.code)
  } finally {
    // res.status(200);
    console.log("finally add task");
    conn.release();
  }
});
// Get tasks
router.get("/api/GetTasks",isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  let userId = req.user.user_id;

  try {
    // let [results_userID] = await conn.query(
    //   "SELECT user_id FROM User_info WHERE username=?",[
    //     // req.body.username
    //     userId
    //   ]
    // );
    // console.log("result_userId", results_userID);
    // let user_id = results_userID[0].user_id;
    let [results_task] = await conn.query(
      "Select *, DATE_FORMAT(due_date, '%Y-%m-%d') AS `due_date` from task JOIN task_group using(group_id) join user_info using(user_id) where user_id=?",[
        // req.body.username
        userId,
      ]
      );
      // results_task = results_task[0];
    console.log('result_task', results_task);

    // res.json(results_task_group);
    await conn.commit();
    console.log("success task Getted", new Date());
    res.status(200).json(results_task);
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    res.status(err.code)
  } finally {
    // res.status(200);
    conn.release();
  }
});
// -----------------------add subtask
router.post("/api/SubTask", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();

  try {
    let [results_userID] = await conn.query(
      "SELECT user_id FROM User_info WHERE username=?",[
        // req.body.username
        userId
      ]
    );
    let user_id = results_userID[0].user_id;
    let insert_subtask = await conn.query(
      "INSERT INTO sub_task (subtask_id, subtask_desc, subtask_status, created_at, updated_at, task_id) VALUES (null, ?, 'Todo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)",[
        // req.body.username
        req.body.subtask_desc,
        // req.body.due_date,
        req.body.task_id,
      ]
      );
    console.log('user_id', results_userID);
    console.log('ins', insert_subtask);

    // res.json(results_task_group);
    await conn.commit();
    console.log("success subtask added", new Date());
    res.status(200).json(insert_subtask);
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    res.status(err.code)
  } finally {
    // res.status(200);
    console.log("finally add subtask");
    conn.release();
  }
});
// admin

router.post("/blogs/addlike/:blogId", async function (req, res, next) {
  //ทำการ select ข้อมูล blog ที่มี id = req.params.blogId
  try {
    const [rows, fields] = await pool.query("SELECT * FROM blogs WHERE id=?", [
      req.params.blogId,
    ]);
    //ข้อมูล blog ที่เลือกจะอยู่ในตัวแปร rows
    console.log("Selected blogs =", rows);
    //สร้างตัวแปรมาเก็บจำนวน like ณ ปัจจุบันของ blog ที่ select มา
    let likeNum = rows[0].like;
    console.log("Like num =", likeNum); // console.log() จำนวน Like ออกมาดู
    //เพิ่มจำนวน like ไปอีก 1 ครั้ง
    likeNum += 1;

    //Update จำนวน Like กลับเข้าไปใน DB
    const [rows2, fields2] = await pool.query(
      "UPDATE blogs SET blogs.like=? WHERE blogs.id=?",
      [likeNum, req.params.blogId]
    );

    // return json response
    return res.json({
      blogId: Number(req.params.blogId),
      likeNum: likeNum,
    });
  } catch (err) {
    res.json(err);
  }
});

router.post(
  "/blogs",
  upload.single("blog_image"),
  async function (req, res, next) {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return res.status(400).json(error);
    }

    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    const pinned = req.body.pinned;

    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();

    try {
      let results = await conn.query(
        "INSERT INTO blogs(title, content, status, pinned, `like`,create_date) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);",
        [title, content, status, pinned]
      );
      const blogId = results[0].insertId;

      await conn.query("INSERT INTO images(blog_id, file_path) VALUES(?, ?);", [
        blogId,
        file.path.substr(6),
      ]);

      await conn.commit();
      res.json("success!");
    } catch (err) {
      await conn.rollback();
      res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  }
);

router.get("/blogs/:id", function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [
    req.params.id,
  ]);
  const promise3 = pool.query(
    "SELECT * FROM images WHERE blog_id=? AND comment_id IS NULL",
    [req.params.id]
  );

  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      const blogs = results[0];
      const comments = results[1];
      const images = results[2];
      res.json({
        blog: blogs[0][0],
        images: images[0],
        comments: comments[0],
        error: null,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
//decoy
router.get("/api/groups/:username", function (req, res, next) {
  console.log(req.params.username);
//   const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [
//     req.params.id,
//   ]);
//   const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [
//     req.params.id,
//   ]);
//   const promise3 = pool.query(
//     "SELECT * FROM images WHERE blog_id=? AND comment_id IS NULL",
//     [req.params.id]
//   );

//   Promise.all([promise1, promise2, promise3])
//     .then((results) => {
//       const blogs = results[0];
//       const comments = results[1];
//       const images = results[2];
//       res.json({
//         blog: blogs[0][0],
//         images: images[0],
//         comments: comments[0],
//         error: null,
//       });
//     })
//     .catch((err) => {
//       return next(err);
//     });
res.json({
  groups: [
    {
      name: "Personal",
      color: "pink",
      tasks: [
        {
          task_name: "Workout",
          task_desc:
            "Jog for 30 minutes, do 20 pushups, and stretch for 10 minutes",
          task_status: "not done",
          notify_preference: "yes",
          subtasks: [
            {
              subtask_name: "Jog for 30 minutes",
              subtask_status: "not done",
            },
            {
              subtask_name: "Do 20 pushups",
              subtask_status: "not done",
            },
            {
              subtask_name: "Stretch for 10 minutes",
              subtask_status: "not done",
            },
          ],
        },
        {
          task_name: "Groceries",
          task_desc: "Buy milk, bread, and eggs",
          task_status: "done",
          notify_preference: "no",
          subtasks: [],
        },
      ],
    },
    {
      name: "Work",
      color: "purple",
      tasks: [
        {
          task_name: "Meeting with boss",
          task_desc: "Discuss project timeline and deliverables",
          task_status: "not done",
          notify_preference: "yes",
          subtasks: [],
        },
        {
          task_name: "Submit report",
          task_desc: "Compile weekly progress report for team",
          task_status: "not done",
          notify_preference: "yes",
          subtasks: [
            {
              subtask_name: "Gather data",
              subtask_status: "not done",
            },
            {
              subtask_name: "Write report",
              subtask_status: "not done",
            },
            {
              subtask_name: "Review report",
              subtask_status: "not done",
            },
          ],
        },
      ],
    },
  ],
});
console.log("sent reminder successfully")
});
exports.router = router;
