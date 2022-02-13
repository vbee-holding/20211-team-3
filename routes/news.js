const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const news = require("../controllers/news")

const app = express();
app.use(fileUpload());

router.get("/newsReels", news.newsReel);
router.get("/q", news.search);
router.get("/latestNews", news.lateNews);
router.get("/other", news.newsOther);
router.get("/newsForYou", news.newsForYou);
router.get("/published", news.newsPublished);
router.get("/categories/:id", news.newsOfCategories);
router.get("/similar/:id", news.newsSimilar);
router.get("/:idNews", news.getNews);
router.get("/details/:idNews", news.getNewsDetails);
router.get("/bestNews", news.bestNews);

module.exports = router;
