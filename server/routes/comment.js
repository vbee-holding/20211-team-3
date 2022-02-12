const express = require('express');
const router = express.Router();
const comments = require("../controllers/comment")


router.get('/comments/prohibitedWords', comments.prohibitedWords);
router.get('/comments/:id', comments.getId);
router.post('/comments/', comments.postComment);
router.get('/comments/', comments.getComment);
router.put("/comments/prohibitedWords", comments.addProhibitedWords);

module.exports = router;
