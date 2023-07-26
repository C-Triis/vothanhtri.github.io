"use strict";

const Logger = require("nodemon/lib/utils/log");
const User = require("../models/user").User;
const bcrypt = require("bcrypt");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./localStorage");
const jwt = require("jsonwebtoken");
const CONFIG = require("../config");
const session = require("express-session")
const emailService = require("../services/emailService")


function UserController() {
  const SELF = {
    enCodePass: (password) => {
      return bcrypt
        .hash(password, 10)
        .then((hash) => {
          return Promise.resolve(hash);
        })
        .catch((err) => {
          Logger.error(`hash - fail: ${err}`);
        });
    },
  };
  return {
    register: async (req, res) => {
      try {
        let data = req.body;
        if (!data?.username || !data?.password || !data?.repassword || !data?.email) {
          return res.json({ s: 400, msg: "Thong tin chua day du, vui long nhap day du" });
        }
        if (data?.password !== data?.repassword) {
          return res.json({ s: 400, msg: "Mat khau chua trung khop" });
        }
        const user = await User.findOne({
          $or: [{ email: data?.email }, { username: data?.username }],
        }).lean();
        if (user) {
          return res.json({ s: 400, msg: "Email or Username exist" });
        }
        return SELF.enCodePass(data?.password).then((hash) => {
          let otp = (Math.random() + 1).toString(36).substring(6);
          emailService.SendMailSG(otp,data?.email).then(()=>{
            return User.create({
              username: data?.username,
              email: data?.email,
              password: hash,
              otp: otp,
            })
            .then(async (rs) => {
              if(rs) {
                await localStorage.setItem("email", data?.email);
                return res.redirect("/account/verifyUser");
              }
            })
            .catch((e) => {
              console.log(`Create user fail: ${e}`);
            });
          });
        });
      } catch (error) {
        Logger.error(`register - fail: ${error}`);
      }
    }, 
    verify: async (req, res) => {
      try {
        let data = req.body;
        if (!data?.otp) {
          return res.json({ s: 400, msg: "Vui long nhap OTP" });
        }
        const emailLocalStorage = await localStorage.getItem("email");
        console.log(data.otp);
        console.log(emailLocalStorage);
        return User.findOne({ otp: data?.otp, email: emailLocalStorage })
          .lean()
          .then(async (userInfo) => {
            if (userInfo) {
              userInfo.active = true;
              userInfo.otp = "";
              await User.updateOne({ _id: userInfo._id }, userInfo);
              res.redirect("/account/login");
            } else {
              return res.json({ s: 400, msg: "OTP chua chinh xac" });
            }
          })
          .catch((e) => {
            Logger.error(`Find one user fail: ${e}`);
          });
      } catch (error) {
        Logger.error(`verify - fail: ${error}`);
      }
    },
    login: async (req, res) => {
      try {
        let data = req.body;
        if (!data?.username || !data?.password) {
          return res.json({ s: 400, msg: "Username or password not empty" });
        }
        let userInfo = await User.findOne({ username: data?.username }).lean();
        if (!userInfo) {
          return res.json({ s: 404, msg: `Username ${data?.username} khong ton tai` });
        }
        if (!userInfo.active) {
          return res.json({ s: 400, msg: `Username ${data?.username} chua duoc active` });
        }
        return bcrypt
          .compare(data?.password, userInfo.password)
          .then(async (rs) => {
            if (rs) {
              const token = jwt.sign(
                {
                  userId: userInfo._id,
                  email: userInfo?.email,
                },
                CONFIG.SERECT_KEY,
                { expiresIn: "20h" }
              );
              userInfo.token = token;
              await User.updateOne({ _id: userInfo._id }, userInfo);
              let session = req.session;
              session.token = token;
              session.userId = userInfo._id
              res.redirect("/");
            } else {
              res.json({ s: 400, msg: "Password khong chinh xac" });
            }
          })
          .catch();
      } catch (error) {
        Logger.error(`login - fail: ${error}`);
      }
    },
    confirm: (req, res) => {
      try {
        let data = req.body;
        if (!data?.password) {
          return res.json({ s: 400, msg: "Password not empty" });
        }
        return bcrypt
          .compare(data?.oldPassword, userInfo.password)
          .then( async (rs) => {
            if(rs) {
              return res.redirect("/account/login");
            } else {
              res.json({ s: 400, msg: "Password khong chinh xac" });
            }
          })
          .catch()
      } catch (error){
        Logger.error(`reset - fail: ${error}`)
      }
    },
    checkLogin: async (req, res, next) => {
      try {
        let session = req.session;
        if (session.userId) {
          //Todo: token => verify Database
          return next();
        } else {
          return res.redirect("/account/login");
        }
      } catch (error) {
       console.log(`checkLogin - fail: ${error}`);
      }
    },
  };
}

module.exports = new UserController();
