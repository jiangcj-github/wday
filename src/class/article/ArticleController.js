import ExchangeControllerBase from '../ExchangeControllerBase'
import ArticleStore from "./ArticleStore";

export default class ArticleController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new ArticleStore();

  }

  async getArticleList(param) {
    console.log("controller");
    let result = await this.store.getArticleList(param);

    // author:""ct:""id:"5b7a24f7e13823203cb056d7"img:""issue:0like:0read:0title:""
    let resultR = [];
    result && result.map((v, index) => {
      resultR.push({
        id: v.id,
        author: v.author,
        title: v.title,
        content: v.ct,
        // content: v.content,
        img: v.img,
        like: v.like,
        read: v.read,
        date: v.issue
      })
    });

    return resultR;
  }

  async getArticleDetail() {
    let result = await this.store.getArticleDetail();

    console.log(result);
    return result;
  }

}