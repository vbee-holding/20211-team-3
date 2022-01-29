import Crawler from "crawler"

class BaseModel{

    constructor(res){
        this.res = res
        this.hostName = null
        this.articles = []
        this.init()
    }

    init(){}

    getHostNameUrl(){
        return "https://" + this.hostName + "/"
    }

    canParse(){
        return this.res.request.uri.hostname == this.hostName
    }

    normalizeTime(article){
        const day = article.dateCreate.split(" ")[0].split("/").reverse().join("/")
        const time = article.dateCreate.split(" ")[1]
        article.dateCreate = day + " " + time
    }

    parse(){

    }
}

class ZingNewsModel extends BaseModel{

    init(){
        this.hostName = "zingnews.vn"
    }

    parse(){
        const $ = this.res.$
        const self = this
        $("article").each((index, element)=>{
            const element_query =  $(element)
            const article = {
                title: element_query.find('.article-title').text().trim(),
                link: self.getHostNameUrl() + element_query.find('.article-thumbnail a')
                    .attr("href"),
                thumbnail: element_query.find('.article-thumbnail a img').attr("data-src"),
                sapo: element_query.find(".article-summary").text().trim(),
                category: element_query.find(".category").text().trim() || element_query.find(".article-category").text().trim(),
                source: self.hostName,
                dateCreate: (element_query.find(".time").text() + " " + element_query.find(".date").text()).trim()
            }
            article.dateCreate = article.dateCreate.split(" ").reverse().join(" ")
            this.normalizeTime(article)
            this.articles.push(article)
        })

        return this.articles
    }
}

class SuckhoedoisongModel extends BaseModel{

    init(){
        this.hostName = "suckhoedoisong.vn"
    }

    parse(){
        const $ = this.res.$
        const self = this
        $(".box-category-item").each((index, element)=>{
            const element_query =  $(element)
            const article = {
                title: element_query.find('a[data-type="title"]').text().trim(),
                link: self.getHostNameUrl() + element_query.find('a[data-type="title"]')
                    .attr("href"),
                thumbnail: element_query.find('img[data-type="avatar"]').attr("src"),
                sapo: element_query.find('p.box-category-sapo').text().trim(),
                category: element_query.find(".box-category-category").attr("title"),
                source: self.hostName,
                dateCreate: element_query.find(".box-category-time.time-ago").text()
            }
            this.normalizeTime(article)
            this.articles.push(article)
        })

        return this.articles
    }
}

class BaoTinTucModel extends BaseModel{
    init(){
        this.hostName = "baotintuc.vn"
    }

    parse(){
        const $ = this.res.$
        const self = this
        $(".ccl-item").each((index, element)=>{
            const element_query =  $(element)
            const article = {
                title: element_query.find('.item_title').text().trim(),
                link: self.getHostNameUrl() + element_query.find('a[data-type="title"]')
                    .attr("href"),
                thumbnail: element_query.find('img').attr("src"),
                sapo: element_query.find('.item_title').text().trim(),
                category: element_query.find(".item_info .item_cat").text().trim(),
                source: self.hostName,
                dateCreate: element_query.find(".box-category-time.time-ago").text()
            }
            this.normalizeTime(article)
            this.articles.push(article)
        })

        return this.articles
    }
}

class TienphongModel extends BaseModel{
    init(){
        this.hostName = "tienphong.vn"
    }

    parse(){
        const $ = this.res.$
        const self = this
        $("article").each((index, element)=>{
            const element_query =  $(element)
            const article = {
                title: element_query.find('a[title]').text().trim(),
                link: element_query.find('a').attr("href"),
                thumbnail: element_query.find('img').attr("data-src"),
                sapo: element_query.find(".story__summary").text().trim(),
                category: element_query.find(".story__meta a").text().trim() || element_query.find(".article-category").text().trim(),
                source: self.hostName,
                dateCreate: (element_query.find(".time").text() + " " + element_query.find(".date").text()).trim()
            }
            article.dateCreate = article.dateCreate.split(" ").reverse().join(" ")
            this.normalizeTime(article)
            this.articles.push(article)
        })

        return this.articles
    }
}

class VnExpressModel extends BaseModel{
    init(){
        this.hostName = "vnexpress.net"
    }

    parse(){
        const $ = this.res.$
        const self = this
        $(".item-news.item-news-common").each((index, element)=>{
            const element_query =  $(element)
            const article = {
                title: element_query.find('h3 a[title]').text().trim(),
                link: element_query.find('a').attr("href"),
                thumbnail: element_query.find('img').attr("data-src"),
                sapo: element_query.find(".description a").text().trim(),
                category: element_query.find(".story__meta a").text().trim() || element_query.find(".article-category").text().trim(),
                source: self.hostName,
                dateCreate: (element_query.find(".time").text() + " " + element_query.find(".date").text()).trim()
            }
            article.dateCreate = article.dateCreate.split(" ").reverse().join(" ")
            this.normalizeTime(article)
            this.articles.push(article)
        })
        
        return this.articles
    }
}

function test() {
    var crawler = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error)
            }else{
                console.log(new VnExpressModel(res).parse())
            }
            done();
        }
    });    
    // Queue just one URL, with default callback
    // crawler.queue('https://zingnews.vn/');
    // crawler.queue('https://suckhoedoisong.vn/');
    // crawler.queue("https://baotintuc.vn/")
    // crawler.queue("https://tienphong.vn/")
    // crawler.queue('https://vietnamnet.vn/')
    // crawler.queue('https://tienphong.vn/')
    // crawler.queue('https://nhandan.vn/')
    // crawler.queue('https://vnexpress.net/')
}

const crawlerModelClasses = [TienphongModel, ZingNewsModel, BaoTinTucModel, SuckhoedoisongModel, VnExpressModel]
export {crawlerModelClasses}