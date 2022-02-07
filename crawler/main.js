import { crawlerModelClasses } from "./crawl_model.js";
import Crawler from "crawler";
import Service from "./service.js";
import Utils from "./utils.js";
import moment from "moment"
import {CronJob} from "cron"

const service = new Service()
let allCategories = await service.getAllCategories()
const adminCrawler = "61f2466507c5fb78061d2c74"

async function putCrawledArticle(article){
    try{
        let articleMapped = {
            title: article.title,
            content: "",
            tag: [],
            status: "published",
            cateNews: getCategory(article.category),
            createdBy: {
                _id: adminCrawler
            },
            articlePicture: article.thumbnail,
            originalLink: article.link,
            sapo: article.sapo,
            source: article.source,
        }
        if(article.dateCreate){
            articleMapped.dateCreate = moment(Date.parse(article.dateCreate)).format('YYYY-MM-DD HH:mm:ss Z')
        }
        if(!Object.values(articleMapped).map(value => value === undefined).includes(true)){
            console.log(await (await new Service().putNews(articleMapped)).data.message + " " + articleMapped.title)
        }
            
    }catch(err){
        console.log("Error put: " + err)
    }
}

function getCategory(categoryRaw) {
    for(let cate of allCategories){
        if(Utils.stringToSlug(categoryRaw) == Utils.stringToSlug(cate.name)){
            return cate
        }
    }
}

class ArticalCrawler{
    constructor(){
        this.result = []
        let self = this
        this.crawler = new Crawler({
            maxConnections : 10,
            // This will be called for each crawled page
            callback : function (error, res, done) {
                if(error){
                    console.log(error)
                }else{
                    for(let modelClass of crawlerModelClasses){
                        let model = new modelClass(res)
                        if(model.canParse()){
                            Array.prototype.push.apply(self.result, model.parse(model))
                            for(let artical of self.result){
                                putCrawledArticle(artical)
                            }
                        }
                    }
                }
                done();
            }
        });
    }

    crawl(){
        // Queue just one URL, with default callback
        this.crawler.queue('https://zingnews.vn/');
        this.crawler.queue('https://suckhoedoisong.vn/');
        this.crawler.queue("https://baotintuc.vn/")
        this.crawler.queue("https://tienphong.vn/")
    }
}

var job = new CronJob('*/1 * * * *', function() {
    service.getAllCategories().then(async (categories)=>{
        try{
            console.log('Start: ' + new Date());
            allCategories = categories
            let crawler = new ArticalCrawler()
            crawler.crawl()
        }catch(error){
            console.log(err)
        }  
    })

  }, null, true);
  job.start();
