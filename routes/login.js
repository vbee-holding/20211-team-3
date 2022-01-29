const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const login = require("../controllers/login")


const app = express();
app.use(fileUpload());

router.post("/register", login.register);
router.post("/login", login.login);
router.get("/:token", login.get_user);
router.put("/updateName/:id", login.updateName);
router.put("/updateEmail/:id", login.updateEmail);
router.put("/updatePassword/:id", login.updatePassword);
router.put("/uploadAvatar/:id", login.uploadAvatar);
router.post("/checkToken", login.checkToken);

module.exports = router;
