var express = require('express');
var router = express.Router();

// Models
const UserModel = require("../models/User");

module.exports = {
    getUsers : async (req, res, next) => {
        const users = await UserModel.find({});
      
        try {
          res.json({
            code: 200,
            data: users
          })
        } catch (error) {
          res.json({
            code: 500,
            error: TypeError,
          })
        }
      },
      getChannels : async (req, res, next) => {
        const users = await UserModel.find({ role: "journalist" }).limit(4).sort({ follow: -1 });
      
        try {
          res.json({
            code: 200,
            data: users
          })
        } catch (error) {
          res.json({
            code: 500,
            error: TypeError,
          })
        }
      },

      lockUser : async (req, res, next) => {
        const userExist = await UserModel.find({ _id: req.params.id });
      
        try {
          if (userExist) {
            const lockUser = await UserModel.findOneAndUpdate({ _id: req.params.id }, { isDelete: req.body.isDelete });
            const users = await UserModel.find({});
      
            if (lockUser) {
              res.json({
                code: 200,
                message: "Thao tác thành công",
                data: users
              })
            }
          }
        } catch (error) {
          res.json({
            code: 500,
            message: "Khóa tài khoản thất bại",
            error: TypeError,
          })
        }
      },
      
    updateName : async (req, res) => {
        const userExist = await UserModel.findOne({ _id: req.params.id });
      
        if (userExist) {
          try {
            const user = {
              username: req.body.userName
            };
      
            const updateUserName = await UserModel.findOneAndUpdate(
              { _id: req.params.id },
              user,
              {
                new: true,
                useFindAndModify: false
              }
            );
      
            if (updateUserName) {
              res.json({
                data: updateUserName,
                code: 200,
                message: "Cập nhật name thành công"
              });
            }
          } catch (error) {
            res.status(500).json({
              message: error
            });
          }
        }
      },
      updateEmail : async (req, res) => {
        const userExist = await UserModel.findOne({ _id: req.params.id });
        const emailExist = await UserModel.findOne({ email: req.body.email });
      
        if (userExist) {
          if (emailExist) {
            res.json({
              code: 404,
              message: "Email đã tồn tại"
            });
          } else {
            try {
              const user = {
                email: req.body.email
              };
      
              const updateUserEmail = await UserModel.findOneAndUpdate(
                { _id: req.params.id },
                user,
                {
                  new: true,
                  useFindAndModify: false
                }
              );
      
              if (updateUserEmail) {
                res.json({
                  code: 200,
                  data: updateUserEmail,
                  message: "Cập nhật email thành công"
                });
              }
            } catch (error) {
              res.status(500).json({
                message: error
              });
            }
          }
        }
      },
      updatePassword : async (req, res) => {
        const userExist = await UserModel.findOne({ _id: req.params.id });
      
        if (userExist) {
          const comparePassword = await bcrypt.compare(
            req.body.currentPassword,
            userExist.password
          );
      
          if (comparePassword) {
            try {
              const hashPassword = await bcrypt.hash(req.body.newPassword, 8);
      
              const user = {
                password: hashPassword
              };
      
              const updateUserPassword = await UserModel.findOneAndUpdate(
                { _id: req.params.id },
                user,
                {
                  new: true,
                  useFindAndModify: false
                }
              );
      
              if (updateUserPassword) {
                res.json({
                  data: updateUserPassword,
                  code: 200,
                  message: "Cập nhật password thành công"
                });
              }
            } catch (error) {
              res.status(500).json({
                message: error
              });
            }
          } else {
            res.json({
              code: 404,
              message: "Nhập password hiện tại không đúng"
            });
          }
        }
      },
      uploadAvatar : async (req, res) => {
        const userExist = await UserModel.findOne({ _id: req.params.id });
      
        if (userExist) {
          const file = req.files.file;
      
          if (file) {
            try {
              file.mv(`${__dirname}/../client/public/uploads/users/${file.name}`);
      
              const user = {
                image: file.name
              };
      
              const updateUserAvatar = await UserModel.findOneAndUpdate(
                { _id: req.params.id },
                user,
                {
                  new: true,
                  useFindAndModify: false
                }
              );
      
              if (updateUserAvatar) {
                res.json({
                  data: updateUserAvatar,
                  code: 200,
                  message: "Thay đổi avatar thành công"
                });
              }
            } catch (error) {
              res.json({
                code: 500,
                message: "Thay đổi avatar thất bại"
              });
            }
          }
        }
      },
      updateRole : async (req, res, next) => {
        try {
          const userRole = {
            role: req.body.role
          };
          const updateRoleUser = await UserModel.findOneAndUpdate({ _id: req.params.id }, userRole);
          const users = await UserModel.find({});
      
          if (updateRoleUser) {
            res.json({
              code: 200,
              message: "Thay đổi vai trò thành công",
              data: users
            })
          }
        } catch (error) {
          res.json({
            code: 500,
            message: "Thay đổi vai trò thất bại",
            error: error,
          })
        }
      },
      deleteUser : async function(req, res, next) {
        const userId = req.params.id;
        const userExist = UserModel.findOne({ _id: userId });
        try {
          if (userExist) {
            const userDelete = await UserModel.deleteOne({ _id: userId });
            const users = await UserModel.find({}).populate(
              "createdBy"
            );
      
            if (userDelete) {
              res.json({
                code: 200,
                message: "Xóa thành công",
                data: users
              });
            }
          }
        } catch (err) {
          res.json({
            code: 400,
            message: "Xóa thất bại",
            data: null
          });
        }
      },
      getUser :  async (req, res, next) => {
        const users = await UserModel.find({ _id: req.params.id });
      
        try {
          res.json({
            code: 200,
            data: users
          })
        } catch (error) {
          res.json({
            code: 500,
            error: TypeError,
          })
        }
      }

}
