const express = require("express");
const path = require("path");
const pool = require("../config");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token"); // import for gen token
// const { sendotp } = require("../routes/otp"); // import for gen token
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
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
  email: Joi.string().email().required().max(30),
  username: Joi.string().optional().max(30),
  password: Joi.string().required().max(255),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).max(255),
  first_name: Joi.string().required().max(30),
  last_name: Joi.string().required().max(30),
  phone: Joi.string().required().min(10).max(10),
}).unknown(); // Allow unknown properties;
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

// Request OTP
router.post("/getOTP" , async function (req, res, next) {
  const email = req.body.email;
  console.log("req", req.body);
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  let [user] = await pool.query(
    "select * from user_info WHERE email = ?",
    [email]
  );
  user = user[0];
  try {
    await pool.query(
      "UPDATE prefer SET otp = ? WHERE pref_id = ?",
      [otp, user.pref_id]
    );
    console.log(otp, user.pref_id)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "power.owenplanner@gmail.com",
        pass: "azhzqgwzvritezrj",
      },
    });
  
    const mailOptions = {
      from: "power.owenplanner@gmail.com",
      to: email,
      subject: "Password Reset",
      text: otp,
    };
  
      transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).send("error");
      } else {
        console.log("Email sent: " + info.response);
        // next();
    res.status(200).send("success sent otp");

      }
    });
    console.log("otp");
  } catch (err) {
    next(err);
    res.status(400).send("cant");
  }
});
//update profile
router.put("/api/updateProfile",isLoggedIn, async function (req,res,next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const username = req.body.username;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const phone = req.body.phone;
  const password = req.body.password;
  const avatar = req.body.avatar;
   try {
    // Update user profile
    const enpassword = await bcrypt.hash(password, 5);
    let [upUser_info] = await conn.query(
      "UPDATE user_info SET username = ?, first_name = ?, last_name = ?, phone = ?, password = ? WHERE user_id = ?;",
      [username, firstName, lastName, phone, enpassword, req.user.id]
    );
    let [upPrefer] = await conn.query(
      "UPDATE prefer SET avatar=? WHERE pref_id = ?;",
      [avatar, req.user.pref_id]
    );
    console.log('upPrefer', upPrefer,'upUser_info',upUser_info)
    if (upPrefer.affectedRows == 1 && upUser_info.affectedRows == 1){
      await conn.commit();
      res.status(200).send("Profile updated successfully");
    }else{
      throw {code:401, message:`cant up ${upPrefer, upUser_info}`}
    }
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("Error: ", err);
    res.status(err.code).send(err.message);
  } finally {
    conn.release();
  }
})

// Reset password
router.put("/reset", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const email = req.body.email;
  const password = req.body.password;
  try {
    let [resultsOTP] = await conn.query(
      "SELECT * FROM prefer JOIN user_info WHERE email = ?;",
      [email]
    );
    resultsOTP = resultsOTP[0]

    if (resultsOTP.otp == req.body.otp) {
      const enpassword = await bcrypt.hash(req.body.password, 5);
      await conn.query("UPDATE user_info SET password = ? WHERE email = ?;", [
        enpassword,
        req.body.email,
      ]);
      await conn.query("UPDATE prefer SET otp = 0 WHERE pref_id = ?;", [
        // enpassword,
        resultsOTP.pref_id,
      ]);
      await conn.commit();
      res.status(200).send("reset password ok");
    }
  } catch (err) {
    await conn.rollback();
    next(err);
    console.log("error: ", err);
    res.status(err.code).send(err.message);
  } finally {
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
  let [result_avatar] = await pool.query("select * from user_info join prefer using(pref_id) where user_id = ?",[req.user.user_id])
  // res.status(200).send(req.user);
  res.status(200).send(result_avatar[0]);
});
router.get("/api/viewUser", isLoggedIn, async function (req, res) {
  let user = req.user;
  if (user.user_type != "admin") {
    console.log("not an admin");
    return res.status(401).send({
      message: "You are not authorized to view this user",
    });
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
