import ExchangeControllerBase from '../ExchangeControllerBase'
import ArticleStore from "./ArticleStore";

export default class ArticleController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new ArticleStore();

  }

  async getArticleList() {
    let result = await this.store.getArticleList();
    // {
    //   "id": "5b758a0e9d1c11052c2257cd",
    //   "title": "",
    //   "author": "",
    //   "content": "",
    //   "sign": "",
    //   "issue_time": 1534429710,
    //   "label": []
    // },
    console.log(result);
    return result;
  }

  async getArticleDetail() {
    let result = await this.store.getArticleDetail();

    console.log(result);
    return result;
  }

}