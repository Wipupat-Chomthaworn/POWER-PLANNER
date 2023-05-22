const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer');
const express = require("express");
const path = require("path");
const pool = require("../config");
const bcrypt = require('bcrypt');
async function sendotp(req, res, next) {
    var email
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        email = req.user.email
        await pool.query("update prefer set otp = ? join user_info using(pref_id) where user_id = ? ",[otp, req.user.user_id])
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'murakishopp@gmail.com',
          pass: 'vuxjtsqgsipzdobh'
        }
      });
      var mailOptions = {
        from: 'murakishopp@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: otp
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(400).send("error")
        } else {
          console.log('Email sent: ' + info.response);
          next()
        }
      });
}

module.exports = {
    sendotp
}