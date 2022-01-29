const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const news = require("../controllers/news")

const app = express();
app.use(fileUpload());

// get news entertainment
router.get("/newsEntertainments", news.news_entertainments);
router.get("/newsReels", news.news_Reel);
router.get("/q", news.search);
router.get("/latestNews", news.latenews);
router.get("/other", news.other);
router.get("/newsForYou", news.newsForYou);
router.get("/published", news.news_published);
router.get("/:id", news.news_by_id_user);
router.get("/new/:id", news.news_edit);
router.get("/trash/:id", news.news_isdelete_true);
router.get("/categories/:id", news.news_of_categories);
router.get("/users/:id", news.news_of_users_channel);
router.get("/similar/:id", news.similar);
router.get("/:_idNews", news.get_news);
router.get("/details/:_idNews", news.details);
router.post("/", news.add_news);
router.post("/upload", news.add_news_upload_picture);
router.put("/:_id", news.edit_news);
router.put("/views/:_id", news.views);
router.put("/giveUpDraft/:_id", news.giveUpDraft);
router.put("/saveDraft/:_id", news.saveDraft);
router.put("/trash/:_id", news.move_new_to_trash);
router.delete("/:_id", news.delete);
router.get("/favorite", news.favorite);
router.get("/bestNews", news.bestNews);
router.get("/", news.news_false);

module.exports = router;
