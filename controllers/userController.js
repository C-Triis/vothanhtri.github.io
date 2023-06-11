"use strict";

const Logger = require("nodemon/lib/utils/log");
const User = require("../models/user").User;
const bcrypt = require("bcrypt");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./localStorage");
const jwt = require("jsonwebtoken");
const CONFIG = require("../config");


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
          //Todo: Call service email -> send otp to email user
          return User.create({
            username: data?.username,
            password: hash,
            email: data?.email,
            otp: otp,
          })
            .then(async (rs) => {
              if (rs) {
                await localStorage.setItem("email", data?.email);
                return res.redirect("/verifyUser");
              }
            })
            .catch((e) => {
              Logger.error(`Create user fail: ${e}`);
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
        return User.findOne({ otp: data?.otp, email: emailLocalStorage })
          .lean()
          .then(async (userInfo) => {
            if (userInfo) {
              userInfo.active = true;
              userInfo.otp = "";
              await User.updateOne({ _id: userInfo._id }, userInfo);
              res.redirect("/login");
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
              res.redirect("/product/list");
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
              return res.redirect("/login");
            } else {
              res.json({ s: 400, msg: "Password khong chinh xac" });
            }
          })
          .catch()
      } catch (error){
        Logger.error(`reset - fail: ${error}`)
      }
    }
  };
}

module.exports = new UserController();
