var express = require('express');
var router = express.Router();

// Models
const UserModel = require("../models/User");
const users = require("../controllers/users");

router.get('/users', users.getUsers);
router.get('/channels', users.getChannels);
router.post('/lock/:id', users.lockUser);
router.put("/update/:id", users.updateName, users.updateEmail,users.updatePassword, users.uploadAvatar);
router.delete("/:id", users.deleteUser);
router.put('/role/:id', users.updateRole)
router.get('/users/:id', users.getUser);

module.exports = router;
