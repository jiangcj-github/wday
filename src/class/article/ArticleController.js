import ExchangeControllerBase from '../ExchangeControllerBase'
import ArticleStore from "./ArticleStore";

export default class ArticleController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new ArticleStore();

  }

  async getArticleList(param) {
    let result = await this.store.getArticleList(param);

    let resultR = [];
    result && result.map((v, index) => {
      resultR.push({
        id: v.id,
        author: v.aut,
        title: v.tit,
        content: v.pre,
        // content: v.content,
        img: v.img,
        like: v.lke,
        read: v.rad,
        date: new Date(v.ist * 1000).dateHandle("MM-dd HH:mm")
      })
    });

    return resultR;
  }

  async getArticleDetail() {
    let result = await this.store.getArticleDetail();

    return result;
  }

}