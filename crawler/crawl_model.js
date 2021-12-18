import Crawler from "crawler"

class BaseModel{
    constructor(res){
        this.res = res
        this.host_name = null
        this.init()
    }

    init(){

    }

    get_host_name_url(){
        return "https://" + this.host_name + "/"
    }

    canParse(){
        return this.res.request.uri.hostname == this.host_name
    }

    normalizeTime(article){
        let day = article.release_time.split(" ")[0].split("/").reverse().join("/")
        let time = article.release_time.split(" ")[1]
        article.release_time = day + " " + time
    }

    parse(){

    }
}

class ZingNewsModel extends BaseModel{

    init(){
        this.host_name = "zingnews.vn"
    }

    parse(){
        let $ = this.res.$
        let self = this
        return $("article").each((index, element)=>{
            let element_query =  $(element)
            let article = {
                title: element_query.find('.article-title').text().trim(),
                link: self.get_host_name_url() + element_query.find('.article-thumbnail a')
                    .attr("href"),
                thumbnail: element_query.find('.article-thumbnail a img').attr("data-src"),
                sapo: element_query.find(".article-summary").text().trim(),
                category: element_query.find(".category").text().trim() || element_query.find(".article-category").text().trim(),
                source: self.host_name,
                release_time: (element_query.find(".time").text() + " " + element_query.find(".date").text()).trim()
            }
            article.release_time = article.release_time.split(" ").reverse().join(" ")
            this.normalizeTime(article)
        })
    }
}

class SuckhoedoisongModel extends BaseModel{

    init(){
        this.host_name = "suckhoedoisong.vn"
    }

    parse(){
        let $ = this.res.$
        let self = this
        return $(".box-category-item").each((index, element)=>{
            let element_query =  $(element)
            let article = {
                title: element_query.find('a[data-type="title"]').text().trim(),
                link: self.get_host_name_url() + element_query.find('a[data-type="title"]')
                    .attr("href"),
                thumbnail: element_query.find('img[data-type="avatar"]').attr("src"),
                sapo: element_query.find('p.box-category-sapo').text().trim(),
                category: element_query.find(".box-category-category").attr("title"),
                source: self.host_name,
                release_time: element_query.find(".box-category-time.time-ago").text()
            }
            this.normalizeTime(article)
            // console.log(article)
        })
    }
}

class BaoTinTucModel extends BaseModel{
    init(){
        this.host_name = "baotintuc.vn"
    }

    parse(){
        let $ = this.res.$
        let self = this
        return $(".ccl-item").each((index, element)=>{
            let element_query =  $(element)
            let article = {
                title: element_query.find('.item_title').text().trim(),
                link: self.get_host_name_url() + element_query.find('a[data-type="title"]')
                    .attr("href"),
                thumbnail: element_query.find('img').attr("src"),
                sapo: element_query.find('.item_title').text().trim(),
                category: element_query.find(".item_info .item_cat").text().trim(),
                source: self.host_name,
                release_time: element_query.find(".box-category-time.time-ago").text()
            }
            this.normalizeTime(article)
            console.log(article)
        })
    }
}

class TienphongModel extends BaseModel{
    init(){
        this.host_name = "tienphong.vn"
    }

    parse(){
        let $ = this.res.$
        let self = this
        return $("article").each((index, element)=>{
            let element_query =  $(element)
            let article = {
                title: element_query.find('a[title]').text().trim(),
                link: element_query.find('a').attr("href"),
                thumbnail: element_query.find('img').attr("data-src"),
                sapo: element_query.find(".story__summary").text().trim(),
                category: element_query.find(".story__meta a").text().trim() || element_query.find(".article-category").text().trim(),
                source: self.host_name,
                release_time: (element_query.find(".time").text() + " " + element_query.find(".date").text()).trim()
            }
            article.release_time = article.release_time.split(" ").reverse().join(" ")
            this.normalizeTime(article)
            // console.log(article)
        })
        
    }
}

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error)
        }else{
            let articles = []
            // console.log(res)
            // console.log(res.request.uri.hostname)
            console.log(new TienphongModel(res).parse())
        }
        done();
    }
});
// Queue just one URL, with default callback
// c.queue('https://zingnews.vn/');
// c.queue('https://suckhoedoisong.vn/');
// c.queue("https://baotintuc.vn/")
// c.queue("https://tienphong.vn/")
// c.queue('https://vietnamnet.vn/')
// c.queue('https://tienphong.vn/')
// c.queue('https://nhandan.vn/')
// c.queue('https://vnexpress.net/')


var crawlerModelClasses = [TienphongModel, ZingNewsModel, BaoTinTucModel, SuckhoedoisongModel]
export {crawlerModelClasses}