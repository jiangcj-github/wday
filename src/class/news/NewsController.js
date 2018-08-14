import ExchangeControllerBase from '../ExchangeControllerBase'
import NewsStore from "./NewsStore";

export default class NewsController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new NewsStore();

  }

  setView(view) {
    super.setView(view);
  }

  async getNewsList() {
    let result = await this.store.getNewsList();
    this.view.setState({
      newsList: result
    });
    console.log(result);
    return result;
  }

  async getArticleDetail() {
    let result = await this.store.getArticleDetail();
    this.view.setState({
      articleDetail: result
    });
    console.log(result);
    return result;
  }

  async getNewsDetail() {
    let result = await this.store.getNewsDetail();
    this.view.setState({
      newsDetail: result
    });
    console.log(result);
    return result;
  }

}