const express = require("express");
const path = require("path");
const pool = require("../config");

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

// Create new user
router.post("/signup", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  // const file = req.file;
  // const comment = req.body.comment;
  console.log("data : ", req.body);
  // console.log("username : ", req.body.first_name);
  // console.log("email : ", req.body.email);


  try {
    let results_pref = await conn.query(
      "INSERT INTO prefer (pref_id, theme, text_size) VALUES (NULL,'light','2');"
    );
    var pref_id = results_pref[0].insertId;
    console.log("Pref----------------", pref_id);
    let results = await conn.query(
      "INSERT INTO user_info (user_id, email, username, password, first_name, last_name, phone, user_type, pref_id) VALUES (NULL, ?, ?, ?, ?, ?, ?,'n',?);",
      [
        req.body.email,
        req.body.first_name,
        req.body.password,
        req.body.first_name,
        req.body.last_name,
        req.body.phone,
        pref_id,
      ]
    );
    // const Id = results[0].insertId;
    // if (file) {
    //   await conn.query(
    //     "INSERT INTO images(blog_id, file_path, comment_id) VALUES(?, ?, ?);",
    //     [req.params.blogId, file.path.substr(6), Id]
    //   );
    // }
    await conn.commit();
    console.log("success : ", results);
    res.send(200);
    // res.redirect("http://localhost:3000/blogs/" + req.params.blogId);
  } catch (err) {
    await conn.rollback();
    await conn.query("ALTER TABLE user_info AUTO_INCREMENT = 1;");

    next(err);
    console.log("error : ", err);
    // res.send(err.message);
    res.status(err.code)
  } finally {
    // res.status(200);
    console.log("finally");
    conn.release();
  }
});

router.post("/log", async function (req, res, next) {
  const conn = await pool.getConnection();
  console.log("dataFromReq : ", req.body);
  let results = await conn.query(
    "select * from user_info where username = ?;",
    [req.body.username]
  );
  // console.log("dataFromDB", results);
  // console.log("ispasswordcorrect : ", (req.body.username = results[0].username && results[0].body.password == results[0].password))
  if (
    (req.body.username == results[0][0].username ||
      req.body.username == results[0][0].email) &&
    req.body.password == results[0][0].password
  ) {
    // success code

    console.log("success : ", results);

    // res.redirect("http://localhost:5173/remaining");
    res.send("Log In sucessfully");
  } else {
    res.send("username or password is incorrect");
    // console.log("dataFromDB", results);
  }
});
// ---------------------------add group
let usernameTest = "Owena"
router.post("/api/addTaskGroups", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  // const file = req.file;
  // const comment = req.body.comment;
  console.log("data : ", req.body);
  // console.log("username : ", req.body.first_name);
  // console.log("email : ", req.body.email);
  try {
    let results_userID = await conn.query(
      "SELECT user_id FROM User_info WHERE username=?",[
        // req.body.username
        usernameTest
      ]
    );
    console.log('user_id', results_userID);
    results_userID = results_userID[0][0].user_id;
    // var username = results_userID[0].insertId;
    console.log("userid----------------", results_userID);
    let results = await conn.query(
      "INSERT INTO task_group (group_id, group_name, group_color, user_id) VALUES (NULL, ?, ?, ?);",
      [
        req.body.group_name,
        req.body.group_color,
        results_userID,
      ]
    );
    await conn.commit();
    console.log("success group added: ", results);
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
router.get("/api/TaskGroups", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();

  try {
    let results_userID = await conn.query(
      "SELECT user_id FROM User_info WHERE username=?",[
        // req.body.username
        usernameTest
      ]
    );
    let user_id = results_userID[0][0].user_id;
    let results_task_group = await conn.query(
      "SELECT * FROM task_group WHERE user_id=?",[
        // req.body.username
        user_id
      ]
      );
      results_task_group = results_task_group[0]
    console.log('user_id', results_task_group);
    console.log("task_group---------------", results_task_group);
    res.json(results_task_group);
    await conn.commit();
    console.log("success group added:");
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

router.put("/blogs/:id", function (req, res) {
  // Your code here
  return;
});

router.delete("/blogs/:id", function (req, res) {
  // Your code here
  return;
});
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
