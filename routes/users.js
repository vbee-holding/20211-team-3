var express = require('express');
var router = express.Router();

// Models
const UserModel = require("../models/User");
const users = require("../controllers/users");

router.get('/', users.users);
router.get('/channels', users.channels);
router.post('/locked/:id', users.locked);
router.put('/updateRole/:id', users.updateRole);
router.delete("/:id", users.deleted);
router.get('/name/:id', users.get_user);

module.exports = router;
