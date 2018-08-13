import ExchangeControllerBase from '../ExchangeControllerBase'
import ArticleStore from "./ArticleStore";

export default class ConfigController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new ArticleStore();

  }

  setView(view) {
    super.setView(view);
    // view.setState({count: this.store.count})
    // return this.store.data
  }

  async getArticleList() {
    let result = await this.store.getArticleList();
    this.view.setState({
      articleList: result
    });
    console.log(result);
    return result;
  }


}