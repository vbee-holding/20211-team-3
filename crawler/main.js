import { crawlerModelClasses } from "./crawl_model.js";
import Crawler from "crawler";

class ArticalCrawler{
    constructor(){
        this.result = []
        let self = this
        this.c = new Crawler({
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
                            console.log(self.result.length)
                        }
                    }
                }
                done();
            }
        });
    }

    add(url){
        this.crawler.queue()
    }


    crawl(){
        let c = this.c
        // Queue just one URL, with default callback
        c.queue('https://zingnews.vn/');
        c.queue('https://suckhoedoisong.vn/');
        c.queue("https://baotintuc.vn/")
        // c.queue("https://tienphong.vn/")
        // c.queue('https://vietnamnet.vn/')
        // c.queue('https://tienphong.vn/')
        // c.queue('https://nhandan.vn/')
        // c.queue('https://vnexpress.net/')
    }
}

let crawler = new ArticalCrawler()
crawler.crawl()
console.log(crawler.result)