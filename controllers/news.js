const express = require("express");
const fileUpload = require("express-fileupload");
const NewsModel = require("../models/news");
const RateModel = require("../models/Rate");
const ViewModel = require("../models/View");
const router = express.Router();
const auth = require("../middleware/auth");
/* GET users listing. */

const app = express();
app.use(fileUpload());

module.exports = {
     newsReel : async function(req, res, next) {
        try {
           const newsId = req.query.newsId;
           console.log("newsId", newsId);
           const news = await NewsModel.find({ status: 'published', cateNews: newsId }).limit(6).sort({ view: -1, dateCreate: -1 })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: news
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     search : async function(req, res, next) {
        try {
           const textSearch = req.query.textSearch;
           const news = await NewsModel.find({ title: { $regex: textSearch, $options: "i" }, isDelete: false, status: "published" }).limit(10).sort({ view: -1, dateCreate: -1 });
     
           if (news) {
              return res.json({
                 code: 200,
                 err: null,
                 data: news
              });
           }
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     lateNews : async function(req, res, next) {
        try {
           const news = await NewsModel.find({ status: 'published' }).limit(7).sort({ dateCreate: -1 })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: news
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     newsOther : async function(req, res, next) {
        try {
           const number = +req.query.number;
           console.log(typeof number);
           const news = await NewsModel.find({ status: 'published' }).limit(number).sort({ view: -1 })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: news
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     newsForYou : async function(req, res, next) {
        try {
           const userId = req.query.userId;
     
           if (userId) {
              const getChannelUserFollow = await FollowModel.find({ followBy: userId });
     
              const channels = [];
     
              getChannelUserFollow.forEach(v => channels.push(`${v.channel}`));
     
              const news = await NewsModel.find({ status: 'published' }).limit(8).sort({ dateCreate: -1 })
                 .populate("createdBy");
     
              const getNews = [ ...news ];
     
              const getNewsUserFollow = await getNews.filter(v => channels.includes(`${v.createdBy._id}`));
     
              return res.json({
                 code: 200,
                 err: null,
                 data: getNewsUserFollow
              });
           }
     
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     newsPublished : async function(req, res, next) {
      try {
         const news = await NewsModel.find({ status: 'published', view: { $gt: 9 } }).limit(3).sort({ view: -1 })
            .populate("createdBy");
   
         return res.json({
            code: 200,
            err: null,
            data: news
         });
      } catch (err) {
         return res.json({
            code: 400,
            err: err.messege,
            data: null
         });
      }
   },
// show news of category ( status = "published" )
     newsOfCategories : async function(req, res, next) {
        try {
           const id = req.params.id;
           const news = await NewsModel.find({ status: 'published', cateNews: { _id: id } })
              .populate("cateNews")
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: news
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     newsSimilar : async function(req, res, next) {
        try {
           const id = req.params.id;
           const news = await NewsModel.find({ status: 'published', cateNews: { _id: id } }).limit(8)
              .populate("cateNews")
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: news
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     getNews : async function(req, res, next) {
        try {
           const idNews = req.params._idNews;
           const news = await NewsModel.find({
              _id: idNews,
              isDelete: false
           })
              .populate("cateNews")
              .populate("createdBy");
     
           const news = news[0];
           const data = {
              title: news.title,
              content: news.content,
              categoryId: news.cateNews._id,
              categoryName: news.cateNews.name,
              tags: news.tag,
              articlePicture: news.articlePicture
           };
     
           return res.json({
              code: 200,
              err: null,
              data: data
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
  // get news detail   
     getNewsDetails :  async function(req, res, next) {
        try {
           const idNews = req.params._idNews;
           const news = await NewsModel.find({
              _id: idNews,
              isDelete: false
           })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: news
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     bestNews : auth, async function(req, res, next) {
        try {
           const newss = await NewsModel.find({ isDelete: false }).sort({
              avangeRating: "desc"
           });
           return res.json({
              code: 200,
              err: null,
              data: newss
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err,
              data: null
           });
        }
     },

}
