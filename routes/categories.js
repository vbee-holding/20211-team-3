var express = require("express");
var router = express.Router();
const categories = require("../controllers/categories");

router.get('/categories', categories.getCategories)
router.get('/categories/trash', categories.getTrash)
router.get('/categories/:id', categories.getIdCate)
router.post('/categories', categories.postCategories)
router.put("/categories/trash/:id", categories.moveToTrash)
router.put("/restore/:id", categories.restoreFromTrash)
router.delete("/categories/:id", categories.deleteCate)

module.exports = router;
