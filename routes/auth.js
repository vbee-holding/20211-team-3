const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const auth = require("../controllers/auth")


const app = express();
app.use(fileUpload());

router.post("/register", auth.register);
router.post("/auth", auth.login);
router.get("/:token", auth.getUser);
router.post("/checkToken", auth.checkToken);

module.exports = router;
