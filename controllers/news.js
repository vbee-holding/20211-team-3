const express = require("express");
const fileUpload = require("express-fileupload");
const NewsModel = require("../models/News");
const RateModel = require("../models/Rate");
const LikeModel = require("../models/Like");
const ViewModel = require("../models/View");
const FollowModel = require("../models/Follow");
const router = express.Router();
const auth = require("../middleware/auth");
/* GET users listing. */

const app = express();
app.use(fileUpload());

module.exports = {

    news_entertainments : async function(req, res, next) {
        try {
           const newsId = req.query.newsId;
           const News = await NewsModel.find({ status: 'published', cateNews: newsId }).limit(6).sort({ view: -1, dateCreate: -1 })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     news_Reel : async function(req, res, next) {
        try {
           const newsId = req.query.newsId;
           console.log("newsId", newsId);
           const News = await NewsModel.find({ status: 'published', cateNews: newsId }).limit(6).sort({ view: -1, dateCreate: -1 })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
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
           const News = await NewsModel.find({ title: { $regex: textSearch, $options: "i" }, isDelete: false, status: "published" }).limit(10).sort({ view: -1, dateCreate: -1 });
     
           if (News) {
              return res.json({
                 code: 200,
                 err: null,
                 data: News
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
     latenews : async function(req, res, next) {
        try {
           const News = await NewsModel.find({ status: 'published' }).limit(7).sort({ dateCreate: -1 })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     other : async function(req, res, next) {
        try {
           const number = +req.query.number;
           console.log(typeof number);
           const News = await NewsModel.find({ status: 'published' }).limit(number).sort({ view: -1 })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
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
     news_published : async function(req, res, next) {
        try {
           const News = await NewsModel.find({ status: 'published', view: { $gt: 9 } }).limit(3).sort({ view: -1 })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     news_by_id_user : async function(req, res, next) {
        try {
           const id = req.params.id;
           const News = await NewsModel.find({ createdBy: { _id: id }, isDelete: false })
              .populate("cateNews")
              .populate("createdBy");
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     news_edit : async function(req, res, next) {
        try {
           const id = req.params.id;
           const News = await NewsModel.find({ _id: id })
              .populate("cateNews")
              .populate("createdBy");
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
// news ( isDelete = true )
     news_isdelete_true : async function(req, res, next) {
        try {
           const id = req.params.id;
           const News = await NewsModel.find({ createdBy: { _id: id }, isDelete: true })
              .populate("cateNews")
              .populate("createdBy");
           return res.json({
              code: 200,
              err: null,
              data: News
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
     news_of_categories : async function(req, res, next) {
        try {
           const id = req.params.id;
           const News = await NewsModel.find({ status: 'published', cateNews: { _id: id } })
              .populate("cateNews")
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
// show news of users ( status = "published" ) channel
     news_of_users_channel : async function(req, res, next) {
        try {
           const id = req.params.id;
           const News = await NewsModel.find({ status: 'published', createdBy: { _id: id } }).limit(40)
              .populate("cateNews")
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     similar : async function(req, res, next) {
        try {
           const id = req.params.id;
           const News = await NewsModel.find({ status: 'published', cateNews: { _id: id } }).limit(8)
              .populate("cateNews")
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     get_news : async function(req, res, next) {
        try {
           const idNews = req.params._idNews;
           const News = await NewsModel.find({
              _id: idNews,
              isDelete: false
           })
              .populate("cateNews")
              .populate("createdBy");
     
           const news = News[0];
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
     details :  async function(req, res, next) {
        try {
           const idNews = req.params._idNews;
           const News = await NewsModel.find({
              _id: idNews,
              isDelete: false
           })
              .populate("createdBy");
     
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     },
     // add news
     add_news : async function(req, res, next) {
        try {
           const body = req.body;
           const file = req.files.file;
     
           if (file) {
              file.mv(`${__dirname}/../client/public/uploads/news/${file.name}`);
           }
     
           if (JSON.parse(body.draft)) {
              const News = new NewsModel({
                 title: body.title,
                 content: body.content,
                 tag: JSON.parse(body.tags),
                 cateNews: body.category,
                 status: "draft",
                 createdBy: body.createdBy,
                 articlePicture: file.name
              });
     
              const NewsClass = await News.save();
     
              return res.json({
                 code: 200,
                 message: "Đã lưu vào nháp",
                 data: NewsClass
              });
           } else {
              const News = new NewsModel({
                 title: body.title,
                 content: body.content,
                 tag: JSON.parse(body.tags),
                 cateNews: body.category,
                 createdBy: body.createdBy,
                 articlePicture: file.name
              });
     
              const NewsClass = await News.save();
     
              return res.json({
                 code: 200,
                 message: "Gửi yêu cầu thành công",
                 data: NewsClass
              });
           }
        } catch (err) {
           return res.json({
              code: 400,
              err: err,
              message: "Thêm thất bại"
           });
        }
     },
// add news ( upload anh )
    add_news_upload_picture : function(req, res, next) {
        try {
        const file = req.files.upload;
    
        console.log(file);
    
        file.mv(`${__dirname}/../client/public/uploads/news/${file.name}`);
        } catch (err) {
        return res.json({
            code: 400,
            err: err,
            message: "Upload thất bại"
        });
        }
    },
 //edit news 
    edit_news : async function(req, res, next) {
        try {
           const _id = req.params._id;
           const newExist = await NewsModel.findOne({ _id: _id });
     
           if (newExist) {
              const body = req.body;
              const files = req.files;
     
              if (files) {
                 files.file.mv(`${__dirname}/../client/public/uploads/news/${files.file.name}`);
     
                 const news = {
                    title: body.title,
                    content: body.content,
                    cateNews: body.categoryId,
                    tag: JSON.parse(body.tags),
                    articlePicture: files.file.name
                 };
     
                 if (news) {
                    await NewsModel.findOneAndUpdate({ _id: _id }, news);
     
                    return res.json({
                       code: 200,
                       message: "Sửa bài viết thành công"
                    });
                 }
              } else {
                 const news = {
                    title: body.title,
                    content: body.content,
                    cateNews: body.categoryId,
                    tag: JSON.parse(body.tags)
                 };
     
                 if (news) {
                    await NewsModel.findOneAndUpdate({ _id: _id }, news);
     
                    return res.json({
                       code: 200,
                       message: "Sửa bài viết thành công"
                    });
                 }
              }
           }
        } catch (err) {
           console.log(err);
           return res.json({
              code: 400,
              message: "Sửa bài viết thất bại",
              err: err,
              data: null
           });
        }
     },
// increase views
     views : async function(req, res, next) {
        try {
           const _id = req.params._id;
           const newExist = await NewsModel.findOne({ _id: _id });
     
           if (newExist) {
              const views = req.body.views;
              const increaseViews = await NewsModel.findOneAndUpdate(
                 { _id: _id },
                 { view: views }
              );
     
              const news = await NewsModel.find({
                 _id: _id,
                 isDelete: false
              })
                 .populate("createdBy");
     
              if (increaseViews) {
                 res.json({
                    code: 200,
                    data: news
                 });
              }
           }
        } catch (err) {
           return res.json({
              code: 400,
              err: err,
              data: null
           });
        }
     },
     // Give up draft
     giveUpDraft : async function(req, res, next) {
        try {
           const _id = req.params._id;
           const newExist = await NewsModel.findOne({ _id: _id });
     
           if (newExist) {
              const giveUpDraft = await NewsModel.findOneAndUpdate(
                 { _id: _id },
                 { status: "new" }
              );
              const news = await NewsModel.find({});
     
              if (giveUpDraft) {
                 res.json({
                    code: 200,
                    message: "Bỏ nháp thành công",
                    data: news
                 });
              }
           }
        } catch (err) {
           return res.json({
              code: 400,
              message: "Bỏ nháp thất bại",
              err: err,
              data: null
           });
        }
     },
     // save draft
     saveDraft : async function(req, res, next) {
        try {
           const _id = req.params._id;
           const newExist = await NewsModel.findOne({ _id: _id });
     
           if (newExist) {
              const giveUpDraft = await NewsModel.findOneAndUpdate(
                 { _id: _id },
                 { status: "draft" }
              );
              const news = await NewsModel.find({});
     
              if (giveUpDraft) {
                 res.json({
                    code: 200,
                    message: "Lưu nháp thành công",
                    data: news
                 });
              }
           }
        } catch (err) {
           return res.json({
              code: 400,
              message: "Lưu nháp thất bại",
              err: err,
              data: null
           });
        }
     },
     // move a new to trash
     move_new_to_trash : async function(req, res, next) {
        try {
           const _id = req.params._id;
           const newExist = await NewsModel.findOne({ _id: _id });
     
           if (newExist) {
              const moveToTrash = await NewsModel.findOneAndUpdate(
                 { _id: _id },
                 { isDelete: true }
              );
              const news = await NewsModel.find({})
                 .populate("createdBy");
     
              if (moveToTrash) {
                 res.json({
                    code: 200,
                    message: "Đã thêm vào giỏ rác",
                    data: news
                 });
              }
           }
        } catch (err) {
           return res.json({
              code: 400,
              message: "Thêm vào giỏ rác thất bại",
              err: err,
              data: null
           });
        }
     },
     // restore from trash
     restore : async function(req, res, next) {
        try {
           const _id = req.params._id;
           const newExist = await NewsModel.findOne({ _id: _id });
     
           if (newExist) {
              const restoreFromTrash = await NewsModel.findOneAndUpdate(
                 { _id: _id },
                 { isDelete: false }
              );
              const news = await NewsModel.find({ isDelete: true })
                 .populate("createdBy");
     
              if (restoreFromTrash) {
                 res.json({
                    code: 200,
                    message: "Restore thành công",
                    data: news
                 });
              }
           }
        } catch (err) {
           return res.json({
              code: 400,
              message: "Restore thất bại",
              err: err,
              data: null
           });
        }
     },
     delete : async function(req, res, next) {
        try {
           const _id = req.params._id;
           const newExist = await NewsModel.findOne({ _id: _id });
     
           if (newExist) {
              const newDelete = await NewsModel.findOneAndDelete({ _id: _id });
              const news = await NewsModel.find({ isDelete: true })
                 .populate("createdBy");
     
              if (newDelete) {
                 res.json({
                    code: 200,
                    message: "Xóa thành công",
                    data: news
                 });
              }
           }
        } catch (err) {
           return res.json({
              code: 400,
              message: "Xóa thất bại",
              err: err,
              data: null
           });
        }
     },
     favorite : auth, async function(req, res, next) {
        try {
           const postLike = await LikeModel.find({
              createdBy: req.user._id,
              isDelete: false
           });
           const postFav = await NewsModel.find({ _id: postLike.News });
           return res.json({
              code: 200,
              err: null,
              data: postFav
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err,
              data: null
           });
        }
     },
     bestNews : auth, async function(req, res, next) {
        try {
           const Newss = await NewsModel.find({ isDelete: false }).sort({
              avangeRating: "desc"
           });
           return res.json({
              code: 200,
              err: null,
              data: Newss
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err,
              data: null
           });
        }
     },
// news ( isDelete = false )
     news_false : async function(req, res, next) {
        try {
           const News = await NewsModel.find({ isDelete: false })
              .populate("cateNews")
              .populate("createdBy");
           return res.json({
              code: 200,
              err: null,
              data: News
           });
        } catch (err) {
           return res.json({
              code: 400,
              err: err.messege,
              data: null
           });
        }
     }

}
