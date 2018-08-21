import ExchangeControllerBase from '../ExchangeControllerBase'
import NewsStore from "./NewsStore";

export default class NewsController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new NewsStore();
  }


  async getNewsList() {
    let result = await this.store.getNewsList();

    console.log("news",result);
    return result;
  }

  async getNewsDetail() {
    let result = await this.store.getNewsDetail();
    console.log(result);
    return result;
  }

}