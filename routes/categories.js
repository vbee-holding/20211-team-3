var express = require("express");
var router = express.Router();
const categories = require("../controllers/categories");

router.get('/categories', categories.get_categories)
router.get('/categories/trash', categories.get_trash)
router.get('/categories/:_id', categories.get_idCate)
router.post('/categories', categories.post_categories)
router.put("/categories/trash/:_id", categories.move_to_trash)
router.put("/restore/:_id", categories.restoreFromTrash)
router.delete("/categories/:id", categories.delete)

module.exports = router;