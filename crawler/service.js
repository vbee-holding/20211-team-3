import axios from 'axios';

class Service {

    getAPI(entityName){
        const api = axios.create({
            baseURL: 'http://localhost:3000/' + entityName
        });

        return api
    }

    async putNews(newsData) {
        return await this.getAPI("news").post("/crawled_news", newsData)
    }

    async getAllCategories(){
        let res = await this.getAPI("cateNews").get("/")

        return res.data.data
    }
}

export default Service;