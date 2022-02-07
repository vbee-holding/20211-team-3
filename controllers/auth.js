const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

const key = {
  tokenKey: "djghhhhuuwiwuewieuwieuriwu_cus"
};

const app = express();
app.use(fileUpload());


module.exports = {
    register : async function(req, res) {
      const{email,password} = req.body;
      const userExist = await UserModel.findOne({ email: req.body.email });

      if (!userExist) {
        const hash = await bcrypt.hash(req.body.password, 8);
        User.password = hash;
        const createFields = {username, password,email};
        await User.create(createFields);
          return res.json({
            code: 200,
            message: "Bạn đã đăng ký thành công",
            data: { userCreate }
          });
        } else {
          return res.json({
            code: 200,
            message: "Người dùng đã tồn tại",
            data: null
          });
        }
      },
    login : async function(req, res, next) {
        try {
          const user = await UserModel.findOne({ email: req.body.email });
      
          if (!user) {
            return res.json({
              code: 401,
              message: "Nhập sai email đăng nhập",
              data: null
            });
          }
      
          if (user.isDelete === true) {
            return res.json({
              code: 401,
              message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin",
              data: null
            });
          }
      
          const result = await bcrypt.compare(req.body.password, user.password);
      
          if (result) {
            const token = jwt.sign({ _id: user._id }, key.tokenKey);
      
            const { username, role, email, image, _id } = user;
      
            return res.header("auth-token", token).json({
              code: 200,
              message: "Đăng nhập thành công",
              data: { username, role, email, image, _id },
              token
            });
          } else {
            return res.json({
              code: 400,
              message: "Nhập sai password",
              data: null
            });
          }
        } catch (err) {
          return res.json({ code: 400, message: err.message, data: null });
        }
      },
      getUser : async (req, res) => {
        const userToken = req.params.token;
      
        try {
          let decoded = jwt.decode(userToken);
      
          if (decoded) {
            const id = decoded._id;
            const user = await UserModel.findOne({ _id: id });
            const { username, role, email, image, _id } = user;
      
            return res.json({
              code: 200,
              data: { username, role, email, image, _id }
            })
      
          } else {
            return res.json({
              message: "Lỗi xác thực!"
            })
          }
      
        } catch (err) {
          return res.json({
            code: 400,
            message: err
          })
        }
    },
      checkToken : (req, res) => {
        const token = req.body.token;
        const role = req.body.role;
        const tokenAuth = key.tokenKey;
      
        jwt.verify(tokenAuth, token, function(err, decoded) {
          if (err) {
            res.json({
              role: role,
              message: "Error"
            });
          }
      
          if (decoded && role === "admin") {
            res.json({
              role: role
            });
          }
          if (decoded && role === "editor") {
            res.json({
              role: role
            });
          }
          if (decoded && role === "customer") {
            res.json({
              role: role
            });
          }
        });
      }
}
