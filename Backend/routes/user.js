const express = require("express");
const path = require("path");
const pool = require("../config");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token"); // import for gen token
const { sendotp } = require("../routes/otp"); // import for gen token
const Joi = require("joi");
const { isLoggedIn } = require("../middlewares/index"); //middleware to check is user log in?

// Require multer for file upload
const multer = require("multer");
const { group, log } = require("console");
const { router } = require("./reminder");
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
// const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username:Joi.string().optional(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required().min(10).max(10),
});
// Create new user
router.post("/signup", async function (req, res, next) {
  let resultUserJoi = userSchema.validate(req.body, { abortEarly: false });
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  console.log("data : ", req.body);
  try {
    if (resultUserJoi.error) {
      throw { message: resultUserJoi.error, code: 400 };
    }
    let results_pref = await conn.query(
      "INSERT INTO prefer (pref_id, theme, text_size) VALUES (NULL,'light','2');"
    );
    var pref_id = results_pref[0].insertId;
    const enpassword = await bcrypt.hash(req.body.password, 5);
    console.log("Pref----------------", pref_id);
    let results = await conn.query(
      "INSERT INTO user_info (user_id, email, username, password, first_name, last_name, phone, user_type, pref_id) VALUES (NULL, ?, ?, ?, ?, ?, ?, 'customer',?);",
      [
        req.body.email,
        req.body.first_name,
        enpassword,
        req.body.first_name,
        req.body.last_name,
        req.body.phone,
        pref_id,
      ]
    );
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
    res.status(err.code).send({
      err: err,
    });
  } finally {
    // res.status(200);
    console.log("finally");
    conn.release();
  }
});
router.get("/api/getotp", async function (req, res) {
  const conn = await pool.getConnection();
});
// Reset password
router.put("/reset", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  console.log("data : ", req.body);

  try {
    const enpassword = await bcrypt.hash(req.body.password, 5);
    console.log("Pref----------------", pref_id);
    let results = await conn.query(
      "UPDATE user_info set password =? where email=?;",
      [enpassword, req.body.email]
    );
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
    res.status(err.code);
  } finally {
    // res.status(200);
    console.log("finally");
    conn.release();
  }
});
//login user
router.post("/api/login", async function (req, res, next) {
  const conn = await pool.getConnection();
  conn.beginTransaction();
  console.log("dataFromReq : ", req.body);

  let email = req.body.email;
  let password = req.body.password;
  try {
    // Check if email is correct
    const [users] = await conn.query(
      "SELECT * FROM `user_info` WHERE email=?",
      [email]
    );
    const user = users[0];
    console.log("user", user.email, user.password);
    if (!user) {
      throw new Error("Incorrect username or password");
    }
    // Check if password is correct
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Incorrect username or password");
    }

    // Check if token already existed
    const [tokens] = await conn.query("SELECT * FROM tokens WHERE user_id=?", [
      user.user_id,
    ]);
    let token = tokens[0]?.token;
    // next part is to check if NO token
    if (!token) {
      // Generate and save token into database
      token = generateToken(); //call function from token.js
      console.log("UserId:", user.user_id);
      console.log("token:", token);

      await conn.query(
        "INSERT INTO tokens (token, user_id, create_date) VALUES (?, ?, CURRENT_TIMESTAMP)",
        [token, user.user_id]
      );
      await conn.commit();
    }
    //res token so user can access and assign to their browser
    res.status(200).send({
      token: token,
    });
  } catch (err) {
    console.log(err);
    await conn.rollback();
    await conn.query("ALTER TABLE TOKENS AUTO_INCREMENT = 1;");
    console.log("err");
    res.status(404).send("Invalid username or password");
  } finally {
    conn.release();
    console.log("Token Finally");
  }
});

// admin
router.get("/api/user", isLoggedIn, async function (req, res) {
  res.status(200).send(req.user);
});
router.get("/api/viewUser", isLoggedIn, async function (req, res) {
  let user = req.user
  if (user.user_type != "admin"){
    console.log("not an admin")
    return res.status(401).send({
      message:"You are not authorized to view this user"}
      )
  }
  // Your code here
  let [allUsers] = await pool.query("SELECT * FROM `user_info`");
  return res.status(200).send({
    allUsers: allUsers, //sent all users data from database
    whoAreU: req.user.user_id, //sent who user is logged and who is logged in CANT delete itself
  });
});
router.delete("/api/delUser/:userId", function (req, res) {
  // Your code here
  return;
});
exports.router = router;
