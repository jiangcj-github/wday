import ExchangeControllerBase from '../ExchangeControllerBase'
import ArticleStore from "./ArticleStore";

export default class ArticleController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new ArticleStore();

  }

  async getArticleList() {
    let result = await this.store.getArticleList();

    console.log(result);
    return result;
  }

  async getArticleDetail() {
    let result = await this.store.getArticleDetail();

    console.log(result);
    return result;
  }

}